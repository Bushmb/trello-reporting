import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { activitiesFetchData } from "../actions/apiActivitiesCall";
import loader from "../loader.gif";
import question from '../question.png';
import DisplayDate from './DisplayDate';

class ActivitiesList extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    if (this.props.hasError) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p><img src={loader} alt="loader" />Loading…</p>;
    }

    return <div>
        <img src={question} className="help-icon" alt="help-icon" />
        <div className="activity-header">
          <p className="section-title">Activity Log</p>
          <DisplayDate />
        </div>

        <div className="activity-item activity-item--bold">
          <p>Activity Type</p>
          <p>Number</p>
        </div>
        {this.props.activities.map(activity => (
          <div key={activity.key} className="activity-item">
            <div>{activity.name}</div>
            <div>{activity.value}</div>
          </div>
        ))}
      </div>;
  }
}

ActivitiesList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  activities: PropTypes.array.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    activities: state.activities,
    hasError: state.activitiesHaveError,
    isLoading: state.activitiesAreLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(activitiesFetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesList);
