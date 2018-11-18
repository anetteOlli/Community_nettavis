// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ArtikkelList, ArticleEdit, CreateArticle } from '../src/index.js';
import { shallow, mount } from 'enzyme';

describe('ArtikkelList test', ()=>{
  const wrapper = shallow(<ArtikkelList />);

  it('should render one div', () => {
    //hvis denne testen feiler er det noe seriøst galt som feiler.
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('should render one marque', () =>{
    //sjekk av at marqueen ikke ender opp blir rendered flere ganger
    expect(wrapper.find('Marquee')).toHaveLength(1);
  });
  it('should render less than 20 Articles', ()=>{
    expect(wrapper.find('Card').length).toBeLessThan(20);
  });
});
describe('CreateArticle', ()=>{
  const wrapper = shallow(<CreateArticle />);
  const instance = wrapper.instance();
  it('should render one form', ()=>{
    expect(wrapper.find('form')).toHaveLength(1);
  });
  // it('should detect changes in checkbox', ()=>{
  //   console.log("leser ut props:");
  //   expect( wrapper.prop(article.isViktig)).to.equal(1);
  // });
});
