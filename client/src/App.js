import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import AddMerman from './components/AddMerman';
import Dashboard from './components/Dashboard';

class App extends Component {

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <AddMerman />
            <Dashboard />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
