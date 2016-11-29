import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import AddToInventory from './../master/jsx/components/AddToInventory/AddToInventory'
import axios from 'axios';
import moxios from 'moxios';
import util from './../master/util/util';

require('es6-promise').polyfill();




const name = 'Steve';
const moveId = 12345;
const itemPrototypes = ['Chair - Office', 'Bookcase - Sections'];

const getCurrentItem = () => {
  return {
    name: name
  }
};


describe('AddToInventory Spec', () => {
  beforeEach(function (done) {
    sinon.spy(AddToInventory.prototype, 'componentDidMount');

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
    AddToInventory.prototype.componentDidMount.restore();
  });


  it('Should shallow render AddToInventory', done => {
    shallow(<AddToInventory
      moveId={moveId}
      getCurrentItem={getCurrentItem}
    />);
    expect(AddToInventory.prototype.componentDidMount.calledOnce).to.equal(true);
    done();
  });

  it('Should mount AddToInventory', done => {
    //mount(<AddToInventory/>);
    done();
  });

});
    
    
// getCurrentItem={ getCurrentItem } 
// stepIndex={ stepIndex }
// handleNext={this.handleNext.bind(this)}
// dequeueItem={ dequeueItem }
// updateInventory={ updateInventory }
// moveId={ moveId }
// openSnackbar={ openSnackbar }/>
