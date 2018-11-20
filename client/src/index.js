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
  ConfirmButton,
  Pagination,
  Page
} from './widgets';
import { artikkelService } from './services';
import {FormGroupTextRequired, FormGroupText, CheckBox, FormGroupTextArea, SaveButton, DefaultSelect } from './articleform';
import Marquee from 'react-smooth-marquee';
import { Article } from './datastructures';
import { ArticleList } from './articleList';

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

export class Livefeed extends Component {
  nyligeArtikler: Article[] = [];
  oppdatere: boolean = true;

  render() {
    return (
      <Marquee>
        {this.nyligeArtikler.map(artikkel => (
          <a className="nav-link d-inline " key={artikkel.id} href={'#/artikler/' + artikkel.id}>
            {' '}
            {artikkel.tittel}
            {' ' + artikkel.opprettet.slice(10)}{' '}
          </a>
        ))}{' '}
      </Marquee>
    );
  }
  mounted() {
    this.poll();
  }
  poll() {
    if (this.oppdatere) {
      artikkelService
        .getArticles()
        .then(artikler => {
          //lager lista med viktige artikler. artikkelen skal ikke være mer enn et døgn gammel og det er de tre viktigste artiklene
          const now = new Date();
          const oneDayAgo = now.getDate() - 1;
          const yesterday = new Date();
          yesterday.setDate(oneDayAgo);
          console.log(now);
          //filtrere artikler som skal benyttes til å generere marquees'en:
          this.nyligeArtikler = artikler.filter(function(article, i) {
            return Date.parse(article.opprettet) > yesterday && i < 5;
          });
          console.log(this.nyligeArtikler[0]);
          setTimeout(() => {
            this.poll();
          }, 1000);
        })
        .catch((error: Error) => Alert.danger(error.message));
    }
  }
  componentWillUnmount() {
    this.oppdatere = false;
  }
}

export class ArtikkelList extends Component<{ match: { location: { search: string } } }> {
  max_no_articles_per_page = 20; //constant som forteller hvor mange tillatte artikler det skal være per side
  page = 0; //siden vi befinner oss på
  page_no = 0; //antall sider artikkellisten kan hoste frem
  pagelist: number[] = [];
  total_no_of_articles = 0; //antall artikler i databasen
  artikler: Article[] = [];


  render() {
    return (
      <div className="container">
        {console.log('this.artikler i render: ', this.artikler)}

        <ArticleList article={this.artikler} />
        {this.page_no > 0 && (
          <Pagination>
            {this.pagelist.map(page => (
              <Page key={page} value={page} onClick={this.changePage}>
                {' '}
                {page + 1}{' '}
              </Page>
            ))}
          </Pagination>
        )}
      </div>
    );
  }

