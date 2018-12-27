import React from 'react';
import {shallow} from 'enzyme';

import {ExpenseListFilters} from '../../components/ExpenseListFilters';

import expenses from '../fixtures/expenses';
import {filters , altFilters} from '../fixtures/filters';
import moment from 'moment';

let setTextFilter , sortByDate , sortByAmount , setStartDate , setEndDate , wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(<ExpenseListFilters  
    filters={filters}
    setTextFilter={setTextFilter}
    sortByDate={sortByDate}
    sortByAmount={sortByAmount}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
  />);
});

test('should render ExpenseListFilters' , () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with non default values correctly' , () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change' , () => {
  const e = {
    target: {
      value: 'Test Text'
    }
  };
  wrapper.find('input').simulate('change' , e);
  expect(setTextFilter).toHaveBeenLastCalledWith('Test Text');
});

test('should sort by date' , () => {
  wrapper.setProps({
    filters: altFilters
  });
  const e = {
    target: {
      value: 'date'
    }
  };
  wrapper.find('select').simulate('change' , e);
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount' , () => {
  const e = {
    target: {
      value: 'amount'
    }
  };
  wrapper.find('select').simulate('change' , e);
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes' , () => {
  const startDate = moment(0).subtract(1,'days');
  const endDate = moment(0).add(1,'days');
  const change = {
    startDate,
    endDate
  };
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')(change);
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus change' , () => {
  const focus = 'startDate';
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focus);
  expect(wrapper.state('calanderFocused')).toEqual(focus);
});