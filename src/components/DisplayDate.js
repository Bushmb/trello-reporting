import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class DisplayDate extends Component {
  
  render() {
    return (
      <div className="display-date">
        <p>{this.props.displayDate}</p>
      </div>
    );
  }
}

DisplayDate.propTypes = {
  displayDate: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    displayDate: state.setDate.displayDate
  };
};

export default connect(mapStateToProps)(DisplayDate);
