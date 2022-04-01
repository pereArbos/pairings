import React from "react";

import MatrixFiller from "./views/MatrixFiller";
import Step1 from "./views/Step1";
import Step2 from "./views/Step2";
import Step3 from "./views/Step3";

import "./App.css";

const steps = [MatrixFiller, Step1, Step2, Step3];
const numPlayers = 4;
const initValues = [
  [1, 4, 2, 3],
  [5, 4, 1, 3],
  [5, 2, 2, 4],
  [3, 3, 1, 5],
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      numPlayers,
      matrix: initValues,
      team: ["Adeptus Custodes", "Chaos Daemons", "Craftworlds", "Tau Empire"],
      rivals: ["Harlequins", "Tau Empire", "Tyranids", "Drukhari"],
    };
  }

  nextStep = (data) => {
    this.setState((prevState) => {
      return { ...data, step: prevState.step + 1 };
    });
  };

  prevStep = () => {
    this.setState((prevState) => {
      return { step: prevState.step - 1 };
    });
  };

  render() {
    const StepCmp = steps[this.state.step];
    return (
      <div className="App-base">
        <StepCmp next={this.nextStep} back={this.prevStep} {...this.state} />
      </div>
    );
  }
}
