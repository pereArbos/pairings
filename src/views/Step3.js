import React from "react";
import Select2 from "react-select2-wrapper";
import { attackerPairing } from "../algorithm";
import { renderChoices } from "../pressets/AuxRenderer";

export default class Step3 extends React.Component {
  constructor(props) {
    super(props);

    const remaining = [...props.remaining];

    this.state = {
      ...props,
      remaining: [
        remaining[0].filter((item) => !props.espadas.includes(item)),
        remaining[1].filter((item) => !props.espadasRival.includes(item)),
      ],
    };
  }

  componentDidMount() {
    const { matrix, escudo, escudoRival, espadas, espadasRival } = this.state;
    const defenders = [parseInt(escudo, 10), parseInt(escudoRival, 10)];
    const attackers = [espadas, espadasRival];

    this.choices = attackerPairing(defenders, attackers, matrix);
    this.forceUpdate();
  }

  getOptionList = () => {
    return this.state.espadasRival.map((item, idx) => ({ id: idx, text: this.props.rivals[item] }));
  };

  getRivalOptions = () => {
    return this.state.espadas.map((item, idx) => ({ id: idx, text: this.props.team[item] }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  goNext = () => {
    const { atacante, atacanteRival } = this.state;
    this.setState({ score: this.choices[atacante][atacanteRival] }, () => {
      this.props.next({ ...this.state });
    });
  };

  printChoices = () => {
    const options = this.getOptionList();
    const rivalOptions = this.getRivalOptions();
    return renderChoices(options, rivalOptions, this.choices);
  };

  render() {
    const { atacante, atacanteRival } = this.state;
    const { team, escudo, rivals, escudoRival } = this.props;

    return (
      <div className="step">
        <h2>Elegir Atacante </h2>
        {this.printChoices()}
        <h3>Elige un atacante del rival contra tu escudo ({team[escudo]})</h3>
        <Select2 name="atacante" value={atacante} data={this.getOptionList()} onChange={this.handleChange} />
        <br />
        <br />
        <h3>Elección del rival para su escudo ({rivals[escudoRival]})</h3>
        <Select2
          name="atacanteRival"
          value={atacanteRival}
          data={this.getRivalOptions()}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <button type="button" onClick={this.goNext} disabled={!atacante || !atacanteRival}>
          Next
        </button>
      </div>
    );
  }
}
