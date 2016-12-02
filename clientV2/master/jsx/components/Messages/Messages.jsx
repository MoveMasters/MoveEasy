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
    this.orderedContacts = [];
    this.state = {
      displayedContacts:[],
      displayedConvo:[],
      userSelected: null
    };

    this.updateContacts();
    this.intervalID = setInterval(this.autoUpdate.bind(this), 1000);
  }

  componentWillUnmount () {
    if(this.intervalID) {
      clearInterval(this.intervalID);
      delete this.intervalID;
    }
  }

  updateContacts() {
    util.getContacts().then( contacts => {
      contacts = contacts || [];
      //map by userIid
      this.contactsById = {};
      this.orderedContacts = [];
      contacts.forEach( contact => {
        this.contactsById[contact._id] = contact;
        this.orderedContacts.push(contact);
      });
      this.setSearchDisplayContacts('');

      //update selection if empty
      if (!this.state.userSelected) {
        this.updateConversation(contacts[0]._id);
      }
    });
  }

  autoUpdate() {
    if(!this.state.userSelected) {
      return;
    }
    const userId = this.state.userSelected._id;
    this.updateConversation(userId);
  }

  updateConversation(userId) {
    const userSelected = this.contactsById[userId];
    util.getConversation(userId).then( messages => {
      this.setState({
        displayedConvo: messages,
        userSelected: userSelected
      });
    });
  }


  onProfileClick(event) {
    const userId = $(event.target).closest('tr')[0].id;
    this.updateConversation(userId);
  }




  setSearchDisplayContacts(query) {
    query = query.toLowerCase();
    if(!query.length) {
      this.setState({displayedContacts: this.orderedContacts});
      return;
    }
    var contactsToShow = [];
    this.orderedContacts.forEach( contact => {
      const nameSplit = contact.name.toLowerCase().split('');
      for( var i = 0; i < nameSplit.length; i ++) {
        const testWord = nameSplit[i];
        if(query === testWord) {
          contactsToShow.push(contact);
          break;
        }
      }
    });
    this.setState({displayedContacts: contactsToShow});
  }

  onContactType(event) {
    const query = event.target.value;
    this.setSearchDisplayContacts(query);
  }



  onMessageSend(message) {
    const userId = this.state.userSelected._id;
    util.sendNewMessage(userId, message).then( newMessage => {
      this.updateConversation(userId);
    });
  }

  render() {
      return (
          <ContentWrapper>
            <Row>                 
                <Contacts
                  onContactType={this.onContactType.bind(this)}
                  contacts={this.state.displayedContacts} 
                  onProfileClick={this.onProfileClick.bind(this)}
                />
                <Conversation
                  userSelected={this.state.userSelected}
                  displayedConvo={this.state.displayedConvo}
                  onMessageSend={this.onMessageSend.bind(this)}
                  colNum={8}
                />
            </Row>
          </ContentWrapper>
      )
  }
}

export default Messages;