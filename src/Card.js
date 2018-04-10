import React from "react";
import PropTypes from "prop-types";
import "./App.css";

function Card(props) {
  let style = {};
  if (props.showing) {
    style.backgroundColor = props.backgroundColor;
  }
  return <div onClick={props.onClick} className="card" style={style} />;
}

Card.propTypes = {
  showing: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Card;
