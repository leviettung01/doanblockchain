import React from "react";
// cards
import { parts } from "../parts/parts";

import ra_1 from "../assets/images/rarity/0.png";
import ra_2 from "../assets/images/rarity/1.png";
import ra_3 from "../assets/images/rarity/2.png";
import ra_4 from "../assets/images/rarity/3.png";
import ra_5 from "../assets/images/rarity/4.png";
import ra_6 from "../assets/images/rarity/5.png";
import ra_7 from "../assets/images/rarity/6.png";
import ra_8 from "../assets/images/rarity/7.png";
import ra_9 from "../assets/images/rarity/8.png";
import ra_10 from "../assets/images/rarity/9.png";
import ra_11 from "../assets/images/rarity/10.png";
import ra_12 from "../assets/images/rarity/11.png";
import ra_13 from "../assets/images/rarity/12.png";
import ra_14 from "../assets/images/rarity/13.png";
import ra_15 from "../assets/images/rarity/14.png";
import ra_16 from "../assets/images/rarity/15.png";
import ra_17 from "../assets/images/rarity/16.png";
import ra_18 from "../assets/images/rarity/17.png";
import ra_19 from "../assets/images/rarity/18.png";
import ra_20 from "../assets/images/rarity/19.png";
import ra_21 from "../assets/images/rarity/20.png";
import ra_22 from "../assets/images/rarity/21.png";
import ra_23 from "../assets/images/rarity/22.png";
import ra_24 from "../assets/images/rarity/23.png";
import ra_25 from "../assets/images/rarity/24.png";
import ra_26 from "../assets/images/rarity/25.png";
import ra_27 from "../assets/images/rarity/26.png";

const TruffleRenderer = ({ truffle = null, width = 200, height = 200, style }) => {
  let dnaStr = String(truffle.dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  let truffleDeatils = {
    bg: dnaStr.substring(0, 2) % 14,
    skin: dnaStr.substring(2, 4) % 7,
    mouth: dnaStr.substring(4, 6) % 8,
    mushroomcore: dnaStr.substring(6, 8) % 8,
    mushroom: dnaStr.substring(8, 10) % 14,
    border: dnaStr.substring(10, 12) % 10,
    eyes: dnaStr.substring(12, 14) % 20,
    name: truffle.name,
  };

  if (!truffle) {
    return null;
  }

  let rarity =  ra_20;

  if(truffle.rarity > 10 && truffle.rarity <= 13)
    rarity = ra_10
  if(truffle.rarity > 13 && truffle.rarity <= 16)
    rarity = ra_13
  if(truffle.rarity > 16 && truffle.rarity <= 19)
    rarity = ra_26
  if(truffle.rarity > 19 && truffle.rarity <= 22)
    rarity = ra_14
  if(truffle.rarity > 22 && truffle.rarity <= 25)
    rarity = ra_12
  if(truffle.rarity > 25 && truffle.rarity <= 29)
    rarity = ra_25
  if(truffle.rarity > 29 && truffle.rarity <= 32)
    rarity = ra_9
  if(truffle.rarity > 32 && truffle.rarity <= 35)
    rarity = ra_6
  if(truffle.rarity > 35 && truffle.rarity <= 39)
    rarity = ra_2
  if(truffle.rarity > 39 && truffle.rarity <= 42)
    rarity = ra_18
  if(truffle.rarity > 42 && truffle.rarity <= 45)
    rarity = ra_4
  if(truffle.rarity > 45 && truffle.rarity <= 49)
    rarity = ra_5
  if(truffle.rarity > 49 && truffle.rarity <= 52)
    rarity = ra_7
  if(truffle.rarity > 52 && truffle.rarity <= 55)
    rarity = ra_23
  if(truffle.rarity > 55 && truffle.rarity <= 59)
    rarity = ra_11
  if(truffle.rarity > 59 && truffle.rarity <= 62)
    rarity = ra_17
  if(truffle.rarity > 62 && truffle.rarity <= 65)
    rarity = ra_16
  if(truffle.rarity > 65 && truffle.rarity <= 69)
    rarity = ra_15
  if(truffle.rarity > 69 && truffle.rarity <= 72)
    rarity = ra_8
  if(truffle.rarity > 72 && truffle.rarity <= 75)
    rarity = ra_19
  if(truffle.rarity > 75 && truffle.rarity <= 79)
    rarity = ra_22
  if(truffle.rarity > 79 && truffle.rarity <= 82)
    rarity = ra_21
  if(truffle.rarity > 82 && truffle.rarity <= 85)
    rarity = ra_27
  if(truffle.rarity > 85 && truffle.rarity <= 89)
    rarity = ra_24
  if(truffle.rarity > 89 && truffle.rarity <= 92)
    rarity = ra_1
  if(truffle.rarity > 92 )
    rarity = ra_3

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
        src={rarity} 
        style={truffleStyle} />
    </div>
  );
};

export default TruffleRenderer;