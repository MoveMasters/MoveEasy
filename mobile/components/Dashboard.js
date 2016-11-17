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

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Container>
        <Header flexDirection="row-reverse">
          <Title style={styles.title}>MoveKick</Title>
          <Button backgroundColor="transparent">
            <Icon name="ios-settings-outline" style={styles.profile} />
          </Button>
        </Header>

        <Content>
        </Content>

        <Footer>
          <FooterTab>
            <Button>
              <Icon name="ios-list"/>
              Moves
            </Button>
            <Button>
              <Icon name="ios-camera-outline" />
              Survey
            </Button>
            <Button>
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
