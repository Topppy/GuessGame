/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './container/Home'
import Game from './container/Game'

export default App = StackNavigator({
  Home: {screen: Home},
  Game: {
    path: 'game/:id',
    screen: Game},
});
