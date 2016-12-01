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
  List,
  ListItem,
  InputGroup,
  Input,
  Button,
} from 'native-base';
import t from 'tcomb-form-native';

import Signup from './Signup';
import Dashboard from './Dashboard';
import Information from './Information';
import helper from '../utils/helper';

const Form = t.form.Form;
const Person = t.struct({
  email: t.String,
  password: t.String,
});

const options = {
  fields: {
    email: {
      autoCapitalize: 'none',
    },
    password: {
      secureTextEntry: true,
    },
  },
};

const onValueChange = async (item, selectedValue) => {
  try {
    await AsyncStorage.setItem(item, selectedValue);
    console.log(`set ${item}: ${selectedValue}`);
  } catch (error) {
    console.log(`AsyncStorage error: ${error.message}`);
  }
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  goToNext(type) {
    if (type === 'signup') {
      this.props.navigator.push({
        component: Signup,
      });
    } else if (type === 'signin') {
      this.props.navigator.push({
        component: Dashboard,
      });
    }
  }

  userAuth(type) {
    const user = {
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
  }

  render() {
    return (
      <View style={styles.main} flexDirection="column">
        <View>
          <Image style={styles.logo}
            source={require('../assets/images/mkLogo.png')}
          />
        </View>
        <View style={styles.container}>
          <View>
              <InputGroup borderType="regular">
                <Input
                  autoCapitalize="none"
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
          </View>
          <View style={styles.login}>
            <Button
              block
              primary
              onPress={() => this.userAuth('signin')}
            >
              Login
            </Button>
          </View>
        </View>
        <TouchableHighlight style={styles.signup}>
          <Text onPress={() => this.goToNext('signup')}>Don't have an account? Sign up here!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

/************************ STYLES *************************/

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  login: {
    top: 30,
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
    width: width * 0.9,
    borderRadius: 5,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,.85)',
  },
  signup: {
    top: 120,
    alignSelf: 'center',
  },
  logo: {
    top: 30,
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
