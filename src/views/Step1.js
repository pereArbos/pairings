import React from "react";

const numPlayers = 4;
const topValue = 5;

export default class MatrixFiller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <div className="step1">
        hola
        <button type="button" className="btnNext">
          Next
        </button>
      </div>
    );
  }
}
