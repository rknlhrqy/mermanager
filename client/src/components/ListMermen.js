import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';

@inject('mermenStore')
@observer
class ListMermen extends Component {

  constructor(props) {
    super(props);
    this.editMerman = this.editMerman.bind(this);
    this.removeMerman = this.removeMerman.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  editMerman(event) {
    event.persist();
    // event.preventDefault();
    const trElement = event.target.closest(".each_merman_tr");
    const id = trElement.getAttribute('data-key');
  }

  handleRemoveClick(event) {
    event.persist();
    event.preventDefault();
    this.removeMerman(event, this.props);
  }

  async removeMerman(event, props) {
    const trElement = event.target.closest(".each_merman_tr");
    const id = trElement.getAttribute('data-key');

    try {
      const response = await axios.delete(`/srv/del/${id}`);
      if (response.status >= 200 && response.status < 300) {
        props.mermenStore.RemoveMerman(id);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
 
  }

  renderContent(place) {
    // const mermen = this.props.mermenStore.mermenResult;
    const { mermen } = this.props.mermenStore;
    // console.log(mermen);
    const mermenInOnePlace = mermen.filter(each => each.location === place);
    return(
      mermenInOnePlace.map(each => {
        // console.log(each);
        return(
          <tr key={each.id} data-key={each.id} className="each_merman_tr">
          <td>
            { each.name }{'      '}
            <button onClick={this.editMerman} className="teal btn-flat right whits-text"><i className="material-icons">edit</i></button>
            <button onClick={this.handleRemoveClick} className="red btn-flat right white-text"><i className="material-icons">clear</i></button>
          </td>
          </tr>
        );
      })
    ); 
  }

  render() {
    return this.renderContent(this.props.place);
  }
}

export default ListMermen;