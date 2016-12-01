import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  Dimensions,
} from 'react-native';
import t from 'tcomb-form-native';

import Dashboard from './Dashboard';
import Information from './Information';
import helper from '../utils/helper';
import Login from './Login';

const Form = t.form.Form;
const Person = t.struct({
  name: t.String,
  email: t.String,
  password: t.String,
  'Confirm password': t.String,
});

const options = {
  fields: {
    email: {
      autoCapitalize: 'none',
    },
    password: {
      secureTextEntry: true,
    },
    'Confirm password': {
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

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.userInfo = null;
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
    const value = this.refs.form.getValue();

    if (value && value.password === value['Confirm password']) {
      const user = {
        name: value.name,
        username: value.email,
        password: value.password,
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
      <View style={styles.main}>
        <View style={styles.row}>
          <Text style={styles.title}>MoveKick</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <Form
              ref="form"
              style={{ borderColor: 'red' }}
              type={Person}
              options={options}
            />
          </View>
          <View style={styles.row}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.userAuth('signup')}
              underlayColor="limegreen"
            >
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.login}>
          <Text onPress={() => this.goToNext('signin')}>Already have an account? Sign in here!</Text>
        </View>
      </View>
    );
  }
}

/************************ STYLES *************************/

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: 'black',
  },
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    borderRadius: 5,
    flexDirection: 'column',
    // width: 150,
    // height: 300,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,.85)',
  },
  title: {
    fontSize: 50,
    fontFamily: 'Futura',
    marginTop: 50,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginBottom: 30,
    opacity: 1,
    textAlign: 'center',
    textShadowColor: 'black',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#1E90FF',
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 5,
    top: 30,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  login: {
    top: 80,
    alignSelf: 'center',
  },
});
