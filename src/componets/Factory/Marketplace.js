import React, { useEffect , useState} from 'react';
import * as s from "../../styles/globalStyles";
import _color from "../../assets/images/bg/_color.png";
import { useDispatch, useSelector } from "react-redux";
import TruffleRenderer from "../TruffleRenderer";
import { BiDna, BiTimer } from "react-icons/bi";
import { Link} from "react-router-dom";

const Marketplace = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    return (
        <s.Screen image={_color}>
            <s.Container flex={1} fd={"row"} jc={"center"} style={{ marginTop: "30px"}}>
                <s.InputSearch
                    placeholder="Search..."
                    autofocus
                    required
                />
            </s.Container>

            <s.ContentMarket>
                  {data.allOwnerTruffles.map((item, index) => {
                    return (
                      <s.Box key={index} style={{ padding: "15px", margin:"15px"}}>
                        <s.StyledImg>
                          <Link to={`/details/${item.id}`} >
                            <TruffleRenderer truffle={item}/>
                          </Link>
                        </s.StyledImg>
                        <s.SpacerXSmall />
                        <s.Container>
                          <s.StyledTextBoxName>
                            <s.TextDescription>{item.name}</s.TextDescription>
                          </s.StyledTextBoxName >
                          <s.Container>
                            <s.TextDescription>#{item.id}</s.TextDescription>
                            <s.TextDescription>
                              <BiTimer style={{fontSize: "14px"}}/> {item.readyTime}
                            </s.TextDescription>
                            <s.TextDescription><BiDna/> {item.dna}</s.TextDescription>
                          </s.Container>
                          <s.StyledTextBox>

                            <s.TextDescription>Rarity: {item.rarity}</s.TextDescription>
                            <s.TextDescription>Level: {item.level}</s.TextDescription>
                          </s.StyledTextBox>
                        </s.Container>
                      </s.Box>
                    );
                  })}
                </s.ContentMarket> 
        </s.Screen>
    )
}

export default Marketplace
