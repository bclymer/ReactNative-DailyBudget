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

var RealmInstance;

Realm.Sync.User.login('http://45.55.78.48:9080', 'crdnilfan@gmail.com', 'ivFs9V0qlf^fjMKX!#8J', (error, user) => {
  if (!error) {
    console.log("Logged into realm " + user);
    RealmInstance = new Realm({
      sync: {
        user: user,
        url: 'realm://45.55.78.48:9080/~/dailybudget-realm',
      },
      schema: [BudgetSchema, TransactionSchema]
    });
  } else {
    console.log("Realm user error " + error);
  }
});

// *O191V9RfE&Dvgk

module.exports = RealmInstance