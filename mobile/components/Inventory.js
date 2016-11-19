'use strict';

import React from 'react';
import { StyleSheet, AlertIOS, ScrollView, View, Text } from 'react-native';
import {
  Title,
  Thumbnail,
} from 'native-base';
import helper from '../utils/helper';
import Swipeout from 'react-native-swipeout';

const Inventory = (props) => {
  const { moveItems } = props;
  return (
    <ScrollView>
      {
        moveItems.map((item, i) => {
          const swipeoutBtns = [
            {
              text: item.going ? 'Not Going' : 'Going',
              backgroundColor: item.going ? '#ff0000' : '#00cc00',
              underlayColor: item.going ? '#ff9999' : '#80ff80',
              onPress: () => {
                item.going = !item.going;
                props.changeItem(item, i);
              },
            },
            {
              text: item.pbo ? 'Not Packing' : 'Packing',
              backgroundColor: item.pbo ? '#ff0000' : '#00cc00',
              underlayColor: item.pbo ? '#ff9999' : '#80ff80',
              onPress: () => {
                item.going = !item.going;
                props.changeItem(item, i);
              },
            },
          ];

          return (
            <Swipeout key={i} right={swipeoutBtns} backgroundColor="white">
              <View style={styles.inventoryItem} flexDirection="row">
                <Thumbnail square size={90} source={{ uri: item.url }} />
                <View  style={styles.info} flexDirection="column">
                  <Title>{item.name}</Title>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Going: {item.going ? 'yes' : 'no'}</Text>
                </View>
              </View>
            </Swipeout>
          );
        })
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inventoryItem: {
    marginTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',

  },
  info: {
    marginLeft: 10,
  }
});

export default Inventory;
