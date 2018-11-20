// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ArtikkelList, ArticleEdit, CreateArticle } from '../src/index.js';
import { shallow, mount } from 'enzyme';
import { artiklerTest } from './testData.js';
import { ArticleList } from '../src/articleList';
import { Article } from '../src/datastructures';

describe('ArticleList test', () => {
  //   const articles = { new Article(id: 1, tittel: 'nyhet1', innhold:'innhold1', bildeLink: 'bildelink1', bildeTekst: 'bildeTekst1', isViktig:0, opprettet: '2018-11-19 23:43', endret: '2018-11-19 23:43'),
  // new Article (id: 1, tittel: 'nyhet2', innhold:'innhold2', bildeLink: 'bildelink2', bildeTekst: 'bildeTekst2', isViktig:0, opprettet: '2018-11-19 23:43', endret: '2018-11-19 23:43')}
  const wrapper = shallow(<ArticleList article={artiklerTest} />);
  it('should have one div', () => {
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('should have four cards', () => {
    console.log(wrapper.debug());
    expect(wrapper.find('Card')).toHaveLength(4);
  });
});
