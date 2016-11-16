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

import Main from './Main';
import Information from './Information';
import helper from '../utils/helper';

const Form = t.form.Form;
const Person = t.struct({
  username: t.String,
  password: t.String,
});

const options = {
  fields: {
    username: {
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
  } catch (error) {
    console.log(`AsyncStorage error: ${error.message}`);
  }
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.userInfo = null;
  }

  goToNext(type) {
    if (type === 'signup') {
      this.props.navigator.push({
        component: Information,
        passProps: {
        },
      });
    } else if (type === 'signin') {
      this.props.navigator.push({
        component: Main,
        passProps: {
        },
      });
    }
  }

  userAuth(type) {
    const value = this.refs.form.getValue();
    if (value) {
      const user = {
        username: value.username,
        password: value.password,
      };
      console.log(type);
      helper.postUser(user, type)
        .then((response) => {
          const token = response.data.token;
          onValueChange('token', token);
          this.goToNext(type);
        })
        .catch((error) => {
          console.log(error);
          AlertIOS.alert('Invalid username or password. Please try again.');
        });
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
                style={{borderColor: 'red'}}
                type={Person}
                options={options}
              />
            </View>
            <View style={styles.row}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => this.userAuth('signin')}
                underlayColor="limegreen"
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={() => this.userAuth('signup')}
                underlayColor="limegreen"
              >
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableHighlight>
            </View>
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
    marginTop: 100,
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
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});
