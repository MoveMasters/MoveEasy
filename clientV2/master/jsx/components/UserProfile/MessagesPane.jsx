import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Tab, Nav, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';

class MessagesPane extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Tab.Pane eventKey="messagesPane">
         <div className="panel b">
            <div className="panel-heading bg-gray-lighter text-bold">Messages</div>
            <div className="panel-body">
              Messages go here..
            </div>
         </div>
      </Tab.Pane>
    )
  }
}

export default MessagesPane