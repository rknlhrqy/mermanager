import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {
  renderContent() {
    return <p style={{ margin: '0 10px'}}>Kening Ren</p>;
  }

  render() {
    return(
      <nav className="container">
        <div className="nav-wrapper">
          <Link
            to={'/srv/all'}
            className="left brand-logo"
          >MerManager</Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;