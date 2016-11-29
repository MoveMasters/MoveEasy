'use strict';

import React from 'react';
import {
  Button,
  Container,
  Header,
  Content,
  Footer,
  Title,
  List,
  ListItem,
  InputGroup,
  Input,
  Icon,
} from 'native-base';
import { StyleSheet, AsyncStorage, AlertIOS, DatePickerIOS, View } from 'react-native';
import helper from '../utils/helper';
import Dashboard from './Dashboard';

const storeItem = async (item, selectedValue) => {
  try {
    await AsyncStorage.setItem(item, selectedValue);
    console.log(`stored ${item}: ${selectedValue}`);
  } catch (error) {
    console.log(`AsyncStorage error: ${error.message}`);
  }
};

export default class Information extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      currentAddress: '',
      futureAddress: '',
      date: new Date(),
    };
  }

  goToDashboard() {
    this.props.navigator.push({
      component: Dashboard,
      passProps: {

      },
    });
  }

  submitInfo() {
    const moveObj = {
      name: this.state.name,
      phone: this.state.phone,
      currentAddress: this.state.currentAddress,
      futureAddress: this.state.futureAddress,
      surveyTime: this.state.date,
    };

    helper.newMove(moveObj)
    .then((response) => {
      const moveId = response.data._id;

      storeItem('moveId', moveId);
      this.goToDashboard();
    })
    .catch((error) => {
      console.log(error);
      AlertIOS.alert('There was a problem saving your information. Please try again.');
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Title style={styles.title}>MoveKick</Title>
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
          <View style={styles.picker}>
            <Title style={styles.title}>Schedule Survey</Title>
            <DatePickerIOS
              date={this.state.date}
              mode="datetime"
              timeZoneOffsetInMinutes={(-1) * (new Date()).getTimezoneOffset()}
              onDateChange={date => this.setState({ date })}
            />
          </View>
          <Button
            info
            style={styles.submit}
            onPress={() => this.submitInfo()}
          >
            Submit
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  list: {
    top: 15,
  },
  picker: {
    top: 30,
  },
  submit: {
    top: 40,
    alignSelf: 'center',
  },
});
