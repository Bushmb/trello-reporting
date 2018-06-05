import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { setStartDate, setEndDate, setBothDates } from '../actions/changeDate';
import { itemsFetchData } from "../actions/apiReportCall";
import { activitiesFetchData } from "../actions/apiActivitiesCall";

class FiltersContainer extends Component {

  onStartDateChange = (startDate) => {
    const date = moment(startDate).format("YYYY-MM-DD");
    this.props.setStartDate(date)

    this.props.fetchReportData();
    this.props.fetchActivityData();
    
  };

  onEndDateChange = (endDate) => {
    const date = moment(endDate).format("YYYY-MM-DD");
    this.props.setEndDate(date);

    this.props.fetchReportData();
    this.props.fetchActivityData();
  };

  onBothChange = (startDate, endDate) => {

    const start = moment(startDate).format("YYYY-MM-DD");
    const end = moment(endDate).format("YYYY-MM-DD");
    this.props.setBothDates(start, end);

    this.props.fetchReportData();
    this.props.fetchActivityData();
  }
  
  render() {
    
    return (
      <div className="filters-container">
        Filters
        <div className="date-field-container">
          <div className="filter-field">
            <div>From:</div>
            <div>
              <DatePicker 
                popperPlacement="right-start"
                dateFormat="MM-DD-YYYY" 
                dateFormatCalendar={"MMMM YYYY"} 
                minDate={moment().subtract(6, "month")} 
                maxDate={moment().add(6, "month")} 
                showMonthYearDropdown 
                selected={this.props.startDate} 
                onChange={this.onStartDateChange} />
            </div>
          </div>
          <div className="filter-field">
            <div>To:</div>
            <div>
              <DatePicker 
                popperPlacement="right-start" 
                dateFormat="MM-DD-YYYY" 
                dateFormatCalendar={"MMMM YYYY"} 
                minDate={moment().subtract(6, "month")} 
                maxDate={moment().add(6, "month")} 
                showMonthYearDropdown 
                selected={this.props.endDate} 
                onChange={this.onEndDateChange} />
            </div>
          </div>
        </div>

        <p>Quick Filters</p>
        
        <Button className='filter-button filter-button--purple' autoFocus
          onClick={() =>
            this.onBothChange("1970-01-01", moment().format("YYYY-MM-DD"))
          }
        >
          All Time
        </Button>
        <Button className='filter-button filter-button--purple'
            onClick={() => this.onBothChange(moment()
              .subtract(1, "days")
              .startOf("day")
              .format("YYYY-MM-DD"), moment()
              .format("YYYY-MM-DD"))}>
          Yesterday
        </Button>
        <Button className='filter-button filter-button--purple'
            onClick={() => this.onBothChange(moment()
              .subtract(7, "days")
              .startOf("day")
              .format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"))}>
          Last 7 Days
        </Button>
        <Button className='filter-button filter-button--purple'
            onClick={() => this.onBothChange(moment()
              .subtract(30, "days")
              .startOf("day")
              .format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"))}>
          Last 30 Days
        </Button>
        <Button className='filter-button filter-button--purple'
            onClick={() => this.onBothChange(moment()
              .subtract(60, "days")
              .startOf("day")
              .format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"))}>
          Last 60 Days
        </Button>
        <Button className='filter-button'
          onClick={() => this.onBothChange("1970-01-01", moment().format("YYYY-MM-DD"))}>Clear Filter
        </Button>
      </div>
    );
  }
}

FiltersContainer.propTypes = {
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired
};

const mapStateToProps = state => {

  return {
    startDate: moment(state.setDate.startDate),
    endDate: moment(state.setDate.endDate)
  };
};
const mapDispatchToProps = (dispatch) => ({

  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  setBothDates: (startDate, endDate) => dispatch(setBothDates(startDate, endDate)),
  fetchReportData: () => dispatch(itemsFetchData()),
  fetchActivityData: () => dispatch(activitiesFetchData())

});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);

