import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Tab, Nav, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';

import Conversation from './../Messages/Conversation';

class MessagesPane extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.updateMessageState(true);
  }

  componentWillUnmount() {
    this.props.updateMessageState(false);
  }


  render() {
    return (
      <Tab.Pane eventKey="messagesPane">
        <Conversation
          userSelected={this.props.userSelected}
          displayedConvo={this.props.displayedConvo}
          onMessageSend={this.props.onMessageSend}
          colNum={12}
        />
      </Tab.Pane>
    )
  }
}

export default MessagesPane