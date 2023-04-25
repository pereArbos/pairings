import React from "react";

export function renderChoices(playerOptions, rivalOptions, choices) {
  return [
    <div>
      <span style={{ width: "80px", display: "inline-block" }}></span>
      {rivalOptions.map((item) => (
        <span style={{ width: "80px", display: "inline-block" }}>
          <img alt={item.text} style={{ width: "40px" }} src={require(`../armyIcons/${item.text}.png`)} />
        </span>
      ))}
    </div>,
    (choices || []).map((row, i) => {
      return (
        <div>
          <span style={{ width: "80px", display: "inline-block" }}>
            <img
              alt={playerOptions[i].text}
              style={{ width: "40px" }}
              src={require(`../armyIcons/${playerOptions[i].text}.png`)}
            />
          </span>
          {row.map((value) => (
            <span style={{ width: "80px", display: "inline-block" }}>{value}</span>
          ))}
        </div>
      );
    }),
  ];
}
