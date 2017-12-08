import React, { Component } from 'react';
import { Button, ScrollView, View, Text, StyleSheet, FlatList, ListItem, Header, TouchableHighlight, Dimensions } from 'react-native';
import Orientation from 'react-native-orientation';

import questionStore from '../mock/index'

const {width,height} = Dimensions.get('window')

export default class Home extends React.Component {

  // Hide Navigation Bar
  static navigationOptions = { title: 'Home page', header: null };
  constructor(props) {
    super(props)
    Orientation.lockToLandscape();
  }

  componentWillMount() {
    // this locks the view to Landscape Mode
    // Orientation.lockToLandscape();
  }
  componentDidMount() {
    // this locks the view to Landscape Mode
    // Orientation.lockToLandscape();
  }
  goToGameById = (id) => {
    const { navigate } = this.props.navigation;
    navigate('Game', { id })
    console.log('goto game', id)
  }

  render() {
    const qstArray = questionStore
    return (
      <ScrollView
        decelerationRate={0.9}
      >
        <FlatList
          data={qstArray}
          horizontal={true}
          keyExtractor={(item) => item.name}
          renderItem={({item}) => (
            <TouchableHighlight
              style={styles.entry}
              activeOpacity={0.5}
              underlayColor={'#9DD0ff'}
              onPress={() => {this.goToGameById(item.id)}}
            >
              <Text style={styles.text} >{item.name}</Text>
            </TouchableHighlight>)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  entry:{
    width: 200,
    height: height-100,
    marginVertical: 50,
    marginHorizontal: 20,
    backgroundColor: '#9DD6EB',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 10,
    shadowColor: 'rgb(224, 224, 224)',
    shadowRadius: 7,
    shadowOpacity: 0.41,
    shadowOffset: {width:3, height: 3}
  },
  text: {
    color: '#000',
    fontSize: 30,
  },
})