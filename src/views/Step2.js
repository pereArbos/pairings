import React from "react";
import Select2 from "react-select2-wrapper";

import { getPairs, attackerChoices } from "../algorithm";

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
    const { matrix, escudo, escudoRival, remaining } = this.state;
    const defenders = [parseInt(escudo, 10), parseInt(escudoRival, 10)];

    this.choices = attackerChoices(defenders, remaining, matrix);
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

  getPairOptions = (list, names) => {
    return getPairs(list).map((pair) => `${names[pair[0]]} ${names[pair[1]]}`);
  };

  goNext = () => {
    const { espada1, espada2, espadaRival1, espadaRival2 } = this.state;
    const espadas = [espada1, espada2].map((item) => parseInt(item, 10));
    const espadasRival = [espadaRival1, espadaRival2].map((item) => parseInt(item, 10));
    this.setState({ espadas, espadasRival }, () => {
      this.props.next({ ...this.state });
    });
  };

  printChoices = () => {
    const { remaining, team, rivals } = this.state;
    const playerOptions = this.getPairOptions(remaining[0], team);
    const rivalOptions = this.getPairOptions(remaining[1], rivals);
    return [
      <div>
        <span style={{ width: "100px", display: "inline-block" }}></span>
        {rivalOptions.map((item) => {
          const rivalArmies = item.split(" ");
          return (
            <span style={{ width: "100px", display: "inline-block" }}>
              {rivalArmies.map((army) => (
                <img style={{ width: "40px" }} src={require(`../armyIcons/${army}.png`)} />
              ))}
            </span>
          );
        })}
      </div>,
      (this.choices || []).map((row, i) => {
        const armies = playerOptions[i].split(" ");
        return (
          <div>
            <span style={{ width: "100px", display: "inline-block" }}>
              {armies.map((army) => (
                <img style={{ width: "40px" }} src={require(`../armyIcons/${army}.png`)} />
              ))}
            </span>
            {row.map((value) => (
              <span style={{ width: "100px", display: "inline-block" }}>{value}</span>
            ))}
          </div>
        );
      }),
    ];
  };

  render() {
    const { espada1, espada2, espadaRival1, espadaRival2 } = this.state;
    const { team, rivals, escudo, escudoRival } = this.props;
    const playerList = this.getList();
    const rivalList = this.getRivalList();
    const disableNext = !espada1 || !espada2 || !espadaRival1 || !espadaRival2;

    return (
      <div className="step">
        <h2>Elegir Espadas</h2>
        {this.printChoices()}
        <h3>Tus Espadas contra el escudo del rival ({rivals[escudoRival]})</h3>
        <Select2 name="espada1" value={espada1} data={playerList} onChange={this.handleChange} />
        <br />
        <Select2 name="espada2" value={espada2} data={playerList} onChange={this.handleChange} />
        <br />
        <br />
        <h3>Espadas del rival (tu escudo: {team[escudo]})</h3>
        <Select2 name="espadaRival1" value={espadaRival1} data={rivalList} onChange={this.handleChange} />
        <br />
        <Select2 name="espadaRival2" value={espadaRival2} data={rivalList} onChange={this.handleChange} />
        <br />
        <br />
        <button className="button-footer" type="button" disabled={disableNext} onClick={this.goNext}>
          Next
        </button>
      </div>
    );
  }
}