  mounted() {
    artikkelService
      .getArticles()
      .then(artikler => {
        //oppretter lista med artikler.
        const importantArticles = artikler.filter(article => article.isViktig === 1);
        this.total_no_of_articles = importantArticles.length;
        this.page_no = Math.floor(importantArticles.length / (this.max_no_articles_per_page + 1)); //gir 0 sider hvis det er færre eller lik 20 artikler
        this.pagelist = Array.from(Array(this.page_no + 1).keys());
        //$FlowFixMe
        const pageTemp = new URLSearchParams(this.props.location.search).get('page');
        if (pageTemp != null) {
          this.page = parseInt(pageTemp);
        }
        console.log('page before check: ' + this.page);
        if (this.page > this.page_no) {
          this.page = this.page_no;
        } else if (this.page === null) {
          this.page = 0;
        }
        console.log('page after check: ' + this.page + 'number of articles in database: ' + this.total_no_of_articles);

        this.artikler = importantArticles.slice(
          this.page * this.max_no_articles_per_page,
          this.page * this.max_no_articles_per_page + this.max_no_articles_per_page
        );
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
  changePage() {
    //$FlowFixMe
    history.push('/artikler/?page=' + event.target.value);
    window.location.reload();
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
        history.push('/artikler/');
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
  edit() {
    console.log('registrerte edit button click');
    history.push('/artikler/' + this.artikkel.id + '/edit');
  }
}

export class ArticleEdit extends Component<{ match: { params: { id: number } } }> {
  //$FlowFixMe
  artikkel: Article = null;
  isViktig: number = -1;

  render() {
    if (!this.artikkel) return null;

    return (
      <form onSubmit={this.save}>
        <FormGroupTextRequired
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
          <option value="internet-of-shit"> internet of shit </option>
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
            console.log('bildeTekst: ' + this.artikkel.bildeTekst + ' ' + event.target.value);
          }}
          value={this.artikkel.bildeTekst}
        />
        {this.artikkel.isViktig === 1 ? (
          <CheckBox
            description="fjern fra hovedsiden"
            value="0"
            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              console.log('registrerte trykk: ' + event.target.value);
              this.isViktig === 0 ? (this.isViktig = 1) : (this.isViktig = 0);
              console.log(this.isViktig, 'skriver ut verdi av this.isViktig');
            }}
          />
        ) : (
          <CheckBox
            description="publiser på hovedsiden"
            value="1"
            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              console.log('registrerte trykk: ' + event.target.value);
              this.isViktig === 1 ? (this.isViktig = 0) : (this.isViktig = 1);
              console.log(this.isViktig, 'skriver ut verdi av this.isViktig');
            }}
          />
        )}
        <EditButton onClick={this.cancel}> angre </EditButton>
        <ConfirmButton> Lagre </ConfirmButton>
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
class ArticleByCategory extends Component<{ match: { params: { kategori: string }, location: { search: string } } }> {
  artikler: Article[] = [];
  max_no_articles_per_page = 20; //constant som forteller hvor mange tillatte artikler det skal være per side
  page = 0; //siden vi befinner oss på
  page_no = 0; //antall sider artikkellisten kan hoste frem
  pagelist: number[] = [];
  total_no_of_articles = 0; //antall artikler i databasen
  render() {
    return (
      <div>
        <h1>
          {' '}
          {//skriver ut kategorien vi er inne på som overskift
          this.props.match.params.kategori.split('-').join(' ')}{' '}
        </h1>
        <ArticleList article={this.artikler}> </ArticleList>
        {console.log('this.page.no' + this.page_no)}
        {this.page_no > 0 && (
          <Pagination>
            {this.pagelist.map(page => (
              <Page key={page} value={page} onClick={this.changePage}>
                {' '}
                {page + 1}{' '}
              </Page>
            ))}
          </Pagination>
        )}
      </div>
    );
  }
  mounted() {
    artikkelService
      .getArticlesByCategory(this.props.match.params.kategori)
      .then(artikler => {
        //oppretter lista med artikler.
        this.total_no_of_articles = artikler.length;
        this.page_no = Math.floor(artikler.length / (this.max_no_articles_per_page + 1)); //gir 0 sider hvis det er færre eller lik 20 artikler
        this.pagelist = Array.from(Array(this.page_no + 1).keys());
        //$FlowFixMe
        const pageTemp = new URLSearchParams(this.props.location.search).get('page');
        if (pageTemp != null) {
          this.page = parseInt(pageTemp);
        }
        console.log('page before check: ' + this.page);
        if (this.page > this.page_no) {
          this.page = this.page_no;
        } else if (this.page === null) {
          this.page = 0;
        }
        console.log('page after check: ' + this.page + 'number of articles in database: ' + this.total_no_of_articles);

        this.artikler = artikler.slice(
          this.page * this.max_no_articles_per_page,
          this.page * this.max_no_articles_per_page + this.max_no_articles_per_page
        );
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
  changePage() {
    //$FlowFixMe
    history.push('/artikler/kategori/' + this.props.match.params.kategori + '?page=' + event.target.value);
    window.location.reload();
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

export class CreateArticle extends Component {
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
      <form onSubmit={this.save}>
        <FormGroupTextRequired
          type="text"
          description="Tittel"
          required
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            this.article.tittel = event.target.value;
          }}
        />
        <FormGroupTextArea
          description="Innhold"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            this.article.innhold = event.target.value;
          }}
        />
        <DefaultSelect
          description="kategori"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
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
            this.article.bildeLink = event.target.value;
          }}
        />

        <FormGroupText
          type="text"
          description="bildetekst"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            this.article.bildeTekst = event.target.value;
          }}
        />

        <CheckBox
          description="publiser på hovedsiden"
          value="1"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            console.log(event.target.value);
            // this.article.isViktig = event.target.value;
            this.article.isViktig === 1 ? (this.article.isViktig = 0) : (this.article.isViktig = 1);
            console.log(this.article.isViktig, 'skriver ut verdi av this.article.isViktig');
          }}
        />
        <SaveButton />
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
        history.push('/artikler');
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
          <Route exact path="/artikler/" component={Livefeed} />
          <Route exact path="/artikler/" component={ArtikkelList} />
          <Route exact path="/artikler/:id/" component={ArticleDetails} />
          <Route exact path="/artikler/:id/edit" component={ArticleEdit} />
          <Route exact path="/artikler/lagNyhet" component={CreateArticle} />
          <Route exact path="/artikler/kategori/:kategori" component={ArticleByCategory} />
        </div>
      </div>
    </HashRouter>,
    root
  );
