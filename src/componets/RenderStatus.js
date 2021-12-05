import React from 'react'
import * as s from "../styles/globalStyles";
import {Link} from "react-router-dom";
import TruffleRenderer from "./TruffleRenderer";
import { BiDna } from "react-icons/bi";
import revealtruffle from "../assets/images/bg/_revealtruffle.png";

const RenderStatus = ({data, loading}) => {
    if(loading) {
      return (
        <s.Container jc={"center"} ai={"center"} >
                <s.ImageToggleRender image={revealtruffle} />
                <s.TextTitle>The system is in the process, please wait !</s.TextTitle>
                <s.BoxLoadingRender>
                    <s.StyledButtonLoading/>
                </s.BoxLoadingRender>
        </s.Container>
      )
    }

    return (
      <s.Container jc={"flex-start"} fd={"row"} style={{flexWrap: "wrap"}}>
        {data.filter(item => parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0).map(item => ( 
            <s.Box key={item.id} style={{ padding: "18px", margin:"15px"}}>
              <s.StyledImg>
                <Link to={`/details/${item.id}`} >
                  <TruffleRenderer truffle={item}/>
                </Link>
              </s.StyledImg>
              <s.Container>
                  <s.TextDescription>{item.name}</s.TextDescription>
                <s.Container>
                <s.TextDescription>#{item.id}</s.TextDescription>
                  {parseInt((item.readyTime - Date.now() / 1000) / 3600) !== 0 && parseInt((item.readyTime - Date.now() / 1000) / 3600) > 0 ? (
                    <s.TextSubTitle style={{color: "#ffd32a"}}>
                      Not Ready
                    </s.TextSubTitle>
                  ):(
                    <s.TextSubTitle style={{color: "#e96bd4"}}>
                      Breed ready
                    </s.TextSubTitle>
                  )}
                  <s.TextSubTitle><BiDna/> {item.dna}</s.TextSubTitle>
                </s.Container>
                <s.StyledTextBoxBoder>
                  <s.TextSubTitle>Rarity: <span style={{color: "#ffffff"}}>{item.rarity}</span></s.TextSubTitle>
                  <s.TextSubTitle>Level: <span style={{color: "#ffffff"}}>{item.level}</span></s.TextSubTitle>
                </s.StyledTextBoxBoder>
              </s.Container>
            </s.Box>
        ))}
      </s.Container>
    );
}

export default RenderStatus
