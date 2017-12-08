import React, { Component } from 'react';
import Rx from 'rxjs/Rx';
import { View, Text, StyleSheet, Button } from 'react-native';
import Swiper from 'react-native-swiper';
import { Accelerometer, Gyroscope } from 'react-native-sensors';

import Card from '../components/Card';
import questionStore from '../mock/index'
import { getUnique } from '../core/utils'



export default class Game extends Component {
  // hide nav bar
  static navigationOptions = { title: 'Game page', header: null };
  constructor(props) {
    super(props)
    const {state} = this.props.navigation;
    const qstList = questionStore.filter((item) => item.id === state.params.id)[0]
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
    this.Hourglass = 15000
  }
  componentDidMount() {

    this.countDown = setTimeout(() => {
      this.accelerationObservable.stop();
      this.setState({showResult: true})
      clearTimeout(this.timer)
    }, this.Hourglass)

    const { statusList, cur } = this.state
    this.addGWatch()

  }
  componentWillUnmount(){
    clearTimeout(this.countDown)
    clearTimeout(this.timer)
    this.accelerationObservable.stop();
  }
  addGWatch = (curStatus) => {
    const GH = [0.7, 1]
    const GL = [0.1, 0.4]

    this.accelerationObservable = new Accelerometer({
      updateInterval: 100, // defaults to 100ms
    });

    // Normal RxJS functions
    this.accelerationObservable
      .map(({ x, y, z }) => {
        // console.log(x,y,z)
        return z
      })
      .flatMap((z) => {
        const { statusList, cur } = this.state
        curStatus = statusList[cur]
        if ((curStatus === 'guessing') && z > GH[0] && z < GH[1]){
          return Rx.Observable.of(1)
        } else if ((curStatus === 'guessing') && -z > GH[0] && -z < GH[1]) {
          return Rx.Observable.of(-1)
        } else if ((('correct' === curStatus) || ('wrong'=== curStatus)) && ((z > GL[0] && z < GL[1]) || (-z > GL[0] && -z < GL[1]))) {
          return Rx.Observable.of(0)
        } else {
          // console.log('z', z, 'curStatus', curStatus )
          return Rx.Observable.empty()
        }
      })
      .subscribe(z => {
        if (z) {
          console.log('change status',z)
          this.changeStatus(z)
        } else if (z === 0) {
          console.log('next card')
          this.nextCard()
        }
      })
  }
  changeStatus(z) {
    const temp = this.state.statusList.slice(0)
    temp[this.state.cur]= z > 0 ? 'correct' : 'wrong'
    console.log(this.state.cur, temp[this.state.cur] )
    this.setState({
      statusList: temp,
      [temp[this.state.cur]]: this.state.correct +1,
    })
  }
  nextCard() {
    this.setState({
      cur: this.state.cur +1,
    })
    this.swiperEle.scrollBy(1)
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