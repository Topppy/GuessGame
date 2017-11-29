/**
 * Created by gzliweibin on 2017/5/8.
 */
import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  PixelRatio,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native'


export default class GameEntry extends Component {
  render() {
    const {name, id} = this.props;
    return (
      <TouchableHighlight
          key={id}
          onPress={() => {
            // this._handleCoursePress(data, id)
          }}
          underlayColor={'#fafafa'}
          activeOpacity={0.8}
      >
        <View style={styles.titleContainer}>
          <Text>
          {name}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    marginRight: 6,
  },
});

