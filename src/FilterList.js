import React, { Component } from 'react';

export default class FilterList extends Component {

  render() {
    return <div className="filter-list">
        <div className="date-filters">
          <div>
            From: <div>datepicker</div>
          </div>
          <div>
            To: <div>datepicker</div>
          </div>
        </div>
        <div>
          <button onClick={this.props.setDates(2017, 2018)}>All Time</button>
          <button>Yesterday</button>
          <button>Last 7 Days</button>
          <button>Last 30 Days</button>
          <button>Last 6 Months</button>
          <button>Clear Filters</button>
        </div>
      </div>;
  }
}