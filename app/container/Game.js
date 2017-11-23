import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';

import questionStore from '../mock/index'

export default class Game extends Component {
  // static navigationOptions = { title: 'Game page', header: null };
  render() {
    const {state} = this.props.navigation;
    const qstList = questionStore[state.params.id]
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: qstList.name, data: qstList.data},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})