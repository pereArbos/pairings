import React from "react";
import Select2 from "react-select2-wrapper";

import { defenderChoices, solveGame } from "../algorithm";

export default class Step1 extends React.Component {
  constructor(props) {
    super(props);

    const { matrix, numPlayers } = props;
    const numArray = [...Array(numPlayers).keys()];

    this.choices = defenderChoices([numArray, numArray], matrix);
    this.state = { ...props };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getListFormat = (list) => {
    return list.map((text, id) => ({ id, text }));
  };

  printChoices = () => {
    return this.choices.map((row) => {
      return (
        <div>
          {row.map((value) => (
            <span style={{ marginRight: "20px" }}>{value}</span>
          ))}
        </div>
      );
    });
  };

  render() {
    const { escudo, escudoRival } = this.state;
    const { team, rivals } = this.props;
    return (
      <div className="step">
        <h2>Elegir Escudo</h2>
        {this.printChoices()}
        <h3>Tu escudo</h3>
        <Select2 name="escudo" value={escudo} data={this.getListFormat(team)} onChange={this.handleChange} />
        <h3>Escudo del rival</h3>
        <Select2
          name="escudoRival"
          value={escudoRival}
          data={this.getListFormat(rivals)}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <button type="button" onClick={this.props.back} style={{ marginRight: "20%" }}>
          Back
        </button>
        <button
          type="button"
          onClick={() => {
            this.props.next({ ...this.state });
          }}
          disabled={!escudo || !escudoRival}
        >
          Next
        </button>
      </div>
    );
  }
}
