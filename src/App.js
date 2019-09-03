import React, { Component } from 'react';
import logo from './logo.svg';
import Main from './Main.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1> Lonely Hearts Dating Service </h1>
          <Main />
        </header>
      </div>
    );
  }
}

export default App;
