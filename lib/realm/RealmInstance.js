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

let RealmInstance = new Realm({ schema: [BudgetSchema, TransactionSchema] });

module.exports = RealmInstance