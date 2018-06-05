import React, { Component } from 'react';
import { Card, CardTitle, CardBody, CardText, Container, Row, Col, CardSubtitle, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import logo from './logo.svg';
import hubLogo from './hubLogo.jpg';

import "react-datepicker/dist/react-datepicker.css";

import ItemList from './components/ItemList';

import './App.css';


class FiltersContainer extends Component {

  onStartDateChange = (e) => {
    this.props.handleStartDateChange(e, 'start')
    .then( () => {
      this.props.getAPIActivitydata()
      this.props.getAPIReportdata();
    })
  }

  render() {

    const { start, end } = this.props.calendarDate;
    
    return <div className="filters-container">
        Filters

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
              placeholderText="Beginning" 
              selected={start} 
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
              placeholderText="Current" 
              selected={end} 
              onChange={this.props.handleEndDateChange} />
          </div>
        </div>
        <Button className='filter-button filter-button--purple'
          onClick={() =>
            this.props.setDates("1970-01-01", moment().format("YYYY-MM-DD"))
          }
        >
          All Time
        </Button>
        <Button className='filter-button filter-button--purple'
            onClick={() => this.props.setDates(moment()
              .subtract(1, "days")
              .startOf("day")
              .format("YYYY-MM-DD"), moment()
              .subtract(1, "days")
              .endOf("day")
              .format("YYYY-MM-DD"))}>
          Yesterday
        </Button>
        <Button className='filter-button filter-button--purple'
            onClick={() => this.props.setDates(moment()
              .subtract(7, "days")
              .startOf("day")
              .format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"))}>
          Last 7 Days
        </Button>
        <Button className='filter-button filter-button--purple'
            onClick={() => this.props.setDates(moment()
              .subtract(30, "days")
              .startOf("day")
              .format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"))}>
          Last 30 Days
        </Button>
        <Button className='filter-button filter-button--purple'
            onClick={() => this.props.setDates(moment()
              .subtract(60, "days")
              .startOf("day")
              .format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"))}>
          Last 60 Days
        </Button>
        <Button className='filter-button'
          onClick={this.props.reset}>Clear Filter
        </Button>
      </div>;
  }

}

class ReportsContainer extends Component {

  makeCards() {
    
    const { displayDate, items } = this.props; 
    
    return items.map( (item) => {
      return(
        <Card className="report-card" key={item.key}>
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            <CardSubtitle>{this.props.displayDate.start} - {this.props.displayDate.end }</CardSubtitle>
            <CardText className="card-data">{item.value}</CardText>
          </CardBody>
        </Card>
      )
    });
  }

  render() {
    return (
    <ItemList />
    );
  //   const { error, isLoaded } = this.props;

  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   } else if (!isLoaded) {
  //     return <div>Loading....</div>;
  //   } else {

  //     return <div>
  //         <div>Reports</div>
  //         <Container className="reports-container">
  //           {this.makeCards()}
  //           <div className="activity-log">
  //             Activity Log
  //           </div>
  //         <ItemList />
  //         </Container>
  //       </div>;
  //   }
  }
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      calendarDate: {
        start: null,
        end: null
      },
      apiDate: {
        start: '1970-01-01',
        end: moment().format('YYYY-MM-DD')
      },
      displayDate: {
        start: 'All Time',
        end: 'All Time'
      }
    };

    this.handler = this.handler.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.reset = this.reset.bind(this);
    this.getAPIActivitydata = this.getAPIActivitydata.bind(this);
    this.getAPIReportdata = this.getAPIActivitydata.bind(this);

  }

  reset() {
    this.setState({
      calendarDate: {
        start: null,
        end: null
      },
      apiDate: {
        start: '1970-01-01',
        end: moment().format('YYYY-MM-DD')
      }
    }, () => this.getAPIdata())
  }

  setDate(date, type) {

    let displayDateData;
    if (type === 'start') {
      displayDateData = {
        start: moment(date).format('YYYY-MM-DD'),
        end: 'Current'    
      };
    } else {
      displayDateData = {
        start: 'Beginning',
        end: moment(date).format('YYYY-MM-DD'),
      };
    }

    return new Promise((resolve, reject) => {
      this.setState(prevState => ({
        calendarDate: {
          ...prevState.calendarDate,
          [type]: date
        },
        apiDate: {
          ...prevState.apiDate,
          [type]: moment(date).format('YYYY-MM-DD')
        },
        displayDate: {
          ...prevState.displayDate,
          ...displayDateData,
        }
      }), () => resolve());
    });

  }

  

  setStartDate(startDate) {
    this.setState(prevState => ({
        calendarDate: {
          ...prevState.calendarDate,
          start: startDate
        },
        apiDate: {
          ...prevState.apiDate,
          start: moment(startDate).format('YYYY-MM-DD')
        },
        displayDate: {
          ...prevState.displayDate,
          start: moment(startDate).format('YYYY-MM-DD'),
          end: 'Current'
        }
    }))
  }

  setEndDate(endDate) {
    this.setState(prevState => ({
        calendarDate: {
          ...prevState.calendarDate,
          end: endDate
        },
        apiDate: {
          ...prevState.apiDate,
          end: moment(endDate).format('YYYY-MM-DD')
        },
        displayDate: {
          ...prevState.displayDate,
          start: 'Beginning',
          end: moment(endDate).format('YYYY-MM-DD')
        }
    }), () => {
      this.getAPIReportdata();
      this.getAPIActivitydata();
    })
  }

  handler(startDate, endDate) {
    this.setStartDate(moment(startDate));
    this.setEndDate(moment(endDate));
  }

  convertReportCards(data) {
    const statusMap = {
      activeMemberCount: 'Members',
      licensedMemberCount: 'Licensed Members',
      inactiveMemberCount: 'Inactive Member',
      deletedBoardCount: 'Deleted Boards',
      activeBoardCount: 'Active Boards',
      archivedBoardCount: 'Archived Boards'
    }

    const items = Object.entries(data).map(([key, value]) => ({
      key,
      value,
      name: statusMap[key]
    }))

    return items

  }

  convertActivitiesList(data) {
    const actions = [
      { name: "Comments", value: data.actionCounts.commentCard },
      { name: "Cards Created", value: data.actionCounts.createCard },
      { name: "Cards Moved", value: 0 },
      { name: "Cards Duplicated", value: data.actionCounts.copyCard },
      { name: "Cards Archived", value: 0 },
      { name: "Cards Deleted", value: data.actionCounts.deleteCard },
      { name: "Lists Created", value: data.actionCounts.createList },
      { name: "Lists Moved", value: data.actionCounts.moveListFromBoard + data.actionCounts.moveListToBoard },
      { name: "Lists Duplicated", value: 0 },
      { name: "Lists Archived", value: 0 },
      { name: "Lists Deleted", value: 0 },
      { name: "Unique Lables", value: 0 }
    ]

    console.log(actions);
  }



  getAPIReportdata() {

    var url = `https://www.gcumedia.com/sample-data/api/reporting/activeMemberCount-licensedMemberCount-inactiveMemberCount-deletedBoardCount-activeBoardCount-archivedBoardCount/start/${this.state.apiDate.start}/end/${this.state.apiDate.end}`;

    fetch(url)
    .then(res => res.json())
    .then((result) => this.convertReportCards(result))
    .then(
      (formattedResult) => {
        this.setState({
          isLoaded: true,
          items: formattedResult
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  getAPIActivitydata() {

    var url = `https://www.gcumedia.com/sample-data/api/reporting/actionCounts/start/${this.state.apiDate.start}/end/${this.state.apiDate.end}`;
    console.log(url)
    fetch(url)
      .then(res => res.json())
      .then(result => this.convertActivitiesList(result));
    // .then(result => console.log(result.actionCounts.archivedBoardCount))
    // .then((result) => this.convertActivitiesList(result))
    // .then(
    //   (formattedResult) => {
    //     this.setState({
    //       isLoaded: true,
    //       activities: formattedResult
    //     });
    //   },
    //   (error) => {
    //     this.setState({
    //       isLoaded: true,
    //       error
    //     });
    //   }
    // )

  }

  componentDidMount() {
    
    this.getAPIReportdata();
    this.getAPIActivitydata();

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={hubLogo} className="App-logo" alt="logo" />
        </header>
        <div className="App-title-bar">
          <span>Trello Activity Report</span>
        </div>
        <Container>
          <Row>
            <Col xs="3">
              <FiltersContainer 
                setDates={this.handler} 
                handleStartDateChange={this.setDate} 
                handleEndDateChange={this.setEndDate}
                getAPIActivitydata={this.getAPIActivitydata} 
                getAPIReportdata={this.getAPIReportdata}
                reset={this.reset} 
                {...this.state} />
            </Col>
            <Col xs="9">
              <ReportsContainer {...this.state} />
            </Col>
          </Row>
        </Container>
       
      </div>
    )
  }
}

export default App;