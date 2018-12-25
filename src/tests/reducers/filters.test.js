import filterReducer from '../../reducers/filters';
import moment from 'moment';

test('should set up default filter values' , () => {
  const state = filterReducer(undefined,{type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount' , () => {
  const state  = filterReducer(undefined , {type: 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date' , () => {
  const currentState = {
    text:'',
    startDate: undefined,
    endDate:undefined,
    sortBy: 'amount'
  }
  const action = {type: 'SORT_BY_DATE'};
  const state  = filterReducer(currentState , action);
  expect(state.sortBy).toBe('date');
});

test('should set text filter to passed value.' , () => {
  const action = {
    type: 'SET_TEXT_FILTER',
    text:'Test Filter'
  };
  const state = filterReducer(undefined , action);
  expect(state).toEqual({
    text:'Test Filter',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    sortBy: 'date' 
  });
});

test('should set start date' , ()=> {
  const action = {
    type: 'SET_START_DATE',
    startDate: moment(0).add(4, 'days')
  };
  const state = filterReducer(undefined , action);
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment(0).add(4,'days'),
    endDate: moment().endOf('month')
  });
});

test('should set the end date filter' , () => {
  const action = {
    type: 'SET_END_DATE',
    endDate: moment().endOf('month').add(4, 'days')
  };
  const state = filterReducer(undefined , action);
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month').add(4, 'days')
  });
});

