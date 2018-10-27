import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { PLACE } from '../config/config';


@inject('mermenStore')
@observer
class AddMerman extends Component {
    initState = {
      name: '',
      location: '',
      mermanLocation: PLACE[0],
    };
 
  constructor(props) {
    super(props);
    this.state = this.initState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMermanLocationChange = this.handleMermanLocationChange.bind(this);
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
    this.clearInput();
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
  clearInput() {
    this.setState(this.initState);
  }

  handleMermanLocationChange(event) {
    this.setState({
      mermanLocation: event.target.value,
    });
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
            <select name="location" className="browser-default"
              value={this.state.mermanLocation}
              onChange={this.handleMermanLocationChange}>
              {PLACE.map(each =>{
                return <option key={each} value={each}>{each}</option>;
              })}
            </select>
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