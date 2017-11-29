import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Card extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { word, status } = this.props
    const cn = (status === 'correct' ? styles.slide2 :
    (status === 'wrong' ? styles.slide3 : styles.slide1))
    return (
      <View style={cn}>
        <Text style={styles.text}>{word}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CA05',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5555',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
})