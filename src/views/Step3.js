import React from "react";
import Select2 from "react-select2-wrapper";
import { attackerChoices } from "../algorithm";

export default class Step3 extends React.Component {
  constructor(props) {
    super(props);

    const { descarte, descarteRival } = props;
    const remaining = [...props.remaining];
    remaining[0] = remaining[0].filter((player) => player != descarte);
    remaining[1] = remaining[1].filter((player) => player != descarteRival);

    this.state = { ...props, remaining };
  }

  componentDidMount() {
    const { matrix, escudo, escudoRival, descarte, descarteRival } = this.props;
    const defenders = [parseInt(escudo, 10), parseInt(escudoRival, 10)];
    const score = matrix[parseInt(descarte, 10)][parseInt(descarteRival, 10)];

    console.log(attackerChoices(defenders, this.state.remaining, matrix, score));
  }

  getList = () => {
    return this.state.remaining[1].map((id) => ({ id, text: this.props.rivals[id] }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { atacante } = this.state;
    const { team, escudo } = this.props;

    return (
      <div className="step">
        <h2>Elegir Atacante </h2>
        <h3>Elige un atacante del rival contra tu escudo ({team[escudo]})</h3>
        <Select2 name="atacante" value={atacante} data={this.getList()} onChange={this.handleChange} />
        <br />
        <br />
        <button type="button" onClick={this.props.back} style={{ marginRight: "20%" }}>
          Back
        </button>
      </div>
    );
  }
}
