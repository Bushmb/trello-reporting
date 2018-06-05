import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, CardTitle, CardBody, CardText, CardSubtitle } from 'reactstrap';
import { itemsFetchData } from "../actions/apiReportCall";
import loader from '../loader.gif';

class CardList extends Component {

  componentDidMount() {

    this.props.fetchData();
  }

  render() {
    if (this.props.hasError) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    // if (this.props.isLoading) {
    //   return <p>Loading…</p>;
    // }


    return (
      <div className="reports-container">
        {this.props.items.map(item => (
          <Card className="report-card" key={item.key}>
            <CardBody>
              <CardTitle>{item.name}</CardTitle>
              <CardSubtitle>Stuff</CardSubtitle>
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
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    items: state.items,
    hasError: state.itemsHaveError,
    isLoading: state.itemsAreLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(itemsFetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
