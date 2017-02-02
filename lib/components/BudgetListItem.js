import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class BudgetListItem extends Component {

  openBudget() {
    console.log("OPENING THE BUDGET " + this.props.budget.name);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.openBudget.bind(this)}>
        <View style={{ flex: 1, backgroundColor: '#f3f3f3', height: 40, justifyContent: 'center' }}>
          <Text style={{ left: 20 }}>{this.props.budget.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}