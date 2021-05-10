import React from "react"; 
import '../css/Header.css';

/**
 * Renders a header displaying the title of the web application.
 */
const Header = ({title}) => {
    return (
      <header className="header-container">
        <h1 className="header-title">{title}</h1>
      </header>
    );
}
export default Header;

