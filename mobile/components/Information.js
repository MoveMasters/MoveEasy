import React from 'react';
import {
  Button,
  Container,
  Header,
  Content,
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

const getItem = async (item, cb) => {
  try {
    const value = await AsyncStorage.getItem(item);
    if (value !== null) {
      cb(value);
    }
  } catch (error) {
    console.log('Error submitting new move info:', error);
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
      updating: false,
      move: null,
    };
  }

  componentWillMount() {
    helper.getExistingMove()
    .then((response) => {
      if (!response.data.move) { return; }
      const move = response.data.move;
      console.log(move);
      this.setState({
        name: move.name,
        phone: move.phone,
        currentAddress: move.currentAddress,
        futureAddress: move.futureAddress,
        date: new Date(move.surveyTime),
        updating: true,
        move,
      });
    })
    .catch(error => console.log('Error getting current move:', error));
  }
  goToDashboard() {
    this.props.navigator.push({
      component: Dashboard,
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

    if (this.state.updating) {
      moveObj.user_id = this.state.move.user_id;
      moveObj.move_id = this.state.move._id;
      console.log(moveObj);

      helper.updateExistingMove(moveObj)
      .then((response) => {
        const moveData = response.data;
        const moveId = moveData._id;

        storeItem('moveData', JSON.stringify(moveData));
        this.goToDashboard();
      })
      .catch((error) => {
        console.log(error);
        AlertIOS.alert('There was a problem updating your information. Please try again.');
      }
    } else {
      helper.newMove(moveObj)
      .then((response) => {
        console.log(response);
        const moveData = response.data;
        const moveId = moveData._id;

        storeItem('moveData', JSON.stringify(moveData));
        storeItem('moveId', moveId);

        this.goToDashboard();
      })
      .catch((error) => {
        console.log(error);
        AlertIOS.alert('There was a problem saving your information. Please try again.');
      });
    }
  }

  render() {
    console.log(this.state);
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
                  placeholder={this.state.name.length ? this.state.name : 'Contact Name'}
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
                  placeholder={this.state.phone.length ? this.state.phone : 'Phone Number'}
                  onChangeText={phone => this.setState({ phone })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  stackedLabel
                  label="Current Address"
                  placeholder={this.state.currentAddress.length ? this.state.currentAddress : 'Current Address'}
                  onChangeText={currentAddress => this.setState({ currentAddress })}    
              />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  stackedLabel
                  label="Future Address"
                  placeholder={this.state.futureAddress.length ? this.state.futureAddress : 'Future Address'}
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
