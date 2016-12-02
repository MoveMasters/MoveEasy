import React from 'react';
import { StyleSheet, AlertIOS, ScrollView, View, Text } from 'react-native';
import {
  Title,
  Thumbnail,
} from 'native-base';
import helper from '../utils/helper';
import Swipeout from 'react-native-swipeout';

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moveItems: props.moveItems,
    };
  }

  componentWillMount() {
    this._getMoveItems();
  }

  _getMoveItems() {
    helper.getMoveItems()
    .then((response) => {
      this.setState({ moveItems: response.data.moveItems });
      console.log(this.state.moveItems);
    })
    .catch(error => console.log('Error getting move items', error));
  }

  render() {
    if (!this.state.moveItems.length) {
      return (
        <View alignSelf="center">
          <Text style={styles.empty}>No inventory to show. Come back after your survey!</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        {
          this.state.moveItems.map((item, i) => {
            const swipeoutBtns = [
              {
                text: item.going ? 'Not Going' : 'Going',
                backgroundColor: item.going ? '#ff0000' : '#00cc00',
                underlayColor: item.going ? '#ff9999' : '#80ff80',
                onPress: () => {
                  item.going = !item.going;
                  const items = this.state.moveItems;
                  items[i] = item;
                  this.setState({ moveItems: items });
                  helper.updateItem(item);
                },
              },
              {
                text: item.pbo ? 'Not Packing' : 'Packing',
                backgroundColor: item.pbo ? '#ff0000' : '#00cc00',
                underlayColor: item.pbo ? '#ff9999' : '#80ff80',
                onPress: () => {
                  item.pbo = !item.pbo;
                  const items = this.state.moveItems;
                  items[i] = item;
                  this.setState({ moveItems: items });
                  helper.updateItem(item);
                },
              },
            ];

            return (
              <Swipeout key={i} right={swipeoutBtns} backgroundColor="#FFFFFF">
                <View style={styles.inventoryItem} flexDirection="row">
                  <Thumbnail square size={100} source={{ uri: item.url }} />
                  <View  style={styles.info} flexDirection="column">
                    <Title style={styles.itemName}>{item.name}</Title>
                    <Text style={styles.itemInfo}>Quantity: {item.quantity}</Text>
                    <Text style={styles.itemInfo}>Going: {item.going ? 'yes' : 'no'}</Text>
                  </View>
                </View>
              </Swipeout>
            );
          })
        }
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  inventoryItem: {
    marginTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 1.5,
    borderColor: '#FF5252',

  },
  info: {
    marginLeft: 10,
  },
  empty: {
    color: '#737373',
  },
  itemName: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  itemInfo: {
    fontSize: 13,
  },
});
