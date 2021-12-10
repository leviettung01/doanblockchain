import React from 'react'
import * as s from "../styles/globalStyles";
import {Link} from "react-router-dom";
import TruffleRenderer from "./TruffleRenderer";

const RenderSell = ({data, blockchain,loading}) => {

    return (
        <s.Container jc={"flex-start"} fd={"row"} style={{flexWrap: "wrap"}}>
            {data.filter(item => item.sell > 0).map(item => ( 
            <s.Box key={item.id} style={{ padding: "18px", margin:"15px"}}>
                <s.StyledImg>
                <Link to={`/details/${item.id}`} >
                    <TruffleRenderer truffle={item}/>
                </Link>
                </s.StyledImg>
                <>
                <s.StyledTextBox>
                    <s.TextDescription>{item.name}</s.TextDescription>
                    <s.TextSubTitle>Price</s.TextSubTitle>
                </s.StyledTextBox>
                <s.StyledTextBox>
                    <s.TextDescription>#{item.id}</s.TextDescription>
                    <s.StyledButtonPrice>
                        <s.TextDescription>{blockchain.web3.utils.fromWei(item.sell,"ether")} ETH</s.TextDescription>
                    </s.StyledButtonPrice>
                </s.StyledTextBox>  
                <s.StyledTextBoxBoder>
                    <s.TextSubTitle>Rarity: <span style={{color: "#ffffff"}}>{item.rarity}</span></s.TextSubTitle>
                    <s.TextSubTitle>Level: <span style={{color: "#ffffff"}}>{item.level}</span></s.TextSubTitle>
                </s.StyledTextBoxBoder>
                </>
            </s.Box>
        ))}
        </s.Container>
    );
}

export default RenderSell
