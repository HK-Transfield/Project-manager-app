import React from "react"; 
import '../css/Header.css';

/**
 * Renders a header displaying the title of the web application.
 */
export default class Header extends React.Component {
  render() {
    return (
      <header className="header-container">
        <h1 className="header-title">{this.props.title}</h1>
      </header>
    );
  }
}


