import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { ListView } from 'realm/react-native';
import ActionButton from 'react-native-action-button';
import BudgetListItem from '.';
import RealmInstance from '../realm/RealmInstance'

export default class DailyBudget extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(ds),
      items: RealmInstance.objects('Budget')
    };

    RealmInstance.objects('Budget').addListener((budgets, changes) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.items),
        items: RealmInstance.objects('Budget')
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
          RealmInstance.write(() => {
            RealmInstance.create('Budget', {
              id: (RealmInstance.objects('Budget').length + 1),
              name: Math.random().toString(36).substr(2, 5)
            });
          });
        } } />
      </View>
   );
  }
}