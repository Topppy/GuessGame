import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import Swiper from 'react-native-swiper';
import { Accelerometer, Gyroscope } from 'react-native-sensors';

const accelerationObservable = new Accelerometer({
  updateInterval: 100, // defaults to 100ms
});

// Normal RxJS functions
accelerationObservable
  .map(({ x, y, z }) => x + y + z)
  .filter(speed => speed > 20)
  .subscribe(speed => console.log(`You moved your phone with ${speed}`));


import questionStore from '../mock/index'

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'grey' }}>{index + 1}</Text>
    </View>
  )
}

const renderItem = (data, idx) => {
  return (
    <View style={styles.slide1} key={`${idx}-itemView`}>
      <Text style={styles.text}>{data}</Text>
    </View>
  )
}

export default class Game extends Component {
  // static navigationOptions = { title: 'Game page', header: null };
  constructor(props) {
    super(props)
    this.state = {
      speed: '123',
    }
  }
  componentDidMount() {
    this.state.speed = accelerationObservable
      .map(({ x, y, z }) => x + y + z)
      .filter(speed => speed > 20)
      .subscribe(speed => {
        console.log(`You moved your phone with ${speed}`)
        return `You moved your phone with ${speed}`
      });
  }
  componentWillUnmount(){
    accelerationObservable.stop();
  }
  render() {
    const {state} = this.props.navigation;
    const qstList = questionStore[state.params.id]
    return (
      <View style={styles.container}>
        <Text style={styles.speedText}>{this.state.speed}</Text>
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          autoplay={true}
          autoplayTimeout={5}
          loop={false}
          renderPagination={renderPagination}
        >
          {qstList.data.map(renderItem)}
        </Swiper>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  wrapper: {
  },
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
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  },
  speedText: {
    color: '#000',
  },
})