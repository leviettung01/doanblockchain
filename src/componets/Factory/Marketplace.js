import React, { useState, useEffect} from 'react';
import * as s from "../../styles/globalStyles";
import _color from "../../assets/images/bg/_color.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchData} from "../../redux/data/dataActions";
import {Link} from "react-router-dom";
import TruffleRenderer from "../TruffleRenderer";
import { useHistory } from "react-router-dom";

const Marketplace = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    const blockchain = useSelector((state) => state.blockchain);

    const [loadingBuy, setLoadingBuy] = useState(false);

    let history = useHistory();

    //sell
    const BuyTruffle = (_account, _tokenId, _price) => {
        setLoadingBuy(true);
        blockchain.truffleFactory.methods
        .buy( _tokenId)
        .send({
            from: _account,
            value: blockchain.web3.utils.toWei(_price,"ether"),
        })
        .once("error", (err) => {
        setLoadingBuy(false);
        console.log(err);
        })
        .then((receipt) => {
        setLoadingBuy(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
        history.push("/");
        });
    }

    
    //unsell
    const UnSellTruffle = (_account, _tokenId) => {
      setLoadingBuy(true);
      blockchain.truffleFactory.methods
      .disallowBuy( _tokenId)
      .send({
          from: _account,
      })
      .once("error", (err) => {
      setLoadingBuy(false);
      console.log(err);
      })
      .then((receipt) => {
      setLoadingBuy(false);
      console.log(receipt);
      dispatch(fetchData(blockchain.account));
      });
    }

    useEffect(() => {
      if (blockchain.account !== "" && blockchain.truffleFactory !== null) {
        dispatch(fetchData(blockchain.account));
      }
    }, [blockchain.account, blockchain.truffleFactory, dispatch]);

    return (
        <s.Screen image={_color}>
            <s.Container flex={1} ai={"center"} jc={"flex-start"} style={{ marginTop: "30px"}}>
                <s.InputSearch
                    style={{marginBottom: "30px"}}
                    placeholder="Search..."
                    autofocus
                    required
                />
                <s.Container jc={"center"} fd={"row"} style={{flexWrap: "wrap"}}>
                {data.getAllIitemSell.map((item, index) => {
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
                          <s.StyledTextBox>
                            <s.TextDescription>Rarity: {item.rarity}</s.TextDescription>
                            <s.TextDescription>Level: {item.level}</s.TextDescription>
                          </s.StyledTextBox>
                          <s.StyledTextBox>
                            <s.TextDescription>#{item.id}</s.TextDescription>
                            <s.TextDescription>
                              Price: {blockchain.web3.utils.fromWei(item.sell,"ether")} ETH
                            </s.TextDescription>
                          </s.StyledTextBox>
                        </s.Container>
                        {blockchain.account === item.currentOwner.toLowerCase() ? (
                          <s.StyledTextBoxPrice>
                            {!loadingBuy &&
                            <s.StyledButtonUnsale
                                disabled={loadingBuy ? 1: 0}
                                onClick={() => {
                                    UnSellTruffle(blockchain.account, item.id);
                                }}
                            >
                                Remove from sale
                            </s.StyledButtonUnsale>
                            }
                            {loadingBuy &&
                            <s.StyledButtonTransfer
                                disabled={loadingBuy ? 1: 0}
                                style={{pointerEvents: "none"}} 
                            >
                            <s.StyledButtonLoadingAction/>
                            </s.StyledButtonTransfer>
                            }
                          </s.StyledTextBoxPrice>
                        ) : (
                          <s.StyledTextBoxPrice>
                            {!loadingBuy &&
                            <s.StyledButtonTransfer
                                disabled={loadingBuy ? 1: 0}
                                onClick={() => {
                                    BuyTruffle(blockchain.account, item.id, blockchain.web3.utils.fromWei(item.sell, "ether"));
                                }}
                            >
                                Buy now
                            </s.StyledButtonTransfer>
                            }
                            {loadingBuy &&
                            <s.StyledButtonTransfer
                                disabled={loadingBuy ? 1: 0}
                                style={{pointerEvents: "none"}} 
                            >
                            <s.StyledButtonLoadingAction/>
                            </s.StyledButtonTransfer>
                            }
                          </s.StyledTextBoxPrice>
                        )}
                      </s.Box>
                    );
                })}
                </s.Container>
            </s.Container>
        </s.Screen>
    )
}

export default Marketplace
