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
import Main from './Main';
import Inventory from './Inventory';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
      tab: props.content || 'survey',
      title: 'MoveKick',
      moveItems: [],
    };
  }

  componentWillMount() {
    this._getMoveItems();
  }

  _getMoveItems() {
    helper.getMoveItems()
    .then((response) => {
      this.setState({ moveItems: response.data.moveItems });
    })
    .catch(error => console.log('Error getting move items', error));
  }

  goToSurvey() {
    this.props.navigator.push({
      component: Main,
      passProps: {
      },
    });
  }

  _renderContent() {
    if (this.state.content === 'inventory') {
      return (
        <Inventory moveItems={this.state.moveItems} />
      );
    } else if (this.state.content === 'chat') {
      return (
        <Icon name="ios-settings-outline" />
      );
    }

    return null;
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

        <Content>
          {this._renderContent()}
        </Content>

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
