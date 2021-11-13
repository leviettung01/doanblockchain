import React, { useEffect , useState} from 'react';
import * as s from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import TruffleRenderer from "./TruffleRenderer";
import { BiDna, BiTargetLock, BiTimer } from "react-icons/bi";

const Popup = (props) => {
    const data = useSelector((state) => state.data);

    return (props.trigger) ? (
        <s.ShowItems>
            <s.ShowContent>
                <s.TextTitlePopup>
                    Select a Truffle to breed
                </s.TextTitlePopup>
                <s.StyledButtonClose
                    onClick={() => 
                        props.setTrigger(false)
                    }
                >
                    Close
                </s.StyledButtonClose>

                <s.Container fd={"row"}>
                  {data.allOwnerTruffles.map((item, index) => {
                    return (
                      <s.BoxPopup key={index} style={{ padding: "15px", margin:"0 15px 15px 15px"}}>
                        <s.StyledImgPopup>
                          <TruffleRenderer 
                            truffle={item}
                          />
                        </s.StyledImgPopup>
                        <s.SpacerXSmall />
                        <s.Container>
                          <s.StyledTextBoxPopup>
                            <s.TextDescriptionPopup>{item.name}</s.TextDescriptionPopup>
                          </s.StyledTextBoxPopup >
                          <s.Container>
                            <s.TextDescriptionPopup>#{item.id}</s.TextDescriptionPopup>
                            <s.TextDescriptionPopup>
                              <BiTimer style={{fontSize: "14px"}}/> {item.readyTime}
                            </s.TextDescriptionPopup>
                            <s.TextDescriptionPopup><BiDna/> {item.dna}</s.TextDescriptionPopup>
                          </s.Container>
                          <s.StyledTextBox>
                            <s.TextDescriptionPopup>Rarity: {item.rarity}</s.TextDescriptionPopup>
                            <s.TextDescriptionPopup>Level: {item.level}</s.TextDescriptionPopup>
                          </s.StyledTextBox>
                        </s.Container>
                      </s.BoxPopup>
                    );
                  })}
                </s.Container> 
                {props.children}
            </s.ShowContent>
        </s.ShowItems>
    ): null
}

export default Popup
