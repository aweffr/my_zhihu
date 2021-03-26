import React, {Component} from 'react';
import MyNavBar from "./my-nav-bar";

class Layout extends Component {
  render() {
    return (
      <div>
        <MyNavBar/>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
