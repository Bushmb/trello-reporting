import React, { Component } from "react";
import FilterList from "./FilterList";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
  }

  handler(startDate, endDate) {
    console.log(startDate, endDate);
  }
  
  render() {
    const { appState, setAppState } = this.props;

    return (
      <div className="app">
        <p>App</p>
        <FilterList setDates={this.handler} {...{ appState, setAppState }} />
      </div>
    );
  }
}
