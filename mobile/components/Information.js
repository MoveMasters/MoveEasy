'use strict';

import React from 'react';
import {
  Button,
  Header,
  Footer,
  Title,
  Container,
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Icon,
} from 'native-base';
import { StyleSheet } from 'react-native';
import helper from '../utils/helper';
import Main from './Main';

export default class Information extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      currentAddress: '',
      futureAddress: '',
    };
  }

  goToMain() {
    this.props.navigator.push({
      component: Main,
      passProps: {

      },
    });
  }

  submitInfo() {
    const self = this;
    const info = {
      name: this.state.name,
      phone: this.state.phone,
      currentAddress: this.state.currentAddress,
      futureAddress: this.state.futureAddress,
    };

    // use helper to send info to server
    // receive moveID, save in AsyncStorage to be sent to mover?
    // should just send token so client sends to mover, who sends to database?
    // 
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>MoveKick</Title>
        </Header>
        <Content>
          <List style={styles.list}>
            <ListItem>
              <InputGroup>
                <Icon name="ios-person" />
                <Input
                  inlineLabel label="NAME"
                  placeholder="Name"
                  onChangeText={name => this.setState({ name })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-call" />
                <Input
                  inlineLabel
                  label="PHONE"
                  placeholder="Phone Number"
                  onChangeText={phone => this.setState({ phone })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  stackedLabel
                  label="Current Address"
                  placeholder="Address 1"
                  onChangeText={currentAddress => this.setState({ currentAddress })}    
              />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  stackedLabel
                  label="Future Address"
                  placeholder="Address 2"
                  onChangeText={futureAddress => this.setState({ futureAddress })}
                />
              </InputGroup>
            </ListItem>
          </List>
          <Button
            info
            style={styles.submit}
            onPress={this.submitInfo}
          >
            Submit
          </Button>
        </Content>
        <Footer />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    top: 40,
  },
  submit: {
    top: 70,
    alignSelf: 'center',
  },
});
