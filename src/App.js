import React from "react";

import MatrixFiller from "./views/MatrixFiller";
import Step1 from "./views/Step1";
import Step2 from "./views/Step2";
import Step3 from "./views/Step3";
import Step4 from "./views/Step4";
import Step5 from "./views/Step5";

import "./App.css";

const matrix1 = [
  [6, 4, 6, 2, 5, 3],
  [3, 2, 5, 3, 5, 5],
  [5, 2, 4, 3, 6, 3],
  [3, 3, 4, 5, 4, 4],
  [4, 3, 3, 5, 5, 5],
  [3, 5, 2, 4, 5, 5],
];

const matrix = [
  [5, 4, 5, 3, 5, 5],
  [1, 2, 3, 4, 6, 6],
  [5, 2, 5, 4, 6, 6],
  [3, 3, 2, 5, 4, 2],
  [4, 3, 4, 3, 6, 6],
  [2, 5, 3, 4, 4, 4],
];

const matrix3 = [
  [4, 3, 6, 4, 2, 2],
  [6, 3, 4, 5, 1, 5],
  [3, 3, 4, 3, 5, 2],
  [7, 6, 5, 3, 3, 6],
  [5, 4, 6, 2, 4, 6],
  [6, 2, 4, 3, 2, 5],
];

const matrix4 = [
  [5, 5, 1, 2, 3, 4],
  [3, 6, 3, 4, 6, 5],
  [7, 4, 2, 5, 4, 5],
  [5, 3, 3, 5, 3, 2],
  [4, 3, 5, 5, 6, 5],
  [5, 1, 4, 3, 3, 5],
];

const steps = [MatrixFiller, Step1, Step2, Step3, Step4, Step5];
const numPlayers = 6;
const initValues = matrix1;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      numPlayers,
      matrix: initValues,
      team: ["GI", "DA", "IH", "DW", "IK", "CK"],
      rivals: ["GI", "DA", "IH", "DW", "IK", "CK"],
    };
  }

  nextStep = (data) => {
    this.setState((prevState) => {
      return { ...data, step: prevState.step + 1 };
    });
  };

  /* prevStep = () => {
    this.setState((prevState) => {
      return { step: prevState.step - 1 };
    });
  }; */

  render() {
    const StepCmp = steps[this.state.step];
    return (
      <div className="App-base">
        <StepCmp next={this.nextStep} back={this.prevStep} {...this.state} />
      </div>
    );
  }
}
