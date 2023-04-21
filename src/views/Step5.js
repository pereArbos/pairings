import React from "react";
import Select2 from "react-select2-wrapper";
import { attackerPairing } from "../algorithm";
import { renderChoices } from "../pressets/AuxRenderer";

export default class Step5 extends React.Component {
  constructor(props) {
    super(props);

    const remaining = [...props.remaining];

    this.state = {
      ...props,
      remaining: [
        remaining[0].filter((item) => item != props.escudo),
        remaining[1].filter((item) => item != props.escudoRival),
      ],
    };
  }

  componentDidMount() {
    const { matrix, escudo, escudoRival, remaining, score } = this.state;
    const defenders = [parseInt(escudo, 10), parseInt(escudoRival, 10)];

    this.choices = attackerPairing(defenders, remaining, matrix, score);
    this.forceUpdate();
  }

  getOptionList = () => {
    return this.state.remaining[1].map((id) => ({ id, text: this.props.rivals[id] }));
  };

  getRivalOptions = () => {
    return this.state.remaining[0].map((id) => ({ id, text: this.props.team[id] }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  printChoices = () => {
    const options = this.getOptionList();
    const rivalOptions = this.getRivalOptions();
    return renderChoices(options, rivalOptions, this.choices);
  };

  render() {
    const { atacante } = this.state;
    const { team, escudo } = this.props;

    return (
      <div className="step">
        <h2>Elegir Atacante </h2>
        {this.printChoices()}
        <h3>Elige un atacante del rival contra tu escudo ({team[escudo]})</h3>
        <Select2 name="atacante" value={atacante} data={this.getOptionList()} onChange={this.handleChange} />
        <br />
        <br />
      </div>
    );
  }
}
