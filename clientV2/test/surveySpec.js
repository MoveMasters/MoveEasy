import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Survey from './../master/jsx/components/Survey/Survey'
import axios from 'axios';
import moxios from 'moxios';
require('es6-promise').polyfill();




xdescribe('FILL IN', () => {
  beforeEach(function () {
    moxios.install()
  });

  afterEach(function () {
    moxios.uninstall()
  });

  it('Should render Survey', done => {
    shallow(<Survey />);

    done();
  });

});
    

