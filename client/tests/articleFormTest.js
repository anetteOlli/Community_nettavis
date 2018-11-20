// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { shallow, mount } from 'enzyme';
import { ArticleForm} from '../src/articleform.js';
import { artiklerTest } from './testData.js';

describe('articleForm tests', () => {
  const wrapper = shallow (<ArticleForm article={artiklerTest[0]}/>);

  it('renders', ()=>{
    expect(wrapper.find('form')).toHaveLength(1);
    });

  })


//bug i testrunner?
