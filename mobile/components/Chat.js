// send message object
// destination_id (id of the user i'm sending to)
// text (just a string)
// route: /api/message/newMessage
// getting conversation: need destination_id
// route: /api/message/conversation

'use strict';

import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import {
  Thumbnail,
  Title,
} from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import helper from '../utils/helper';

let retrieveMessages;

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    const self = this;
    helper.retrieveMessages(self);
    retrieveMessages = setInterval(() => helper.retrieveMessages(self), 5000);
  }

  componentWillUnmount() {
    clearInterval(retrieveMessages);
  }

  onSend(messages = []) {
    const text = messages[0].text;
    helper.postNewMessage(text);

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  chatbox: {
    top: 15,
    bottom: 15,
  },
  message: {
    padding: 5,
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
});
