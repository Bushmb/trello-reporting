import React, { Component } from 'react';
import ButtonList from './ButtonList';

export default class App extends Component {

  getAPIdata() {
    var url = "https://www.gcumedia.com/sample-data/api/reporting/activeMemberCount-licensedMemberCount-inactiveMemberCount-deletedBoardCount-activeBoardCount-archivedBoardCount";

    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        let items = Object.keys(result).map(key => ({ key, value: result[key] }));
        this.props.setAppState({
          isLoaded: true,
          items: items
        });
        console.log(items);
      },
      (error) => {
        this.props.setAppState({
          isLoaded: true,
          error
        });
      }
    )
  }

  componentDidMount() {
    this.getAPIdata();
  }

  onClick = () => {
    this.getAPIdata();
  }

  render() {
    const { appState, setAppState } = this.props;

    return (
      <div className='app'>
        <p>App</p>
        <p>
          data: {appState.items}
        </p>
        <button onClick={this.onClick}>click</button>
        <ButtonList {...{ appState, setAppState }} />
      </div>
    );
  }
}