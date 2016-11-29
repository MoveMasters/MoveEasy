'use strict';

import React from 'react';
import { StyleSheet, AsyncStorage, AlertIOS, View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Title,
  Button,
  Icon,
} from 'native-base';
import helper from '../utils/helper';
import Survey from './Survey';
import Inventory from './Inventory';
import Chat from './Chat';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
      tab: props.content || 'survey',
      title: 'MoveKick',
      moveItems: [],
      messages: [],
    };

    this.goToSurvey = this.goToSurvey.bind(this);
  }

  componentWillMount() {
    this._getMoveItems();
    // this._getChatHistory();
  }


  _getMoveItems() {
    helper.getMoveItems()
    .then((response) => {
      this.setState({ moveItems: response.data.moveItems });
    })
    .catch(error => console.log('Error getting move items', error));
  }

  // _getChatHistory() {
  //   helper.getConversation() {
  //   .then((response) => {
  //     this.setState({ messages: response.data.meesages });
  //   })
  //   .catch(error => console.log('Error getting chat history', error));
  //   }
  // }

  goToSurvey() {
    this.props.navigator.push({
      component: Survey,
      passProps: {
      },
    });
  }

  _renderContent() {
    if (this.state.content === 'inventory') {
      return (
        <Content justifyContent={this.state.moveItems.length ? null : "center"}>
          <Inventory moveItems={this.state.moveItems} />
        </Content>
      );
    } else if (this.state.content === 'chat') {
      return (
        <Content justifyContent="flex-end">
          <Chat chatHistory={this.state.messages} />
        </Content>
      );
    }

    return <Content />;
  }

  render() {
    return (
      <Container>
        <Header flexDirection="row-reverse">
          <Title style={styles.title}>{this.state.title}</Title>
          <Button backgroundColor="transparent">
            <Icon name="ios-settings-outline" style={styles.profile} />
          </Button>
        </Header>
        {this._renderContent()}
        <Footer>
          <FooterTab
            tabActiveBgColor="#6b6b6b"
            tabBarActiveTextColor="#6b6b6b"
            tabBarTextColor="#6b6b6b"
          >
            <Button onPress={() => this.setState({ content: 'inventory', title: 'Inventory' })}>
              <Icon name="ios-list-box-outline" />
              Inventory
            </Button>
            <Button onPress={() => this.goToSurvey()}>
              <Icon name="ios-camera-outline" />
              Survey
            </Button>
            <Button onPress={() => this.setState({ content: 'chat', title: 'Chat' })}>
              <Icon name="ios-chatboxes-outline" />
              Chat
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  profile: {
    color: 'black',
  },
});
