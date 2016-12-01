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
import myTheme from '../themes/myTheme';

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
      inventoryTab: false,
      surveyInfoTab: true,
      chatTab: false,
    };

    this.goToNext = this.goToNext.bind(this);
    this.toggleInventoryTab = this.toggleInventoryTab.bind(this);
    this.toggleSurveyInfoTab = this.toggleSurveyInfoTab.bind(this);
    this.toggleChatTab = this.toggleChatTab.bind(this);
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

  toggleInventoryTab() {
    this.setState({
      content: 'inventory',
      title: 'Inventory',
      inventoryTab: true,
      surveyInfoTab: false,
      chatTab: false,
    });
  }

  toggleSurveyInfoTab() {
    this.setState({
      content: 'surveyInfo',
      title: 'MoveKick',
      inventoryTab: false,
      surveyInfoTab: true,
      chatTab: false,
    });
  }

  toggleChatTab() {
    this.setState({
      content: 'chat',
      title: 'Chat',
      inventoryTab: false,
      surveyInfoTab: false,
      chatTab: true,
    });
  }

  render() {
    return (
      <Container>
        <Header flexDirection="row-reverse">
          <Title style={styles.title}>{this.state.title}</Title>
          {
            this.state.content === 'surveyInfo' ?
              <Button transparent onPress={() => this.goToNext('info')}>
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
          <FooterTab theme={myTheme}>
            <Button onPress={this.toggleInventoryTab}>
              Inventory
              <Icon name={this.state.inventoryTab ? 'ios-list-box' : 'ios-list-box-outline'} />
            </Button>
            <Button onPress={this.toggleSurveyInfoTab}>
              Survey
              <Icon name={this.state.surveyInfoTab ? 'ios-camera' : 'ios-camera-outline'} />
            </Button>
            <Button onPress={this.toggleChatTab}>
              Chat
              <Icon name={this.state.chatTab ? 'ios-chatboxes' : 'ios-chatboxes-outline'} />
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
