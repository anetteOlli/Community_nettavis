// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert } from './widgets';
import { artikkelService } from './services';

// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} exact to="/">
                Artikler side
              </NavLink>
            </td>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} to="/api/artikler">
                Artikler
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class Home extends Component {
  render() {
    return <div>React example with component state</div>;
  }
}

class ArtikkelList extends Component {
  artikler = [];

  render() {
    return (
      <ul>
        {this.artikler.map(artikkel => (
          <li key={artikkel.id}>
          {console.log(artikkel)}
            <NavLink activeStyle={{ color: 'darkblue' }} exact to={'/api/artikler/' + artikkel.id}>
              {artikkel.tittel}
            </NavLink>{' '}
            <NavLink activeStyle={{ color: 'darkblue' }} to={'/api/artikler/' + artikkel.id + '/edit'}>
              edit
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    artikkelService
      .getArticles()
      .then(artikler => (this.artikler = artikler))
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
        {console.log("forsøker å skrive ut artikkel resultatet: ", this.artikkel, ", vha json.stringify: " + JSON.stringify(this.artikkel) + " forsøker å hente ut artikkel data: " + this.artikkel[0].tittel)}
        {console.log(this.artikkel)}
          <li>Tittel: {this.artikkel[0].tittel}</li>
          <li>Innhold: {this.artikkel[0].innhold}</li>
          <li>BildeUrl: {this.artikkel[0].bildeLink}</li>
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
        if (this.artikkel) history.push('/api/artikkel/' + this.artikkel.id);
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
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/api/artikler" component={ArtikkelList} />
        <Route exact path="/api/artikler/:id" component={ArticleDetails} />
        <Route exact path="/api/artikler/:id/edit" component={ArticleEdit} />
      </div>
    </HashRouter>,
    root
  );
