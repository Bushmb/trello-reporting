import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { activitiesFetchData } from "../actions/apiActivitiesCall";
import loader from "../loader.gif";

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

    return (
      <div>
        <p>Activity Log</p>
        
        <p>Activity Type</p>
        {this.props.activities.map(activity => (
          <div key={activity.key} className="activity-item">
            <div>{activity.name}</div>
            <div>{activity.value}</div>
          </div>
        ))}
      </div>
    );
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
