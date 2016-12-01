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
import myTheme from '../themes/myTheme';

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
      moveData: null,
    };
  }

  componentWillMount() {
    getItem('moveData', (moveData) => {
      if (!moveData) { return; }

      moveData = JSON.parse(moveData);

      this.setState({
        name: moveData.name,
        phone: moveData.phone,
        currentAddress: moveData.currentAddress,
        futureAddress: moveData.futureAddress,
        date: new Date(moveData.surveyTime),
        updating: true,
        moveData,
      });
    });
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
      moveObj.user_id = this.state.moveData.user_id;
      moveObj._id = this.state.moveData._id;

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
      });
    } else {
      helper.newMove(moveObj)
      .then((response) => {
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
    const namePH = this.state.name.length ? this.state.name : 'Contact Name';
    const phonePH = this.state.phone.length ? this.state.phone : 'Phone Number';
    const currentAdrPH = this.state.currentAddress.length ? this.state.currentAddress : 'Current Address';
    const futureAdrPH = this.state.futureAddress.length ? this.state.futureAddress : 'Future Address';

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
                  placeholder={namePH}
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
                  placeholder={phonePH}
                  onChangeText={phone => this.setState({ phone })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  stackedLabel
                  label="Current Address"
                  placeholder={currentAdrPH}
                  onChangeText={currentAddress => this.setState({ currentAddress })}    
              />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  stackedLabel
                  label="Future Address"
                  placeholder={futureAdrPH}
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
