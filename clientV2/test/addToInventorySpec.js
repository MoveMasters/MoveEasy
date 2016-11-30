import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import AddToInventory from './../master/jsx/components/AddToInventory/AddToInventory'
import axios from 'axios';
import moxios from 'moxios';
import util from './../master/util/util';

require('es6-promise').polyfill();




const itemName = 'Chair - Office';
const itemId = 4343;
const moveId = 12345;
const itemPrototypes = ['Chair - Office', 'Bookcase - Sections'];
const tags = ['Chair'];

const getCurrentItem = () => {
  return {
    name: itemName,
    id: itemId,
    tags: tags
  }
};


describe('AddToInventory Spec', () => {
  beforeEach(function (done) {

    moxios.install();
    moxios.stubRequest(util.serverURL + '/api/auth/clarifaiInfo', {
      status: 200,
      response: {
        itemPrototypes
      }
    });

    //should error out b/c of clarifai
    util.getClarifaiInfo().then( () => {
      done();
    })
    .catch( () => {
      done();
    });

  });

  afterEach(function () {
    moxios.uninstall();
  });


  it('Should shallow render AddToInventory', done => {
    const wrapper = shallow(<AddToInventory
      moveId={moveId}
      getCurrentItem={getCurrentItem}
    />);
    expect(wrapper.find('#topLevel')).to.have.length(1);
    done();
  });

});
