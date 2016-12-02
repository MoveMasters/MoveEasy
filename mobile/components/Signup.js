import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  Dimensions,
  Image,
} from 'react-native';
import {
  InputGroup,
  Input,
  Button,
} from 'native-base';

import Information from './Information';
import helper from '../utils/helper';
import Login from './Login';

const onValueChange = async (item, selectedValue) => {
  try {
    await AsyncStorage.setItem(item, selectedValue);
    console.log(`set ${item}: ${selectedValue}`);
  } catch (error) {
    console.log(`AsyncStorage error: ${error.message}`);
  }
};

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  }

  goToNext(type) {
    if (type === 'signup') {
      this.props.navigator.push({
        component: Information,
      });
    } else if (type === 'signin') {
      this.props.navigator.push({
        component: Login,
      });
    }
  }

  userAuth(type) {
    if (this.state.password === this.state.confirmPassword) {
      const user = {
        name: this.state.name,
        username: this.state.email,
        password: this.state.password,
      };

      helper.postUser(user, type)
      .then((response) => {
        const moveData = response.data.lastMove;

        if (moveData) {
          const moveId = moveData._id;
          onValueChange('moveId', moveId);
          onValueChange('moveData', JSON.stringify(moveData));
        }

        this.goToNext(type);
      })
      .catch((error) => {
        console.log(error);
        AlertIOS.alert('Invalid username or password. Please try again.');
      });
    } else if (value.password !== value['Confirm password']) {
      AlertIOS.alert('Passwords do not match! Please try again.');
    }
  }

  render() {

    return (
      <View>
        <View>
          <Image style={styles.logo}
            source={require('../assets/images/mkIcon.png')}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.info}>
            <InputGroup borderType="regular">
              <Input
                placeholder="Contact Name"
                onChangeText={name => this.setState({ name })}
              />
            </InputGroup>
            <InputGroup borderType="regular">
              <Input
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
              />
            </InputGroup>
            <InputGroup borderType="regular">
              <Input
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={password => this.setState({ password })}
              />
            </InputGroup>
            <InputGroup borderType="regular">
              <Input
                secureTextEntry={true}
                placeholder="Confirm password"
                onChangeText={confirmPassword => this.setState({ confirmPassword })}
              />
            </InputGroup>
          </View>
          <View style={styles.button}>
            <Button
              block
              primary
              onPress={() => this.userAuth('signup')}
            >
              Signup
            </Button>
          </View>
        </View>
        <TouchableHighlight style={styles.login}>
          <Text onPress={() => this.goToNext('signin')}>Already have an account? Sign in here!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

/************************ STYLES *************************/

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    borderRadius: 5,
    flexDirection: 'column',
    padding: 20,
    top: 30,
    backgroundColor: 'transparent',
  },
  logo: {
    top: 30,
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  button: {
    top: 30,
  },
  login: {
    top: 120,
    alignSelf: 'center',
  },
});
