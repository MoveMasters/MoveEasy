import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';

import Contacts from './Contacts';
import Conversation from './Conversation';
import util from './../../../util/util';



class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.contactsById = {};
    this.state = {
      contacts:[],
      displayedConvo:[],
      userSelected: null
    };

    this.updateContacts();
  }

  updateContacts() {
    util.getContacts().then( contacts => {
      contacts = contacts || [];
      this.setState({contacts});
      //map by userIid
      this.contactsById = {};
      contacts.forEach( contact => {
        this.contactsById[contact._id] = contact;
      });
    });
  }


  updateConversation(userId) {
    util.getConversation(userId).then( messages => {
      this.setState({
        displayedConvo: messages,
      });
    });
  }


  onProfileClick(event) {
    const userId = $(event.target).closest('tr')[0].id;
    const userSelected = this.contactsById[userId];
    this.updateConversation(userId);
    this.setState({
      userSelected: userSelected
    });
  }

  onContactType(event) {

  }

  onSearch(event) {

  }

  onMessageSend(event) {
    const text = $('#message-input').val();
    if (!text) { return; }

    const userId = this.state.userSelected._id;
    util.sendNewMessage(userId, text).then( newMessage => {
      this.updateConversation(userId);
    });
  }

  render() {
      return (
          <ContentWrapper>
            <Row>                 
                <Contacts
                  onContactType={this.onContactType.bind(this)}
                  onSearch={this.onSearch.bind(this)}
                  contacts={this.state.contacts} 
                  onProfileClick={this.onProfileClick.bind(this)}
                />
                <Conversation
                  userSelected={this.state.userSelected}
                  displayedConvo={this.state.displayedConvo}
                  onMessageSend={this.onMessageSend.bind(this)}
                />
            </Row>
          </ContentWrapper>
      )
  }
}

export default Messages;