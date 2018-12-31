import React from 'react';

import ExpenseListFilters from './ExpenseListFilters';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpenseSummary />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;