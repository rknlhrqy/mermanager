import React, { Component } from 'react';
import axios from 'axios';
import { inject, observer } from 'mobx-react';

import { PLACE } from '../config/config';
import ListMermen from './ListMermen';

@inject('mermenStore')
@observer
class Dashboard extends Component {

  componentDidMount() {
    this.getMermen(this.props);
  }

  async getMermen(props) {
    try {
      const response = await axios.get('/srv/all');
      if (response.status >= 200 && response.status < 300) {
        this.props.mermenStore.FillMermen(response.data.mermen);
      }
    } catch (error) {
      console.log(error);
    }
  }

  renderContent() {
    return PLACE.map(place => {
      return(
        <table key={place} className="striped highlight">
          <thead>
            <tr>
              <th>
                {place}:
              </th>
            </tr>
          </thead>
          <tbody>
            <ListMermen place={place}/>
          </tbody>
        </table>
      );
    });
  }

  render() {
    return(
      <div className="container">
        {this.renderContent()}
      </div>
    );
  }
}

export default Dashboard;