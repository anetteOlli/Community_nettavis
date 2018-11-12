// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, NavBarA, Card, CardBody, CardFooter, CardImg } from './widgets';
import { artikkelService } from './services';
import {FormGroupText, CheckBox, FormGroupTextArea, SaveButton, DefaultSelect} from './articleform';
import { Motion, spring } from "react-motion";




import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


class Home extends Component {
  render() {
    return <div>React example with component state</div>;
  }
}

class ArtikkelList extends Component {
  artikler = [];
  nyligeArtikler = [];


  render() {
    return (
      <div>

      {console.log('nylige artikler' , this.nyligeArtikler)}
      <Motion
        defaultStyle={{ x: 400}}
        style={{
          x: spring(-1000 , {stiffness: 5})
        }}
      >
        {(style) => (
          <ul className='nav'
            style={{
              transform: `translateX(${style.x}px)`
            }}
          >
            {this.nyligeArtikler.map(artikkel =>(
              <li key={artikkel.id} className='nav-item'>
              <a  href={'#/api/artikler/' + artikkel.id}> {artikkel.tittel} </a>
              </li>
              ))}
          </ul>
        )}
      </Motion>
        {this.artikler.map(artikkel => (
          <Card key={artikkel.id}>
          <CardBody title={artikkel.tittel} >
          {console.log(artikkel)}
          <CardImg src={artikkel.bildeLink} alt={artikkel.bildeTekst} />
          <a href={'#/api/artikler/' + artikkel.id} > les mer </a>
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
        this.artikler = artikler;
        //begrenser antall artikler på hovedsiden:
        if(this.artikler.length > 20){
          this.artikler.length = 20;
        }
        var now = new Date();
        var oneDayAgo = (now.getDate() - 1);
        console.log(now);
        //filtrere artikler som skal benyttes til å generere marquees'en:
        this.nyligeArtikler = this.artikler.filter(function(article, i){
            return (Date.parse(article.opprettet) > oneDayAgo && i < 5 );
          });
        console.log(this.nyligeArtikler [0]);
        })
      .catch((error: Error) => Alert.danger(error.message));
  }
}

class ArticleDetails extends Component<{ match: { params: { id: number } } }> {
  artikkel = null;

  render() {
    if (!this.artikkel) return null;

    return (
      <div>
        <ul>
          {
            console.log(
            'forsøker å skrive ut artikkel resultatet: ',
            this.artikkel,
            ', vha json.stringify: ' +
              JSON.stringify(this.artikkel) +
              ' forsøker å hente ut artikkel data: ' +
              // $FlowFixMe
              this.artikkel[0].tittel
          )}
          {console.log(this.artikkel)}
          <li>Tittel: {// $FlowFixMe
            this.artikkel[0].tittel}</li>
          <li>Innhold: {// $FlowFixMe
            this.artikkel[0].innhold}</li>
          <li>BildeUrl: {// $FlowFixMe
            this.artikkel[0].bildeLink}</li>
        </ul>
      </div>
    );
  }

  mounted() {
    artikkelService
      .getArticle(this.props.match.params.id)
      .then(artikkel => (this.artikkel = artikkel))
      .catch((error: Error) => Alert.danger(error.message));
  }
}

class ArticleEdit extends Component<{ match: { params: { id: number } } }> {
  artikkel = null;

  render() {
    if (!this.artikkel) return null;

    return (
      <form>
        <ul>
          <li>
            tittel:{' '}
            <input
              type="text"
              value={this.artikkel.tittel}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.artikkel) this.artikkel.tittel = event.target.value;
              }}
            />
          </li>
          <li>
            innhold:{' '}
            <input
              type="text"
              value={this.artikkel.innhold}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.artikkel) this.artikkel.innhold = event.target.value;
              }}
            />
          </li>
          <li>
            Email:{' '}
            <input
              type="text"
              value={this.artikkel.bildeLink}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.artikkel) this.artikkel.bildeLink = event.target.value;
              }}
            />
          </li>
        </ul>
        <button type="button" onClick={this.save}>
          Save
        </button>
      </form>
    );
  }

  mounted() {
    artikkelService
      .getArticle(this.props.match.params.id)
      .then(artikkel => (this.artikkel = artikkel))
      .catch((error: Error) => Alert.danger(error.message));
  }

  save() {
    if (!this.artikkel) return null;

    artikkelService
      .updateArticle(this.artikkel)
      .then(() => {
        let artikkelList = ArtikkelList.instance();
        if (artikkelList) artikkelList.mounted(); // Update Studentlist-component
        if (this.artikkel) history.push('/api/artikler/' + this.artikkel.id);
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
class ArticleByCategory extends Component{
  render() {
    return(
      <p> sadfadfajfkøl ajkødlkfjad ø </p>
      )
  }
}
class NavBarHolder extends Component{
  render(){
    return(
      <NavBar home='#/api/artikler' title='Hello News'>
        <NavBarA href='#/api/artikkel/kategori/internet-of-shit'> Internet of shit </NavBarA>
        <NavBarA href='#/api/artikkel/kategori/matlaging'> Matlaging </NavBarA>
        <NavBarA href='#/api/artikkel/kategori/agurkNytt'> Agurknytt </NavBarA>
        <NavBarA href='#/api/artikkel/lagNyhet'> publiser nyhet </NavBarA>
      </NavBar>
      );
  }
}


class CreateArticle extends Component{


  constructor(props){
    super(props);
    this.state = {
      article :{
        tittel : '',
        innhold : '',
        kategori : 'matlaging',   //setter verdi til matlagin som er det øverste som kommer opp på options
        bildeLink : '',
        isViktig : 0,
        bildeTekst : '',

      }
    }
    this.save = this.save.bind(this);

  }


  render(){
    return (
      <form>
      <FormGroupText
        type='text'
        description='Tittel'
        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                       this.state.article.tittel = event.target.value;
                     }} />
        <FormGroupTextArea
          description='Innhold'
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            this.state.article.innhold = event.target.value;
          }} />
          <DefaultSelect
            description='kategori'
            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                           this.state.article.kategori = event.target.value;}}>
                           <option value='matlaging'> matlaging </option>
                           <option value='internetOfShit'> internet of shit </option>
                           <option value='agurknytt'> agurknytt </option>
          </DefaultSelect>
        <FormGroupText
          type='url'
          description='bildelenke'
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    this.state.article.bildeLink = event.target.value;}} />
        <FormGroupText
          type='text'
          description='bildetekst'
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    this.state.article.bildeTekst = event.target.value;}} />

        <CheckBox description='publiser på hovedsiden'
         onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                   this.state.article.isViktig = event.target.value;}}/>
        <SaveButton onClick={this.save} />
      </form>
    );
  }
  save() {

    console.log("trying to add article:", this.state);
     artikkelService.addArticle(this.state.article).then(data=>{
       console.log('artikkel er lagret', data.insertId);
       history.push('/api/artikler/' + data.insertId.toString());
       }).catch((error: Error) => Alert.danger(error.message));

  }
}


const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <NavBarHolder/>
        <div className='container'>
        <Route exact path="/" component={Home} />
        <Route exact path="/api/artikler" component={ArtikkelList} />
        <Route exact path="/api/artikler/:id" component={ArticleDetails} />
        <Route exact path="/api/artikler/:id/edit" component={ArticleEdit} />
        <Route exact path="/api/artikkel/lagNyhet" component={CreateArticle} />
        <Route exact path="/api/artikler/kategori/:kategori" component={ArticleByCategory}/>
        </div>
      </div>
    </HashRouter>,
    root
  );
