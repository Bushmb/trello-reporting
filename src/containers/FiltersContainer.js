import React, { Component } from "react";
// import DatePicker from '../components/DatePicker';
import FilterButton from '../components/FilterButton';

const buttons = [
  "All Time",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "Last 6 Months",
  "Clear Filter"
];

class FiltersContainer extends Component {
  
  render() {
    return (
      <div className="App">
        <div>
        <p>Date Picker</p>
        </div>
        <ButtonList />
      </div>
    );
  }
}

export default FiltersContainer;
