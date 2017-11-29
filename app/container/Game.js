import React, { Component } from 'react';
import Rx from 'rxjs/Rx';
import { View, Text, StyleSheet, Button } from 'react-native';
import Swiper from 'react-native-swiper';
import { Accelerometer, Gyroscope } from 'react-native-sensors';

import Card from '../components/Card';
import questionStore from '../mock/index'

const isPeakPoint = (gObjPair) => {
  const z1 = gObjPair[0]
  const z2 = gObjPair[1]
  // g +1 peak point
  if (z1.pg > 0 && z1.cg > 0 && z2.pg > 0 && z2.cg > 0 && z1.acc > 0 && z2.acc < 0) {
    return 1
  }
  // g -1 peak point
  if (z1.pg < 0 && z1.cg < 0 && z2.pg < 0 && z2.cg < 0 && z1.acc < 0 && z2.acc > 0) {
    return -1
  }
  return false
}

const getUnique = (arrayNum,count) => {
  // Make a copy of the array
  var tmp = arrayNum.slice();
  var ret = [];
  
  for (var i = 0; i < count; i++) {
    var index = Math.floor(Math.random() * tmp.length);
    var removed = tmp.splice(index, 1);
    // Since we are only removing one element
    ret.push(removed[0]);
  }
  return ret;
}

export default class Game extends Component {
  // hide nav bar
  static navigationOptions = { title: 'Game page', header: null };
  constructor(props) {
    super(props)
    const {state} = this.props.navigation;
    const qstList = questionStore[state.params.id]
    const randomQList = getUnique(qstList.data, 20)
    this.state = {
      randomQList,
      qstList,
      statusList: new Array(randomQList.length).fill('guessing'),
      correct: 0,
      wrong: 0,
      cur: 0,
      showResult: false,
    }
    this.timer = 0
    this.countDown = 0
  }
  componentDidMount() {
    const G = 0.7
    const I = 1500
    const Hourglass = 15000

    this.countDown = setTimeout(() => {
      this.accelerationObservable.stop();
      this.setState({showResult: true})
      clearTimeout(this.timer)
    }, Hourglass)

    this.accelerationObservable = new Accelerometer({
      updateInterval: 50, // defaults to 100ms
    });
    // Normal RxJS functions
    this.accelerationObservable
      .map(({ x, y, z }) => {
        // console.log(x,y,z)
        return z
      })
      .filter(z => (z > G || z < -G))
      .pairwise()
      .map(zpair => {
        // console.log(zpair)
        return {
          pg: zpair[0],
          cg: zpair[1],
          acc: zpair[1] - zpair[0],
        }
      })
      .pairwise()
      .filter((gObjPair) => {
        // console.log('filter pp',isPeakPoint(gObjPair), gObjPair)
        return !!isPeakPoint(gObjPair)
      })
      .map((gObjPair) => {
        // console.log('real pp',isPeakPoint(gObjPair))
        return isPeakPoint(gObjPair)
      })
      .throttle(() => Rx.Observable.interval(I))
      .subscribe(z => {
        this.next(z)
      });
  }
  componentWillUnmount(){
    clearTimeout(this.countDown)
    clearTimeout(this.timer)
    this.accelerationObservable.stop();
  }
  next(z) {
    const temp = this.state.statusList.slice(0)
    temp[this.state.cur]= z > 0 ? 'correct' : 'wrong'
    console.log(this.state.cur, temp[this.state.cur] )
    this.setState({
      statusList: temp,
      cur: this.state.cur +1,
      [temp[this.state.cur]]: this.state.correct +1,
    }, () => {
      this.timer = setTimeout(() => {
        if (this.state.cur >= temp.length) {
          this.accelerationObservable.stop();
          this.setState({showResult: true})
          return
        }
        this.swiperEle.scrollBy(1)
      } , 200)
    })
  }
  render() {
    const { navigate } = this.props.navigation;    
    const { randomQList, qstList, statusList, correct, cur, showResult } = this.state;
    return (
      <View style={styles.container}>
        { showResult ?
          <View style={styles.resultCont}>
            <Text style={styles.reText}>{qstList.name} 题库</Text>
            <Text style={styles.correctText}>答对: {correct} 道</Text>
            <Button
              style={styles.btn}
              title="Go to Home"
              onPress={() =>
                navigate('Home')
              }
            />
          </View> :
          <Swiper
            scrollEnabled={false}
            ref={(ref) => {this.swiperEle = ref }} 
            style={styles.wrapper}
            showsButtons={false}
            autoplayTimeout={5}
            loop={false}
            showsPagination={false}
          >
            {randomQList.map((item, idx) => (
              <Card
                word={item}
                key={idx}
                status={statusList[idx]}
              />
            ))}
          </Swiper>
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
  },
  resultCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffD6EB',
  },
  reText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  correctText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'red',
  },
  btn: {
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: '#9DD6EB',
  },
})