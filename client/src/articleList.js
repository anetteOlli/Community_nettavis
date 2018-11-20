// @flow

import { Card, CardBody, CardFooter, CardImg, CardText, Pagination, Page } from './widgets';
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Article } from './datastructures';

// type Article {
//   tittel: string,
//   id : number,
//   bildeLink: string,
//   bildeTekst: string
// }

type Props = {
  article?: Article[]
};

export class ArticleList extends Component<Props> {
  render() {
    return (
      <div>
        {// $FlowFixMe
        this.props.article.map(artikkel => (
          <Card key={artikkel.id}>
            <CardBody title={artikkel.tittel}>
              {console.log('i articleList', artikkel)}
              <CardImg src={artikkel.bildeLink} alt={artikkel.bildeTekst} />
              <br />
              <a href={'#/artikler/' + artikkel.id}> les mer </a>
            </CardBody>
            <CardFooter>Dato opprettet: {artikkel.opprettet} </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  changePage() {
    //$FlowFixMe
    history.push('/artikler/?page=' + event.target.value);
    window.location.reload();
  }
}
