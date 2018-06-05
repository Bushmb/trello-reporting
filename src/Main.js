import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import FiltersContainer from './containers/FiltersContainer';
import ReportsContainer from './containers/ReportsContainer';
import hubLogo from "./hubLogo.jpg";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";


export default class Main extends Component {
  
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={hubLogo} className="App-logo" alt="logo" />
        </header>
        <div className="App-title-bar">
          <span>Trello Activity Report</span>
        </div>
        <Container class="main-container">
          <Row>
            <Col xs="3">
              <FiltersContainer />
            </Col>
            <Col xs="9">
              <ReportsContainer />
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}
