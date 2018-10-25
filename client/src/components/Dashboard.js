import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import ListMermen from './ListMermen';

@inject('mermenStore')
@observer
class Dashboard extends Component {
  renderEach() {
    return(
      <ListMermen />
    );
  }

  render() {
    return(
      <div className="container">
        {this.renderEach()}
      </div>
    );
  }
}

export default Dashboard;