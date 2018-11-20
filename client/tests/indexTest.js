// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ArtikkelList} from '../src/index.js';
import { shallow, mount } from 'enzyme';
import { artiklerTest } from './testData.js';

describe('ArtikkelList test', () => {
  const context = { artikler: artiklerTest };
  // $FlowFixMe
  const wrapper = shallow(<ArtikkelList artikler={context} />);
  console.log('wrapper', wrapper);
  it('should render one div', () => {
    //hvis denne testen feiler er det noe seriøst galt som feiler.
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('should render less than 20 Articles', () => {
    console.log('number of articles: ', wrapper.debug());
    expect(wrapper.find('Card').length).toBeLessThan(20);
  });
});
