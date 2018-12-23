import React from 'react';
import {connect} from 'react-redux';
import FlipMove from 'react-flip-move';

import selectExpenses from './../selectors/expenses'
import ExpenseListItem from './ExpenseListItem';

const ExpenseList = (props) => (
  <div>
    <h1>ExpenseList</h1>
    <FlipMove>
    {props.expenses.map((expense) => {
      return (
        <ExpenseListItem key={expense.id} {...expense} />
      );
    })}
    </FlipMove>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);

