import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses';
import selectExpenseTotal from '../selectors/selectExpensesTotal';


export const ExpenseSummary = ({expenseCount , expenseTotal}) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedExpenseTotal = numeral(expenseTotal / 100).format('$0,0.00');
  
  return (
    <div>
      Viewing {expenseCount} {expenseWord} totalling {formattedExpenseTotal}
    </div>
  );

}
  

const mapStateToProps = (state) => {
  const expenses = selectExpenses(state.expenses , state.filters);
  return {
    expenseCount: expenses.length,
    expenseTotal: selectExpenseTotal(expenses)
  };
};

export default connect(mapStateToProps)(ExpenseSummary);