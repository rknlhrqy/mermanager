import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('mermenStore')
@observer
class ListMermen extends Component {

  renderContent(place) {
    const { mermen } = this.props.mermenStore;
    const mermenInOnePlace = mermen.filter(each => each.location === place);
    return(
      mermenInOnePlace.map(each => {
        return(
          <tr>
          <td>
            { each.name }
            <button><i class="material-icons">clear</i></button>
          </td>
          </tr>
        );
      })
    ); 
  }

  render() {
    return(
      <div className="container">
        <table>
          {this.renderContent('Castle')}
        </table>
      </div>
    );
  }
}

export default ListMermen;