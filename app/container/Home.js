import React, { Component } from 'react';
import { Button } from 'react-native';
import Orientation from 'react-native-orientation';

export default class Home extends React.Component {

  // Hide Navigation Bar
  static navigationOptions = { title: 'Home page', header: null };

  componentDidMount() {
    // this locks the view to Portrait Mode
    // Orientation.lockToPortrait();

    // this locks the view to Landscape Mode
    Orientation.lockToLandscape();

    // this unlocks any previous locks to all Orientations
    // Orientation.unlockAllOrientations();

    // Orientation.addOrientationListener(this._orientationDidChange);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to game"
        onPress={() =>
          navigate('Game', {id: 2})
        }
      />
    );
  }
}