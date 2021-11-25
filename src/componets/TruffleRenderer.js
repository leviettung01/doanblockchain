import React from "react";
// cards
import { parts } from "../parts/parts";

const TruffleRenderer = ({ truffle = null, width = 200, height = 200, style }) => {
  let dnaStr = String(truffle.dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  let truffleDeatils = {
    bg: dnaStr.substring(0, 2) % 11,
    skin: dnaStr.substring(2, 4) % 6,
    mouth: dnaStr.substring(8, 10) % 6,
    mushroomcore: dnaStr.substring(12, 14) % 8,
    mushroom: dnaStr.substring(10, 12) % 6,
    border: dnaStr.substring(4, 6) % 10,
    eyes: dnaStr.substring(6, 8) % 6,
    rarity: dnaStr.substring(14, 16) % 18,
    name: truffle.name,
  };

  // let Rarity = truffleDeatils.rarity

  if (!truffle) {
    return null;
  }

  // if (truffle.Rarity <= 50) {
  //   Rarity = Rarity % 1;
  // }
  // console.log("rarity: " + Rarity)

  const truffleStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: "0.8rem",
  };

  return (
    <div
      style={{
        minWidth: width,
        minHeight: height,
        position: "relative",
        ...style,
      }}
    >
      <img alt={"bg"} src={parts.bg[truffleDeatils.bg]} style={truffleStyle} />
      <img alt={"skin"} src={parts.skin[truffleDeatils.skin]} style={truffleStyle} />
      <img
        alt={"mouth"}
        src={parts.mouth[truffleDeatils.mouth]}
        style={truffleStyle}
      />
      <img
        alt={"mushroomcore"}
        src={parts.mushroomcore[truffleDeatils.mushroomcore]}
        style={truffleStyle}
      />
      <img
        alt={"mushroom"}
        src={parts.mushroom[truffleDeatils.mushroom]}
        style={truffleStyle}
      />
      <img alt={"border"} src={parts.border[truffleDeatils.border]} style={truffleStyle} />
      <img alt={"eyes"} src={parts.eyes[truffleDeatils.eyes]} style={truffleStyle} />
      <img 
        alt={"rarity"} 
        src={parts.rarity[truffleDeatils.rarity]} 
        style={truffleStyle} />
    </div>
  );
};

export default TruffleRenderer;