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

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.onSend = this.onSend.bind(this);
  }
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 2,
          text: 'Hello app',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 1,
            name: 'Joe',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    console.log(this.state.messages);
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
