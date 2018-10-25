import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';


@inject('mermenStore')
@observer
class AddMerman extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  async submitNew(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const location = e.target.location.value;
    try {
      const response = await axios.post('/srv/new', {name, location});
      console.log(response.data);
      if (response.status >= 200 && response.status < 300) {
        /*
        const { AddMerman } = this.props.mermenStore;
        AddMerman(response.data);
        */
        console.log(this.props);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return(
      <div className="container">
        <form onSubmit={this.submitNew}>
          <label htmlFor="name">
            Name: 
            <input type="text" name="name"/>
          </label>
          <label htmlFor="location">
            Location:
            <input type="text" name="location"/>
            {/*
            <select>
              <option value="" disabled selected>Choose your placee</option>
              <option value="castle">Castle</option>
              <option value="cave">Cave</option>
              <option value="coral_reef">Coral Reef</option>
            </select>
            */}
          </label>
          <button type="submit" className="teal btn-flat right white-text">
            Add
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

export default AddMerman;