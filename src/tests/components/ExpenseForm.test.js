import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';

import ExpenseForm from '../../components/ExpenseForm';

import expenses from '../fixtures/expenses';

test('should render ExpenseForm corectly' , () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data' , () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission.' , () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('form').simulate('submit' , {
    preventDefault: ()=>{}
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change' , () => {
  const value = 'New descriptoin';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change' , {
    target: {
      value
    }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change' , () => {
  const value = 'New note!';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change' , {
    target: {
      value
    }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid' , () => {
  const value = '23.50';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change' , {
    target: {
      value
    }
  });
  expect(wrapper.state('amount')).toBe('23.50');
});

test('should not set amount if not valid' , () => {
  const value = '12.122';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change' , {
    target: {
      value
    }
  });
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission' , () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit' , {
    preventDefault: ()=>{}
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description:expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test('should set new date on date change' , () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calander focus on change.' , () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused:true});
  expect(wrapper.state('calanderFocused')).toBe(true);
});