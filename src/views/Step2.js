import React from "react";
import Select2 from "react-select2-wrapper";

import { discardChoices } from "../algorithm";

export default class Step2 extends React.Component {
  constructor(props) {
    super(props);
    const { numPlayers, escudo, escudoRival } = props;
    const numArray = [...Array(numPlayers).keys()];
    const remaining = [];
    remaining.push(numArray.filter((player) => player != escudo));
    remaining.push(numArray.filter((player) => player != escudoRival));

    this.state = { ...props, remaining };
  }

  componentDidMount() {
    const { matrix, escudo, escudoRival } = this.props;
    const defenders = [parseInt(escudo, 10), parseInt(escudoRival, 10)];

    this.choices = discardChoices(defenders, this.state.remaining, matrix);
    this.forceUpdate();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getList = () => {
    return this.state.remaining[0].map((id) => ({ id, text: this.props.team[id] }));
  };

  getRivalList = () => {
    return this.state.remaining[1].map((id) => ({ id, text: this.props.rivals[id] }));
  };

  printChoices = () => {
    return (this.choices || []).map((row) => {
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
    const { descarte, descarteRival } = this.state;
    const { team, rivals, escudo, escudoRival } = this.props;

    return (
      <div className="step">
        <h2>Elegir Descarte (los dos restantes serán los atacantes)</h2>
        {this.printChoices()}
        <h3>Tu descarte contra el escudo del rival ({rivals[escudoRival]})</h3>
        <Select2 name="descarte" value={descarte} data={this.getList()} onChange={this.handleChange} />
        <h3>Descarte del rival (tu escudo: {team[escudo]})</h3>
        <Select2 name="descarteRival" value={descarteRival} data={this.getRivalList()} onChange={this.handleChange} />
        <br />
        <br />
        <button type="button" onClick={this.props.back} style={{ marginRight: "20%" }}>
          Back
        </button>
        <button
          type="button"
          disabled={!descarte || !descarteRival}
          onClick={() => {
            this.props.next({ ...this.state });
          }}
        >
          Next
        </button>
      </div>
    );
  }
}
