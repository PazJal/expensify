import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';


import {setTextFilter , sortByAmount , sortByDate , setStartDate ,setEndDate} from './../actions/filters';

export class ExpenseListFilters extends React.Component {

  state = {
    calanderFocused: null
  };

  onDatesChange = ({startDate , endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calanderFocused) => {
    this.setState(() => ({calanderFocused}));
  };

  onSelectChange = (e) => {
    if(e.target.value === 'date') {
      this.props.sortByDate();
    } else if(e.target.value === 'amount'){
      this.props.sortByAmount();
    }
  }

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" 
          value={this.props.filters.text} 
          onChange={this.onTextChange} 
          name="" 
          id=""
        />
        <select name="" id="" 
          value={this.props.filters.sortBy} 
          onChange={this.onSelectChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker 
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calanderFocused}
          onFocusChange={this.onFocusChange}
          startDateId={'1'}
          endDateId={'1'}
          numberOfMonths={1}
          isOutsideRange={() => (false)}
          showClearDates={true}
        />
    
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps , mapDispatchToProps)(ExpenseListFilters);