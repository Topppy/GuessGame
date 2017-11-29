import React, { Component } from 'react';
import { Button, ScrollView, View, Text, StyleSheet, FlatList, ListItem, Header } from 'react-native';
import Orientation from 'react-native-orientation';

import questionStore from '../mock/index'

export default class Home extends React.Component {

  // Hide Navigation Bar
  static navigationOptions = { title: 'Home page', header: null };

  componentDidMount() {
    // this locks the view to Landscape Mode
    Orientation.lockToLandscape();
  }

  render() {
    const { navigate } = this.props.navigation;
    const qstArray = Object.keys(questionStore).map(function(key) {
      return questionStore[key];
    });
    return (
      // <Button
      //   title="Go to game"
      //   onPress={() =>
      //     navigate('Game', {id: 3})
      //   }
      // />
      <ScrollView
        decelerationRate={0.9}
        style={styles.container}
      >
        <FlatList
          renderItem={({item}) => <Text style={styles.text} >{item.name}</Text> }
          data={qstArray}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    color: '#000',
    fontSize: 30,
  },
})