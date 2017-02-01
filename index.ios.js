import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, StatusBar } from 'react-native';
import { ListView } from 'realm/react-native';

const Realm = require('realm');

const BudgetSchema = {
  name: 'Budget',
  primaryKey: 'id',
  properties: {
    id:  {type: 'int', default: 0},
    name: {type: 'string', optional: true},
    amountPerPeriod: {type: 'double', default: 0},
    periodLengthInDays: {type: 'int', default: 0},
    cachedValue: {type: 'double', default: 0},
    //cachedDate: {type: 'date', default: Date()},
    transactions: {type: 'list', objectType: 'Transaction'}
  }
};
const TransactionSchema = {
  name: 'Transaction',
  primaryKey: 'id',
  properties: {
    id:  {type: 'int', default: 0},
    cachedDate: {type: 'date', default: Date(0)},
    amount: {type: 'double', default: 0},
    vendor: {type: 'string', optional: true},
    budget: {type: 'Budget'},
  }
};

let realm = new Realm({schema: [BudgetSchema, TransactionSchema]});

class DailyBudget extends Component {
 render() {

   realm.write(() => {
     realm.create('Budget', {
       id: 3
     });
   });

   return (
     <View style={{alignItems: 'center'}}>
       <StatusBar hidden />
       <Text>
         Count of Transactions in Realm: {realm.objects('Budget').length}
       </Text>
     </View>
   );
 }
}

AppRegistry.registerComponent('DailyBudget', () => DailyBudget);