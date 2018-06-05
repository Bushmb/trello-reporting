import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, CardBody, CardText } from 'reactstrap';
import { itemsFetchData } from "../actions/apiReportCall";
import loader from '../loader.gif';
import question from '../question.png';
import DisplayDate from './DisplayDate';

class CardList extends Component {

  componentDidMount() {

    this.props.fetchData();
  }

  render() {

    if (this.props.hasError) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    return (
      <div className="reports-container">
        {this.props.items.map(item => (
          <Card className="report-card" key={item.key}>
            <img src={question} className="help-icon" alt="help-icon" />
            <CardBody className="card-body">
              <div className="section-title">{item.name}</div>
              {item.key === 'inactiveMemberCount' ? <div className='display-date'>6 Months or More</div> : <DisplayDate />}
              <CardText className="card-data">
                  { this.props.isLoading ? <img src={loader} alt="loader" /> : <span>{item.value}</span> }
              </CardText>
            </CardBody>
          </Card>
        ))}
      </div>
    );
    
  }
}

CardList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  displayDate: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  
  return {
    items: state.items,
    hasError: state.itemsHaveError,
    isLoading: state.itemsAreLoading,
    displayDate: state.setDate.displayDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(itemsFetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
