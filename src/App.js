import React from "react";

import MatrixFiller from "./views/MatrixFiller";
import Step1 from "./views/Step1";
import Step2 from "./views/Step2";
import Step3 from "./views/Step3";
import Step4 from "./views/Step4";
import Step5 from "./views/Step5";

import "./App.css";

const steps = [MatrixFiller, Step1, Step2, Step3, Step4, Step5];
const numPlayers = 6;
const initvalues = [
  [5, 5, 3, 6, 3, 4],
  [5, 3, 4, 4, 3, 4],
  [4, 4, 2, 3, 3, 5],
  [4, 5, 3, 4, 3, 5],
  [4, 5, 4, 4, 3, 4],
  [4, 5, 5, 2, 5, 5],
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      numPlayers,
      matrix: initvalues,
      team: ["GSC", "DEM", "WE", "DA", "ELD", "TS"],
      rivals: ["GSC", "IK", "GI", "ELD", "DEM", "NEC"],
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
