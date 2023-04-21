import React from "react";
import Select2 from "react-select2-wrapper";

import { defenderChoices } from "../algorithm";
import { renderChoices } from "../pressets/AuxRenderer";

export default class Step4 extends React.Component {
  constructor(props) {
    super(props);

    const { matrix, numPlayers } = props;
    const numArray = [...Array(numPlayers).keys()];

    this.choices = defenderChoices([numArray, numArray], matrix);
    this.sums = defenderChoices([numArray, numArray], matrix, false, 0, true);
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
    const { team, rivals } = this.props;
    const options = this.getListFormat(team);
    const rivalOptions = this.getListFormat(rivals);
    return [
      renderChoices(options, rivalOptions, this.choices),
      <br />,
      renderChoices(options, rivalOptions, this.sums),
    ];
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
        <br />
        <br />
        <h3>Escudo del rival</h3>
        <Select2
          name="escudoRival"
          value={escudoRival}
          data={this.getListFormat(rivals)}
          onChange={this.handleChange}
        />
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
