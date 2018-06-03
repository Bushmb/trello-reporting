import React, { Component } from 'react';
import { Card, CardTitle, CardBody, CardText, Container, Row, Col, CardSubtitle, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import logo from './logo.svg';
import "react-datepicker/dist/react-datepicker.css";

import './App.css';


class FiltersContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      date: null,
      startDate: null,
      endDate: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleClick(e) {
    console.log(e.target);
  }

  handleStartDateChange(startDate) {
    this.setState({
      startDate
    })
  }

  handleEndDateChange(endDate) {
    this.setState({
      endDate
    })

  }

  render() {
    const buttonList = [ 
      "All Time",
      "Yesterday",
      "Last 7 Days",
      "Last 30 Days",
      "Last 6 Months",
      "Clear Filters"
    ]
    return (
      <Container>
      From: <DatePicker 
        popperPlacement="right-start"
        popperPlacement="right-start"
        dateFormat="MM-DD-YYYY"
        dateFormatCalendar={"MMMM YYYY"}
        minDate={moment().subtract(6, "month")}
        maxDate={moment().add(6, "month")}
        showMonthYearDropdown
        selected={this.state.startDate}
        onChange={this.handleStartDateChange}
      />
      To: <DatePicker 
        popperPlacement="right-start"
        dateFormat="MM-DD-YYYY"
        dateFormatCalendar={"MMMM YYYY"}
        minDate={moment().subtract(6, "month")}
        maxDate={moment().add(6, "month")}
        showMonthYearDropdown
        selected={this.state.endDate}
        onChange={this.handleEndDateChange}
      />
        <Button onClick={this.handleClick}>All Time</Button>
        <Button onClick={this.handleClick}>Yesterday</Button>
        <Button onClick={this.handleClick}>Last 7 Days</Button>
        <Button onClick={this.handleClick}>Last 30 Days</Button>
        <Button onClick={this.handleClick}>Last 6 Months</Button>
        <Button onClick={this.handleClick}>Clear Filters</Button>
        
      </Container>
    )
  }
}

class ReportsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      date: null,
      startDate: null,
      endDate: null
    };

  }

  componentDidMount() {
    if(this.state.date === null) {
      var url = "https://www.gcumedia.com/sample-data/api/reporting/activeMemberCount-licensedMemberCount-inactiveMemberCount-deletedBoardCount-activeBoardCount-archivedBoardCount";
    } else {
      url = `https://www.gcumedia.com/sample-data/api/reporting/activeMemberCount-licensedMemberCount-inactiveMemberCount-deletedBoardCount-activeBoardCount-archivedBoardCount/start/${this.state.date.start}/end/${this.state.date.end}`;
    }

    console.log(url);
      fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          let items = Object.keys(result).map(key => ({ key, value: result[key] }));
          this.setState({
            isLoaded: true,
            items: items
          });
          console.log(items);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading....</div>;
    } else {
      return <Container className="reports-container">
          <Row>
            <Col xs="6">
              <Card>
                <CardBody>
                  <CardTitle>Active Members</CardTitle>
                  <CardSubtitle>All Time</CardSubtitle>
                  <CardText>{items[0].value}</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xs="6">
              <Card>
                <CardBody>
                  <CardTitle>Licensed Users</CardTitle>
                  <CardSubtitle>All Time</CardSubtitle>
                  <CardText>{items[1].value}</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <Card>
                <CardBody>
                  <CardTitle>Inactive Users</CardTitle>
                  <CardSubtitle>All Time</CardSubtitle>
                  <CardText>{items[2].value}</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xs="6">
              <Card>
                <CardBody>
                  <CardTitle>Deleted Boards</CardTitle>
                  <CardSubtitle>All Time</CardSubtitle>
                  <CardText>{items[3].value}</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <Card>
                <CardBody>
                  <CardTitle>Active Boards</CardTitle>
                  <CardSubtitle>All Time</CardSubtitle>
                  <CardText>{items[4].value}</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xs="6">
              <Card>
                <CardBody>
                  <CardTitle>Archived Boards</CardTitle>
                  <CardSubtitle>All Time</CardSubtitle>
                  <CardText>{items[5].value}</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          
        </Container>;
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Container>
          <Row>
            <Col xs="3">
              <FiltersContainer />
            </Col>
            <Col xs="9">
              <ReportsContainer />
            </Col>
          </Row>
        </Container>
        <footer className="footer">
          <span className="copyright">
            Grand Canyon University | All rights reserved
          </span>
          <span className="powered">
            Powered by | Academic Web Services
          </span>
        </footer>
      </div>
    );
  }
}

export default App;
