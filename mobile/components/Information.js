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
import { StyleSheet, AsyncStorage, AlertIOS, DatePickerIOS } from 'react-native';
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

  async submitInfo(context) {
    console.log(context);
    const moveObj = {
      name: context.state.name,
      phone: context.state.phone,
      currentAddress: context.state.currentAddress,
      futureAddress: context.state.futureAddress,
    };
    console.log(moveObj);

    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        helper.newMove(moveObj, token)
        .then((response) => {
          // what do here?
        })
        .catch((error) => {
          console.log(error);
          AlertIOS.alert('There was a problem saving your information. Please try again.');
        });
      }
    } catch (error) {
      console.log('Error submitting new move info:', error);
    }
  }

  render() {
    const self = this;

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
                  onChangeText={(name) => {
                    this.setState({ name });
                    console.log('set the new name', name);
                  }}
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
          <DatePickerIOS
            date={new Date()}
            mode="date"
            timeZoneOffsetInMinutes={(-1) * (new Date()).getTimezoneOffset()}
          />
          <Button
            info
            style={styles.submit}
            onPress={() => this.submitInfo(self)}
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
