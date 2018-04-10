import React from "react";
import PropTypes from 'prop-types';
import "./App.css";

function NavBar({ onNewGame }) {
  return (
    <nav>
      <h1>Memory Game</h1>
      <button onClick={onNewGame}>
        <i className="fas fa-sync-alt" />
      </button>
    </nav>
  );
}

NavBar.propTypes = {
  onNewGame: PropTypes.func.isRequired
};

export default NavBar;
