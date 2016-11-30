import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Tab, Nav, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';

class ClientCard extends Component {
  render() {
    const { name, phone, email, onClickVideoCall } = this.props;
    return (
      <div className="panel panel-default">
         <div className="panel-body text-center">
            <div className="pv-lg">
               <img src="https://t3.ftcdn.net/jpg/01/06/07/16/240_F_106071621_UwCztl7yyMbVNSMijfuYyZrzbtmoxJPH.jpg" alt="Contact" className="center-block img-responsive img-circle img-thumbnail thumb96" />
            </div>
            <h3 className="m0 text-bold">{ name }</h3>
            <div className="mv-lg">
               <p>{ `${phone} | ${email}` }</p>
            </div>
            <div className="text-center" style={{color: 'white'}}>
              <a className="btn btn-primary col-md-5" style={{marginLeft: '6%'}}>Send message</a>
              <a 
                className="btn btn-primary col-md-5" 
                style={{marginLeft: '6%'}}
                onClick={ onClickVideoCall }>Video Call</a>
            </div>
         </div>
      </div>
    );
  }
}

export default ClientCard;
