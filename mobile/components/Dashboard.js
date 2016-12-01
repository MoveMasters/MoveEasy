import React from 'react';
import moment from 'moment';
import { StyleSheet, AsyncStorage, View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Title,
  Button,
  Icon,
  Text,
} from 'native-base';
import helper from '../utils/helper';
import Survey from './Survey';
import Inventory from './Inventory';
import Chat from './Chat';
import Information from './Information';

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

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
      title: 'MoveKick',
      moveItems: [],
      moveData: null,
      showModal: false,
    };

    this.goToNext = this.goToNext.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentWillMount() {
    this._getMoveItems();

    getItem('moveData', (moveData) => {
      this.moveData = JSON.parse(moveData);
      this.setState({ content: 'surveyInfo' });
    });
  }


  _getMoveItems() {
    helper.getMoveItems()
    .then((response) => {
      this.setState({ moveItems: response.data.moveItems });
    })
    .catch(error => console.log('Error getting move items', error));
  }

  goToNext(type) {
    if (type === 'survey') {
      this.props.navigator.push({
        component: Survey,
      });
    } else if (type === 'info') {
      this.props.navigator.push({
        component: Information,
      });
    }
  }

  _renderContent() {
    if (this.state.content === 'surveyInfo') {
      return (
        <Content>
          <View style={styles.info}>
            <Title style={styles.title}>{this.moveData.name}</Title>
            <Text>{this.moveData.phone}</Text>
            <Text>{this.moveData.username}</Text>
          </View>
          <View style={styles.info}>
            <Title style={styles.title}>Current Address</Title>
            <Text>{this.moveData.currentAddress}</Text>
          </View>
          <View style={styles.info}>
            <Title style={styles.title}>Future Address</Title>
            <Text>{this.moveData.futureAddress}</Text>
          </View>
          <View justifyContent="center" alignItems="center">
            <Title style={styles.title}>Appointment Time</Title>
            <Text>{moment(this.moveData.surveyTime).calendar()}</Text>
            <Button alignSelf="center" onPress={() => this.goToNext('survey')}>
              Begin Survey
            </Button>
          </View>
        </Content>
      );
    } else if (this.state.content === 'inventory') {
      return (
        <Content justifyContent={this.state.moveItems.length ? null : "center"}>
          <Inventory moveItems={this.state.moveItems} />
        </Content>
      );
    } else if (this.state.content === 'chat') {
      return (
        <Content justifyContent="flex-end">
          <Chat />
        </Content>
      );
    }

    return <Content />;
  }

  render() {
    return (
      <Container>
        <Header flexDirection="row-reverse">
          <Title style={styles.title}>{this.state.title}</Title>
          {
            this.state.content === 'surveyInfo' ?
              <Button transparent onPress={() => this.goToNext}>
              Edit
              </Button>
              :
              <Button transparent>
                <Icon name="ios-settings" />
              </Button>
          }
        </Header>

        {this._renderContent()}

        <Footer>
          <FooterTab
            tabActiveBgColor="#4fb5f9"
            tabBarActiveTextColor="#2d83bc"
            tabBarTextColor="#6b6b6b"
          >
            <Button onPress={() => this.setState({ content: 'inventory', title: 'Inventory' })}>
              Inventory
              <Icon name="ios-list-box" />
            </Button>
            <Button onPress={() => this.setState({ content: 'surveyInfo', title: 'MoveKick' })}>
              Survey
              <Icon name="ios-camera" />
            </Button>
            <Button onPress={() => this.setState({ content: 'chat', title: 'Chat' })}>
              Chat
              <Icon name="ios-chatboxes" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  info: {
    alignItems: 'flex-start',
    paddingBottom: 20,
  },
});
