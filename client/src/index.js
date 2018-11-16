// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {
  Alert,
  NavBar,
  NavBarA,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardText,
  DeleteButton,
  EditButton,
  ConfirmButton
} from './widgets';
import { artikkelService } from './services';
import { FormGroupText, CheckBox, FormGroupTextArea, SaveButton, DefaultSelect } from './articleform';
import { Motion, spring } from 'react-motion';
import Marquee from 'react-smooth-marquee';
import { Article } from './datastructures';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Home extends Component {
  render() {
    return <div>React example with component state</div>;
  }
}

type Props = {
  children?: React.Node,
  artikkel?: Article,
  nyligeArtikler?: Article[],
  artikler?: Article[],
  tidspunkt?: Date,
  isViktig?: number
};

class ArtikkelList extends Component {
  artikler: Article[] = [];
  nyligeArtikler: Article[] = [];
  tidspunkt: Date = new Date();

  render() {
    return (
      <div>
        {console.log('nylige artikler', this.nyligeArtikler)}
        <Marquee>
          {this.nyligeArtikler.map(artikkel => (
            <a className="nav-link d-inline " key={artikkel.id} href={'#/artikler/' + artikkel.id}>
              {' '}
              {artikkel.tittel}
              {' ' + artikkel.opprettet.slice(10)}{' '}
            </a>
          ))}{' '}
        </Marquee>
        {this.artikler.map(artikkel => (
          <Card key={artikkel.id}>
            <CardBody title={artikkel.tittel}>
              {console.log(artikkel)}
              <CardImg src={artikkel.bildeLink} alt={artikkel.bildeTekst} />
              <a href={'#/artikler/' + artikkel.id}> les mer </a>
            </CardBody>
            <CardFooter>Dato opprettet: {artikkel.opprettet} </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  mounted() {
    artikkelService
      .getArticles()
      .then(artikler => {
        if (artikler.length > 20) {
          this.artikler = artikler.slice(20);
        }
        this.artikler = artikler;
        //begrenser antall artikler på hovedsiden:
        if (this.artikler.length > 20) {
          this.artikler.slice(20);
        }
        const now = new Date();
        const oneDayAgo = now.getDate() - 1;
        const yesterday = new Date();
        yesterday.setDate(oneDayAgo);
        console.log(now);
        //filtrere artikler som skal benyttes til å generere marquees'en:
        this.nyligeArtikler = this.artikler.filter(function(article, i) {
          return Date.parse(article.opprettet) > yesterday && i < 3;
        });
        console.log(this.nyligeArtikler[0]);
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}

class ArticleDetails extends Component<{ match: { params: { id: number } } }> {
  //$FlowFixMe
  artikkel: Article = null;

  render() {
    if (!this.artikkel) return null;

    return (
      <Card>
        <CardBody title={this.artikkel.tittel}>
          <CardImg src={this.artikkel.bildeLink} alt={this.artikkel.bildeTekst} />
          <CardText> {this.artikkel.innhold} </CardText>

          {console.log(
            'forsøker å skrive ut artikkel resultatet: ',
            this.artikkel,
            ', vha json.stringify: ' +
              JSON.stringify(this.artikkel) +
              ' forsøker å hente ut artikkel data: ' +
              this.artikkel.tittel
          )}
          <DeleteButton onClick={this.delete}> Slett </DeleteButton>
          <EditButton onClick={this.edit}> Endre innhold </EditButton>
        </CardBody>
        <CardFooter>{'Oprettet:  ' + this.artikkel.opprettet + '   Sist endret: ' + this.artikkel.endret} </CardFooter>
      </Card>
    );
  }

  mounted() {
    artikkelService
      .getArticle(this.props.match.params.id)
      .then(artikkel => (this.artikkel = artikkel[0]))
      .catch((error: Error) => Alert.danger(error.message));
  }
  delete() {
    console.log('registrerte klikk');
    artikkelService
      .deleteArticle(this.artikkel.id)
      .then(data => {
        console.log('artikkel er slettet', data.insertId);
        history.push('//artikler/');
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
  edit() {
    console.log('registrerte edit button click');
    history.push('/artikler/' + this.artikkel.id + '/edit');
  }
}

class ArticleEdit extends Component<{ match: { params: { id: number } } }> {
  //$FlowFixMe
  artikkel: Article = null;
  isViktig: number = -1;

  render() {
    if (!this.artikkel) return null;

    return (
      <form>
        <FormGroupText
          type="text"
          description="Tittel"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            this.artikkel.tittel = event.target.value;
          }}
          value={this.artikkel.tittel}
        />
        <FormGroupTextArea
          description="Innhold"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            this.artikkel.innhold = event.target.value;
          }}
          value={this.artikkel.innhold}
        />
        <DefaultSelect
          description="kategori"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            this.artikkel.kategori = event.target.value;
          }}
        >
          <option> endre kategori </option>
          <option value="matlaging"> matlaging </option>
          <option value="internetOfShit"> internet of shit </option>
          <option value="agurknytt"> agurknytt </option>
        </DefaultSelect>
        <FormGroupText
          type="url"
          description="bildelenke"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            this.artikkel.bildeLink = event.target.value;
          }}
          value={this.artikkel.bildeLink}
        />
        <FormGroupText
          type="text"
          description="bildetekst"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            this.artikkel.bildeTekst = event.target.value;
          }}
          value={this.artikkel.bildeTekst}
        />
        {this.artikkel.isViktig === 1 ? (
          <CheckBox
            description="fjern fra hovedsiden"
            value="0"
            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              this.isViktig = parseInt(event.target.value);
            }}
          />
        ) : (
          <CheckBox
            description="publiser på hovedsiden"
            value="1"
            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              this.isViktig = parseInt(event.target.value);
            }}
          />
        )}
        <EditButton onClick={this.cancel}> angre </EditButton>
        <ConfirmButton onClick={this.save}> Lagre </ConfirmButton>
      </form>
    );
  }

  mounted() {
    artikkelService
      .getArticle(this.props.match.params.id)
      .then(artikkel => (this.artikkel = artikkel[0]))
      .catch((error: Error) => Alert.danger(error.message));
  }
  cancel() {
    window.location.reload();
  }

  save() {
    if (!this.artikkel) return null;
    console.log('hva er artikkelen: ', this.artikkel);
    if (this.isViktig > -1) this.artikkel.isViktig = this.isViktig;
    delete this.artikkel.opprettet; //TODO: finn en mer "pure" måte å gjøre dette på
    delete this.artikkel.endret; //TODO: finn en mer "pure" måte å gjøre dette på

    artikkelService
      .updateArticle(this.artikkel)
      .then(() => {
        let artikkelList = ArtikkelList.instance();
        if (artikkelList) artikkelList.mounted(); // Update Studentlist-component
        if (this.artikkel) history.push('/artikler/' + this.artikkel.id);
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
class ArticleByCategory extends Component<{ match: { params: { kategori: string } } }> {
  artikler: Article[] = [];
  render() {
    return (
      <div>
        <h1>
          {' '}
          {//skriver ut kategorien vi er inne på som overskift
          this.props.match.params.kategori.split('-').join(' ')}{' '}
        </h1>
        {this.artikler.map(artikkel => (
          <Card key={artikkel.id}>
            <CardBody title={artikkel.tittel}>
              {console.log(artikkel)}
              <CardImg src={artikkel.bildeLink} alt={artikkel.bildeTekst} />
              <a href={'#/artikler/' + artikkel.id}> les mer </a>
            </CardBody>
            <CardFooter>Dato opprettet: {artikkel.opprettet} </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  mounted() {
    artikkelService
      .getArticlesByCategory(this.props.match.params.kategori)
      .then(artikler => (this.artikler = artikler))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
class NavBarHolder extends Component {
  render() {
    return (
      <NavBar home="#/artikler" title="Hello News">
        <NavBarA href="#/artikler/kategori/internet-of-shit">
          {' '}
          Internet of <del>things</del> shit{' '}
        </NavBarA>
        <NavBarA href="#/artikler/kategori/matlaging"> Matlaging </NavBarA>
        <NavBarA href="#/artikler/kategori/agurknytt"> Agurknytt </NavBarA>
        <NavBarA href="#/artikler/lagNyhet"> publiser nyhet </NavBarA>
      </NavBar>
    );
  }
}

class CreateArticle extends Component {
  article = {
    tittel: '',
    innhold: '',
    kategori: 'matlaging', //setter verdi til matlagin som er det øverste som kommer opp på options
    bildeLink: '',
    isViktig: 0,
    bildeTekst: ''
  };

  render() {
    return (
      <form>
        <FormGroupText
          type="text"
          description="Tittel"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // $FlowFixMe
            this.article.tittel = event.target.value;
          }}
        />
        <FormGroupTextArea
          description="Innhold"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // $FlowFixMe
            this.article.innhold = event.target.value;
          }}
        />
        <DefaultSelect
          description="kategori"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // $FlowFixMe
            this.article.kategori = event.target.value;
          }}
        >
          <option value="matlaging"> matlaging </option>
          <option value="internet-of-shit"> internet of shit </option>
          <option value="agurknytt"> agurknytt </option>
        </DefaultSelect>
        <FormGroupText
          type="url"
          description="bildelenke"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // $FlowFixMe
            this.article.bildeLink = event.target.value;
          }}
        />

        <FormGroupText
          type="text"
          description="bildetekst"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // $FlowFixMe
            this.article.bildeTekst = event.target.value;
          }}
        />

        <CheckBox
          description="publiser på hovedsiden"
          value="1"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // $FlowFixMe
            console.log(event.target.value);
            // this.article.isViktig = event.target.value;
            this.article.isViktig === 1 ? (this.article.isViktig = 0) : (this.article.isViktig = 1);
            console.log(this.article.isViktig, 'skriver ut verdi av this.article.isViktig');
          }}
        />
        <SaveButton onClick={this.save} />
      </form>
    );
  }
  save() {
    console.log(this.article);
    // console.log('trying to add article:', this.state);
    artikkelService
      // $FlowFixMe
      .addArticle(this.article)
      .then(data => {
        console.log('artikkel er lagret', data.insertId);
        history.push('/artikler/' + data.insertId.toString());
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <NavBarHolder />
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/artikler" component={ArtikkelList} />
          <Route exact path="/artikler/:id" component={ArticleDetails} />
          <Route exact path="/artikler/:id/edit" component={ArticleEdit} />
          <Route exact path="/artikler/lagNyhet" component={CreateArticle} />
          <Route exact path="/artikler/kategori/:kategori" component={ArticleByCategory} />
        </div>
      </div>
    </HashRouter>,
    root
  );
