import React from "react";

export function renderChoices(playerOptions, rivalOptions, choices) {
  return [
    <div>
      <span style={{ width: "80px", display: "inline-block" }}></span>
      {rivalOptions.map((item) => (
        <span style={{ width: "80px", display: "inline-block" }}>{item.text}</span>
      ))}
    </div>,
    (choices || []).map((row, i) => {
      return (
        <div>
          <span style={{ width: "80px", display: "inline-block" }}>{playerOptions[i].text}</span>
          {row.map((value) => (
            <span style={{ width: "80px", display: "inline-block" }}>{value}</span>
          ))}
        </div>
      );
    }),
  ];
}
