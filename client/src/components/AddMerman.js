import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';


@inject('mermenStore')
@observer
class AddMerman extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.submitNew(event, this.props);
  }

  async submitNew(e, props) {
    e.preventDefault();
    const name = e.target.name.value;
    const location = e.target.location.value;
    try {
      const response = await axios.post('/srv/new', {name, location});
      if (response.status >= 200 && response.status < 300) {
        props.mermenStore.AddMerman(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return(
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            Name: 
            <input type="text" name="name"
              value={this.state.name} onChange={this.handleChange}/>
          </label>
          <label htmlFor="location">
            Location:
            <input type="text" name="location"
              value={this.state.locaton} onChange={this.handleChange}/>
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