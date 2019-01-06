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
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input type="text" 
              className="text-input"
              placeholder="Search expenses"
              value={this.props.filters.text} 
              onChange={this.onTextChange} 
              name="" 
              id=""
             />
          </div>
          <div className="input-group__item">
            <select name="" id="" 
              className="select"
              value={this.props.filters.sortBy} 
              onChange={this.onSelectChange}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
          </select>
          </div>
          <div className="input-group__item">
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
        </div>
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