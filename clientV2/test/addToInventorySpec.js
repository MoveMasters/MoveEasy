import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import AddToInventory from './../master/jsx/components/AddToInventory/AddToInventory'
import axios from 'axios';
import moxios from 'moxios';
require('es6-promise').polyfill();




const moveId = 12345;
const getCurrentItem = () => {
};



describe('FILL IN', () => {
  beforeEach(function () {
    moxios.install()
  });

  afterEach(function () {
    moxios.uninstall()
  });

  //FIXME: Add a check to see if it works
  it('Should shallow render AddToInventory', done => {
    shallow(<AddToInventory
      moveId={moveId}
      getCurrentItem={getCurrentItem}
    />);
    //expect(Survey.prototype.componentDidMount.calledOnce).to.equal(true);
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
