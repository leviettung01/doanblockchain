import React, { useState, useEffect} from 'react';
import * as s from "../../styles/globalStyles";
import _bg from "../../assets/images/bg/_bg.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchData} from "../../redux/data/dataActions";
import {Link} from "react-router-dom";
import TruffleRenderer from "../TruffleRenderer";
// import { useHistory } from "react-router-dom";

const Marketplace = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    const blockchain = useSelector((state) => state.blockchain);

    const [toggleState, setToggleState] = useState(1);

    //toggleTab
    const toggleTab = (index) => {
      setToggleState(index);
    }

    const [priceList, setPriceList] = useState(data.allTruffles.filter(item => item.sell > 0));

    const sortByPrice = () => {
      const sorted = priceList.sort((a, b) => {
        return b.sell - a.sell;
      });
      setPriceList(sorted);
    };

    useEffect(() => {
      if(toggleState === 3)
        sortByPrice()
    },)

    useEffect(() => {
      if (blockchain.account !== "" && blockchain.truffleFactory !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.account, blockchain.truffleFactory, dispatch]);

    return (
        <s.Screen >
            <s.Container flex={1} ai={"center"} jc={"flex-start"} style={{paddingTop: "3rem", marginTop: "4.5rem"}}>
                {/* <s.InputSearch
                    style={{marginBottom: "30px"}}
                    placeholder="Search..."
                    autofocus
                    required
                /> */}
                <s.ContainerTabBar>
                  <s.MenuTabsHome>
                    <s.TabHome
                      className={toggleState === 1 ? "active-tab" : null}
                      onClick={() => toggleTab(1)}
                    >
                      All {toggleState === 1 ? '(' + data.allTruffles.filter(item => item.sell > 0).length + ')' : null}
                    </s.TabHome>
                    <s.TabHome
                      className={toggleState === 2 ? "active-tab" : null}
                      onClick={() => toggleTab(2)}
                    >
                      My Items {toggleState === 2 ? '(' + data.allOwnerTruffles.filter(item => item.sell > 0).length + ')' : null}
                    </s.TabHome>
                    <s.TabHome
                      className={toggleState === 3 ? "active-tab" : null}
                      onClick={() => toggleTab(3)}
                    >
                      Price {toggleState === 3 ? '(' + data.allTruffles.filter(item => item.sell > 0).length  + ')' : null}
                    </s.TabHome>
                  </s.MenuTabsHome>
                </s.ContainerTabBar>
                {/* toggle 1 */}
                {toggleState === 1 ? (
                  <s.ContainerHome jc={"flex-start"} fd={"row"} style={{flexWrap: "wrap", margin: "27px "}}>
                    {data.allOwnerTruffles.filter(item => item.sell > 0).length === 0 ? (
                      <s.Container flex={1} ai={"center"} jc={"center"}>
                        <s.TextTitle>
                          We can't find the items on sale.
                        </s.TextTitle>
                        <s.TextSubTitleHome>
                          try reloading the page !
                        </s.TextSubTitleHome>
                        <s.SpacerSmall />
                      </s.Container>
                    ) : (
                    <s.ContainerHome flex={1} jc={"flex-start"} fd={"row"} style={{flexWrap: "wrap"}}>
                      {/* <s.TextSubTitle> Results: 1-20 of {data.allTruffles.filter(item => item.sell > 0).length}</s.TextSubTitle> */}
                    {data.allTruffles.filter(item => item.sell > 0).map((item) => {
                      return (
                        <s.Box style={{ padding: "18px", margin:"15px"}}>
                          <s.StyledImg>
                            <Link to={`/details/${item.id}`} >
                              <TruffleRenderer truffle={item}/>
                            </Link>
                          </s.StyledImg>
                          <s.Container>
                              <s.StyledTextBox>
                                <s.TextDescription>{item.name}</s.TextDescription>
                                <s.TextSubTitle>Price</s.TextSubTitle>
                              </s.StyledTextBox>
                              <s.StyledTextBox>
                                <s.TextDescription>#{item.id}</s.TextDescription>
                                <s.StyledButtonPrice>
                                  <s.TextDescription className="StyledHoverTitle">{blockchain.web3.utils.fromWei(item.sell,"ether")} ETH</s.TextDescription>
                                </s.StyledButtonPrice>
                              </s.StyledTextBox>  
                              <s.StyledTextBoxBoder>
                              <s.TextSubTitle>Rarity: <span style={{color: "#ffffff"}}>{item.rarity}</span></s.TextSubTitle>
                              <s.TextSubTitle>Level: <span style={{color: "#ffffff"}}>{item.level}</span></s.TextSubTitle>
                            </s.StyledTextBoxBoder>
                          </s.Container>
                        </s.Box>
                      );
                    })}
                    </s.ContainerHome>
                  )}
                  </s.ContainerHome> 
                ) : (null)}
                {/* toggle 2 */}
                {toggleState === 2 ? (
                  <s.ContainerHome jc={"flex-start"} fd={"row"} style={{flexWrap: "wrap", margin: "27px "}}>
                    {data.allOwnerTruffles.filter(item => item.sell > 0).length === 0 ? (
                      <s.Container flex={1} ai={"center"} jc={"center"}>
                        <s.TextTitle>
                          We can't find the items on sale.
                        </s.TextTitle>
                        <s.TextSubTitleHome>
                          try reloading the page !
                        </s.TextSubTitleHome>
                        <s.SpacerSmall />
                      </s.Container>
                    ) : (
                    <s.ContainerHome flex={1} jc={"flex-start"} fd={"row"} style={{flexWrap: "wrap"}}>
                    {data.allOwnerTruffles.filter(item => item.sell > 0).map((item) => {
                      return (
                        <s.Box style={{ padding: "18px", margin:"15px"}}>
                          <s.StyledImg>
                            <Link to={`/details/${item.id}`} >
                              <TruffleRenderer truffle={item}/>
                            </Link>
                          </s.StyledImg>
                          <s.Container>
                              <s.StyledTextBox>
                                <s.TextDescription>{item.name}</s.TextDescription>
                                <s.TextSubTitle>Price</s.TextSubTitle>
                              </s.StyledTextBox>
                              <s.StyledTextBox>
                                <s.TextDescription>#{item.id}</s.TextDescription>
                                <s.StyledButtonPrice>
                                  <s.TextDescription className="StyledHoverTitle">{blockchain.web3.utils.fromWei(item.sell,"ether")} ETH</s.TextDescription>
                                </s.StyledButtonPrice>
                              </s.StyledTextBox>  
                              <s.StyledTextBoxBoder>
                              <s.TextSubTitle>Rarity: <span style={{color: "#ffffff"}}>{item.rarity}</span></s.TextSubTitle>
                              <s.TextSubTitle>Level: <span style={{color: "#ffffff"}}>{item.level}</span></s.TextSubTitle>
                            </s.StyledTextBoxBoder>
                          </s.Container>
                        </s.Box>
                      );
                    })}
                    </s.ContainerHome>
                  )}
                  </s.ContainerHome> 
                ) : (null)}
                {/* toggle 3 */}
                {toggleState === 3 ? (
                  <s.ContainerHome jc={"flex-start"} fd={"row"} style={{flexWrap: "wrap", margin: "27px "}}>
                    {data.allTruffles.filter(item => item.sell > 0).length === 0 ? (
                      <s.Container flex={1} ai={"center"} jc={"center"}>
                        <s.TextTitle>
                          We can't find the items on sale.
                        </s.TextTitle>
                        <s.TextSubTitleHome>
                          try reloading the page !
                        </s.TextSubTitleHome>
                        <s.SpacerSmall />
                      </s.Container>
                    ) : (
                    <s.ContainerHome flex={1} jc={"flex-start"} fd={"row"} style={{flexWrap: "wrap"}}>
                    {priceList.map((item) => {
                      return (
                        <s.Box style={{ padding: "18px", margin:"15px"}}>
                        <s.StyledImg>
                          <Link to={`/details/${item.id}`} >
                            <TruffleRenderer truffle={item}/>
                          </Link>
                        </s.StyledImg>
                        <s.Container>
                            <s.StyledTextBox>
                              <s.TextDescription>{item.name}</s.TextDescription>
                              <s.TextSubTitle>Price</s.TextSubTitle>
                            </s.StyledTextBox>
                            <s.StyledTextBox>
                              <s.TextDescription>#{item.id}</s.TextDescription>
                              <s.StyledButtonPrice>
                                <s.TextDescription className="StyledHoverTitle">{blockchain.web3.utils.fromWei(item.sell,"ether")} ETH</s.TextDescription>
                              </s.StyledButtonPrice>
                            </s.StyledTextBox>  
                            <s.StyledTextBoxBoder>
                            <s.TextSubTitle>Rarity: <span style={{color: "#ffffff"}}>{item.rarity}</span></s.TextSubTitle>
                            <s.TextSubTitle>Level: <span style={{color: "#ffffff"}}>{item.level}</span></s.TextSubTitle>
                          </s.StyledTextBoxBoder>
                        </s.Container>
                      </s.Box>
                      );
                    })}
                    </s.ContainerHome>
                  )}
                  </s.ContainerHome> 
                ) : (null)}
            </s.Container>
        </s.Screen>
    )
}

export default Marketplace
