import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

class DailyBudgetApp extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}

AppRegistry.registerComponent('DailyBudget', () => DailyBudgetApp);