import React, {useState} from "react"; 
import DisplayModal from './DisplayModal';
import Searchbar from './Searchbar';
import '../css/Header.css';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header-container">
        <h1 className="header-title">{this.props.title}</h1>
        <DisplayModal/>
        <hr/>
        <Searchbar/>
      </header>
    );
  }
}


