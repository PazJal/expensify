const reduceFunction = (accumulate  , current) => {
  return accumulate + current;
};

const selectExpensesTotal = (expenses) => {
  if(!Array.isArray(expenses)){
    throw new Error('Expected an array to be passed');
  }
  return expenses.map((expense) => (expense.amount)).reduce(reduceFunction , 0);
};

export default selectExpensesTotal;
