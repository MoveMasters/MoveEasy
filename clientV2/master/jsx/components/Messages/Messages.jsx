import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';

import Contacts from './Contacts';
import Conversation from './Conversation';
import util from './../../../util/util';



class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts:[],
      displayedConvo:[]
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
        contactsById[contactsById.user_id] = contact;
      });
    })
  }


  onProfileClick(event) {
    //FIXME: get userid from event
    this.userSelected = this.state.contactsById[user_id];
    util.getConversation(user_id).then( messages => {
      this.setState({
        displayedConvo: messages,
        userSelected: userSelected
      });
    });
  }

  render() {
      return (
          <ContentWrapper>
            <Row>                 
                <Contacts 
                  contacts={this.state.contacts} 
                  onProfileClick={this.onProfileClick.bind(this)}
                />
                <Conversation
                  userSelected={this.state.userSelected}
                  displayedConvo={this.state.displayedConvo}
                />
            </Row>
          </ContentWrapper>
      )
  }
}

export default Messages;