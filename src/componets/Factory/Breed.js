import React, { useState } from 'react';
import * as s from "../../styles/globalStyles";
import _color from "../../assets/images/bg/_color.png";
import { fetchData } from "../../redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Breed = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const [itemBreed, setItemBreed] = useState();
    const [itemTarget, setItemTarget] = useState();

    const [loadingBreed, setLoadingBreed] = useState(false);
    let history = useHistory();
    //Breed
    const Breeding = (_account, _id, _targetId) => {
        setLoadingBreed(true);
        blockchain.truffleFactory.methods
          .BreedAndMultiply(_id, _targetId)
          .send({
            from: _account,
            value: blockchain.web3.utils.toWei("0.01", "ether"),
          })
        .once("error", (err) => {
        setLoadingBreed(false);
        console.log(err);
        })
        .then((receipt) => {
          setLoadingBreed(false);
          console.log(receipt);
          dispatch(fetchData(blockchain.account));
          history.push("/");
        });
      };

    return (
        <s.Screen image={_color}>
            <s.Container ai={"center"}>
                <s.TextDescriptionDetail>Breed Truffles</s.TextDescriptionDetail>
                <s.TextDescription>these two lovely truffles will soon be parentsl</s.TextDescription>
                <s.Container fd={"row"} jc={"center"} >
                    <s.ContentBreed>
                        <s.TextDescriptionBreed>Dame</s.TextDescriptionBreed>
                        <s.TextDescriptionBreed>this Truffles will be preggers</s.TextDescriptionBreed>
                        <s.BoxBreed
                            placeholder={"Select your Truffle"}
                            onChange={e => setItemBreed(e.target.value)}
                            value={itemBreed}
                            required
                        /> 
                    </s.ContentBreed>
                    <s.ContentBreed>
                        <s.TextDescriptionBreed>Sire</s.TextDescriptionBreed>
                        <s.TextDescriptionBreed>this Truffles will be the sire</s.TextDescriptionBreed>
                        <s.BoxBreed
                            placeholder={"Select your Truffle"}
                            onChange={e => setItemTarget(e.target.value)}
                            value={itemTarget}
                            required
                        />
                    </s.ContentBreed>
                </s.Container>
                <s.TextDescription>Birthing fee: 0.1 ETH</s.TextDescription>
                {!loadingBreed && 
                <s.StyledButtonTransfer style={{marginTop: "20px"}}
                    disabled={loadingBreed ? 1: 0}
                    onClick={() =>
                        Breeding(blockchain.account, itemBreed, itemTarget)
                    }
                >
                    start breeding
                </s.StyledButtonTransfer>
                }
                {loadingBreed &&
                <s.StyledButtonTransfer style={{marginTop: "20px"}}
                    disabled={loadingBreed ? 1: 0}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    style={{pointerEvents: "none"}}
                >
                    <s.StyledButtonLoadingAction/>
                </s.StyledButtonTransfer>
                }
                {/* <s.ShowItems>
                    <s.ShowContent></s.ShowContent>
                </s.ShowItems> */}
            </s.Container>
        </s.Screen>
    )
}

export default Breed
