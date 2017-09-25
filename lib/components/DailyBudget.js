import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { ListView } from 'realm/react-native';
import ActionButton from 'react-native-action-button';
import BudgetListItem from '.';
import RealmInstance from '../realm/RealmInstance'

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

export default class DailyBudget extends Component {
  constructor(props) {
    super(props);
    // Initialize the component with an empty data source
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      realm: undefined
    };
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
          RealmInstance.write(() => {
            realm.create('Budget', {
              id: (realm.objects('Budget').length + 1),
              name: Math.random().toString(36).substr(2, 5)
            });
          });
          console.log("Sync - " + Object.keys(realm.syncSession));
        }} />
      </View>
    );
  }
}