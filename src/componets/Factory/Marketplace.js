import React, { useState, useEffect} from 'react';
import * as s from "../../styles/globalStyles";
import _color from "../../assets/images/bg/_color.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchData} from "../../redux/data/dataActions";

const Marketplace = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    const blockchain = useSelector((state) => state.blockchain);

    const [loadingBuy, setLoadingBuy] = useState(false);
    const [buy, setBuy] = useState();

    //sell
    const BuyTruffle = (_account, _tokenId) => {
        setLoadingBuy(true);
        blockchain.truffleFactory.methods
        .buy( _tokenId)
        .send({
            from: _account,
            value: blockchain.web3.utils.toWei("10","ether"),
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
            <s.Container flex={1} fd={"row"} jc={"center"} style={{ marginTop: "30px"}}>
                <s.InputSearch
                    placeholder="Search..."
                    autofocus
                    required
                />
            </s.Container>
            <s.Container flex={10} fd={"row"} jc={"center"}  ai={"flex-start;"}>
                <s.BoxTab>
                    <s.TextSubTitle >Enter the amount you want to Buy</s.TextSubTitle>
                    <s.Container fd={"row"} ai={"center"} jc={"center"}>
                        <s.InputTransferNumber
                        required
                        placeholder={"Price must be at least 1 wei"} 
                        style={{marginRight: "5px"}}
                        onChange={e => setBuy(e.target.value)}
                        value={buy}
                        />
                        {!loadingBuy &&
                        <s.StyledButtonTransfer
                            disabled={loadingBuy ? 1: 0}
                            onClick={(e) => {
                                BuyTruffle(blockchain.account, buy);
                            }}
                        >
                        Buy
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
                    </s.Container>
                    </s.BoxTab>
                </s.Container>
        </s.Screen>
    )
}

export default Marketplace
