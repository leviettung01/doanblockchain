import { useEffect, useState } from "react";
import * as s from "../../styles/globalStyles";
import _color from "../../assets/images/bg/_color.png";
import { fetchData } from "../../redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TruffleRenderer from "../TruffleRenderer";
import { BiDna } from "react-icons/bi";
import {Link} from "react-router-dom";

const Breed = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
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

    // update 
    useEffect(() => {
        if (blockchain.account !== "" && blockchain.truffleFactory !== null) {
            dispatch(fetchData(blockchain.account));
        }
    }, [blockchain.account, blockchain.truffleFactory, dispatch]);

    return (
        <s.Screen image={_color}>
            <s.Container ai={"center"}>
                <s.TextDescriptionDetail>Breed Truffles</s.TextDescriptionDetail>
                <s.TextDescription>These two lovely truffles will soon be parentsl</s.TextDescription>
                <s.Container fd={"row"} jc={"center"} >
                    <s.ContentBreed>
                        <s.TextDescriptionBreed>Dame</s.TextDescriptionBreed>
                        <s.TextDescriptionBreed>This Truffles will be preggers</s.TextDescriptionBreed>
                        <s.CustomSelect 
                            onChange={e => setItemBreed(e.target.value)}
                        >
                        {data.allOwnerTruffles.map((item) =>
                            <s.CustomOption value={item.id}>{item.id}</s.CustomOption>
                        )}
                        </s.CustomSelect>
                        
                        {itemBreed !== undefined ? (
                        <>
                        {data.allOwnerTruffles.filter(item => item.id === itemBreed).map((item, index)  => (
                        <s.Box key={index} style={{ padding: "15px", marginTop:"15px"}} >
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
                                {parseInt((item.readyTime - Date.now() / 1000) / 3600) !== 0 && parseInt((item.readyTime - Date.now() / 1000) / 3600) > 0 ? (
                                    <s.TextDescription style={{color: "#ffd32a"}}>
                                        Not Ready
                                    </s.TextDescription>
                                    ):(
                                    <s.TextDescription style={{color: "#32ff7e"}}>
                                        Ready breed
                                    </s.TextDescription>
                                )}
                                <s.TextDescription><BiDna/> {item.dna}</s.TextDescription>
                                </s.Container>
                                <s.StyledTextBox>
                                <s.TextDescription>Rarity: {item.rarity}</s.TextDescription>
                                <s.TextDescription>Level: {item.level}</s.TextDescription>
                                </s.StyledTextBox>
                            </s.Container>
                        </s.Box>
                        ))}
                        </>
                        ) : (
                            <s.BoxBreed> 
                                <s.TextDescription>Select your Truffle</s.TextDescription>
                            </s.BoxBreed>
                        )}
                    </s.ContentBreed>
                    <s.ContentBreed>
                        <s.TextDescriptionBreed>Sire</s.TextDescriptionBreed>
                        <s.TextDescriptionBreed>This Truffles will be the sire</s.TextDescriptionBreed>
                        <s.CustomSelect 
                            onChange={e => setItemTarget(e.target.value)}
                        >
                        {data.allOwnerTruffles.map((item) => 
                            <s.CustomOption value={item.id}>{item.id}</s.CustomOption>
                        )}
                        </s.CustomSelect>
                        {itemTarget !== undefined ? (
                        <>
                        {data.allOwnerTruffles.filter(item => item.id === itemTarget ).map((item, index)  => (
                        <s.Box key={index} style={{ padding: "15px", marginTop:"15px"}}>
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
                                {parseInt((item.readyTime - Date.now() / 1000) / 3600) !== 0 && parseInt((item.readyTime - Date.now() / 1000) / 3600) > 0 ? (
                                <s.TextDescription style={{color: "#ffd32a"}}>
                                    Not Ready
                                </s.TextDescription>
                                ):(
                                <s.TextDescription style={{color: "#32ff7e"}}>
                                    Ready breed
                                </s.TextDescription>
                                )}
                                <s.TextDescription><BiDna/> {item.dna}</s.TextDescription>
                                </s.Container>
                                <s.StyledTextBox>
                                <s.TextDescription>Rarity: {item.rarity}</s.TextDescription>
                                <s.TextDescription>Level: {item.level}</s.TextDescription>
                                </s.StyledTextBox>
                            </s.Container>
                        </s.Box>
                        ))}
                        </>
                        ) : (
                            <s.BoxBreed> 
                                <s.TextDescription>Select your Truffle</s.TextDescription>
                            </s.BoxBreed>
                        )}
                    </s.ContentBreed>
                </s.Container>
                <s.TextDescription>Birthing fee: 0.01 ETH</s.TextDescription>
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
