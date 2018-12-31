import React from 'react';
import {shallow} from 'enzyme';

import {ExpenseSummary} from '../../components/ExpenseSummary';

test('should render correctly for a single expense' , () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={1} expenseTotal={30} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render correctly for a multiple expenses' , () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={2} expenseTotal={40} />);
  expect(wrapper).toMatchSnapshot();
});
