import React from 'react';
import { AppRegistry, Navigator } from 'react-native';

import Main from './components/Main';
import Login from './components/Login';
import Information from './components/Information';
import Dashboard from './components/Dashboard';

class mkmobile extends React.Component {
  constructor(props) {
    super(props);

    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, navigator) {
    return (
      <route.component
        {...route.passProps}
        navigator={navigator}
      />
    );
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'Login', component: Login }}
        renderScene={this.renderScene}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
      />
    );
  }
}

AppRegistry.registerComponent('mkmobile', () => mkmobile);
