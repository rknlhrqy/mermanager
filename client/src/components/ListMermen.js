import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';

import { PLACE } from '../config/config';

@inject('mermenStore')
@observer
class ListMermen extends Component {
    initState = {
      id: '',
      mermanLocation: PLACE[0],
      showLocationSelection: false,
    };
 
  constructor(props) {
    super(props);
    this.state = this.initState;
    this.editMerman = this.editMerman.bind(this);
    this.removeMerman = this.removeMerman.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleMermanLocationChange =
      this.handleMermanLocationChange.bind(this);
  }

  handleEditClick(event) {
    event.persist();
    event.preventDefault();
    const trElement = event.target.closest(".each_merman_tr");
    const id = trElement.getAttribute('data-key');
    this.setState({id});
    this.setState({showLocationSelection: true});
  }


  async editMerman(event, props, location) {
    const id = this.state.id;
    try {
      const response = await axios.patch(`/srv/change/${id}`, { location });
      if (response.status >= 200 && response.status < 300) {
        props.mermenStore.EditMerman(response.data.doc._id, response.data.doc.name, response.data.doc.location);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
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

  handleMermanLocationChange(event) {
    this.setState({
      mermanLocation: event.target.value,
      showLocationSelection: false,
    });
    this.editMerman(event, this.props, event.target.value);
  }

/*
  renderLocation(merman) {
    if (this.state.showLocationSelection === true && merman.id === this.state.id)  {
      return(
        <select name="location" className="browser-default"
          value={this.state.mermanLocation}
          onChange={this.handleMermanLocationChange}>
          {PLACE.map(each =>{
            return <option key={each} value={each}>{each}</option>;
          })}
        </select>
      );
    } else {
      return null;
    }
  }
*/

  renderLocation(merman) {
    if (this.state.showLocationSelection === true && merman.id === this.state.id)  {
      return(
        <select name="location" className="browser-default"
          value=""
          onChange={this.handleMermanLocationChange}>
          <option disabled value="">Select the place...</option>
          {PLACE.map(each =>{
            return <option key={each} value={each}>{each}</option>;
          })}
        </select>
      );
    } else {
      return null;
    }
  }

  render() {
    return(
      this.props.mermenStore.sortedMermenResult.filter(each => each.location === this.props.place).map(each => {
        return(
          <tr key={each.id} data-key={each.id} className="each_merman_tr">
          <td>
            { each.name }{'      '}
            <button onClick={this.handleEditClick} className="teal btn-flat right whits-text"><i className="material-icons">edit</i></button>
            <button onClick={this.handleRemoveClick} className="red btn-flat right white-text"><i className="material-icons">clear</i></button>
            {this.renderLocation(each)}
          </td>
          </tr>
        );
      })
    ); 
  }


}

export default ListMermen;