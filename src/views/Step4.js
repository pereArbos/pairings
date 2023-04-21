import React from "react";
import Select2 from "react-select2-wrapper";

import { defenderChoices } from "../algorithm";
import { renderChoices } from "../pressets/AuxRenderer";

export default class Step4 extends React.Component {
  constructor(props) {
    super(props);

    const { matrix, remaining, score } = props;

    this.choices = defenderChoices(remaining, matrix, true, score);
    this.state = { ...props, escudo: null, escudoRival: null };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getOptionList = () => {
    return this.state.remaining[0].map((id) => ({ id, text: this.props.team[id] }));
  };

  getRivalOptions = () => {
    return this.state.remaining[1].map((id) => ({ id, text: this.props.rivals[id] }));
  };

  printChoices = () => {
    const players = this.getOptionList();
    const rivalOptions = this.getRivalOptions();
    return renderChoices(players, rivalOptions, this.choices);
  };

  render() {
    const { escudo, escudoRival } = this.state;
    console.log(this.props.score);
    return (
      <div className="step">
        <h2>Elegir Escudo</h2>
        {this.printChoices()}
        <h3>Tu escudo</h3>
        <Select2 name="escudo" value={escudo} data={this.getOptionList()} onChange={this.handleChange} />
        <br />
        <br />
        <h3>Escudo del rival</h3>
        <Select2 name="escudoRival" value={escudoRival} data={this.getRivalOptions()} onChange={this.handleChange} />
        <br />
        <br />
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
