import React, { Component } from 'react';
import { AppRegistry, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { ListView } from 'realm/react-native';
import ActionButton from 'react-native-action-button';

const Realm = require('realm');

const BudgetSchema = {
  name: 'Budget',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    name: { type: 'string', optional: true },
    amountPerPeriod: { type: 'double', default: 0 },
    periodLengthInDays: { type: 'int', default: 0 },
    cachedValue: { type: 'double', default: 0 },
    //cachedDate: {type: 'date', default: Date()},
    transactions: { type: 'list', objectType: 'Transaction' }
  }
};
const TransactionSchema = {
  name: 'Transaction',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    cachedDate: { type: 'date', default: Date(0) },
    amount: { type: 'double', default: 0 },
    vendor: { type: 'string', optional: true },
    budget: { type: 'Budget' },
  }
};

let realm = new Realm({ schema: [BudgetSchema, TransactionSchema] });

class BudgetListItem extends Component {

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

class DailyBudget extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(ds),
      items: realm.objects('Budget')
    };

    realm.objects('Budget').addListener((budgets, changes) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.items),
        items: realm.objects('Budget')
      });
    });
  }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <StatusBar hidden />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <BudgetListItem budget={rowData} />}
          />
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => {
          realm.write(() => {
            realm.create('Budget', {
              id: (realm.objects('Budget').length + 1),
              name: Math.random().toString(36).substr(2, 5)
            });
          });
        } } />
      </View>
   );
  }
}

AppRegistry.registerComponent('DailyBudget', () => DailyBudget);