import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { ListView } from 'realm/react-native';
import ActionButton from 'react-native-action-button';
import BudgetListItem from '.';
const Realm = require('realm');
//import RealmInstance from '../realm/RealmInstance'

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

  componentWillMount() {
    // `this.props` contains the username and password passed to the DogsView instance
    Realm.Sync.User.login('http://localhost:9080', 'crdnilfan@gmail.com', '*O191V9RfE&Dvgk', (error, user) => {
      if (!error) {
        console.log("Logged into realm " + user);
        let realm = new Realm({
          schema: [BudgetSchema, TransactionSchema],
          sync: { user, url: 'realm://localhost:9080/~/dailybudget' }
        });
        // Once the user is logged in and we have a synced realm,
        // reset the DataSource with all the Dog objects in the realm.
        // Also subscribe for changes on the Dogs collection and refresh the UI when they occur
        const budgets = realm.objects('Budget');
        this.setState({
          realm: realm,
          dataSource: this.state.dataSource.cloneWithRows(budgets)
        });
        budgets.addListener(() => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(budgets)
          });
        });
      } else {
        console.log("Realm user error " + error);
      }
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
          let realm = this.state.realm
          realm.write(() => {
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