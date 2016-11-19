'use strict';

import React from 'react';
import { StyleSheet, AlertIOS, ScrollView, View } from 'react-native';
import {
  Title,
  Thumbnail,
} from 'native-base';
import helper from '../utils/helper';

const Inventory = (props) => {
  return (
    <ScrollView>
      {
        helper.getMoveItems()
        .then((moveItems) =>{
          return moveItems.map((item) => {
            return (
              <View>
                <Thumbnail source={item.url} />
                <Title>{item.name}</Title>
              </View>
            );
          });
        })
        .catch(error => console.log('Error getting move items', error))
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({

});

export default Inventory;
