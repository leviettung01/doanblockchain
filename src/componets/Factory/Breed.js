import { useEffect, useState } from "react";
import * as s from "../../styles/globalStyles";
import _bg from "../../assets/images/bg/_color.png";
import { fetchData } from "../../redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TruffleRenderer from "../TruffleRenderer";
import { BiDna } from "react-icons/bi";
import {Link} from "react-router-dom";
import ToggleShowBreed from "../ToggleShowBreed";

const Breed = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [itemBreed, setItemBreed] = useState();
    const [itemTarget, setItemTarget] = useState();

    const [loadingBreed, setLoadingBreed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    let history = useHistory();

    const openModal = () => {
        setShowModal(prev => !prev)
    }

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
    
    console.log(itemBreed !== itemTarget)

    return (
        <s.Screen image={_bg}>
            <s.Container ai={"center"} style={{margin: "5.6rem 0"}}>
                <s.TextDescriptionDetail>Breed Truffles</s.TextDescriptionDetail>
                <s.TextTitle>These two lovely truffles will soon be parentsl</s.TextTitle>
                <s.Container fd={"row"} jc={"center"} >
                    <s.ContentBreed>
                        <s.TextDescriptionBreed>Dame</s.TextDescriptionBreed>
                        <s.TextDescriptionBreed>This Truffles will be preggers</s.TextDescriptionBreed>
                        {/* <s.CustomSelect 
                            onChange={(e) => 
                                setItemBreed(e.target.value)}
                        >
                        {data.allOwnerTruffles.filter(item => item.sell <= 0 && parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0 ).map((item) =>
                            <s.CustomOption value={item.id}>{item.id}</s.CustomOption>
                        )}
                        </s.CustomSelect> */}
                        
                        {itemBreed !== undefined ? (
                        <>
                        {data.allOwnerTruffles.filter(item => item.id === itemBreed).map((item)  => (
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
                        </>
                        ) : (
                            <s.BoxBreed > 
                                <s.TextDescription>Select your Truffle</s.TextDescription>
                            </s.BoxBreed >
                        )}
                        <s.StyledButtonAction onClick={openModal}>Open</s.StyledButtonAction>
                        <ToggleShowBreed data={data.allOwnerTruffles} showModal={showModal} setShowModal={setShowModal} setItemBreed={setItemBreed}>
                            <s.StyledButtonAction>Selected</s.StyledButtonAction>
                        </ToggleShowBreed>
                    </s.ContentBreed>
                    <s.ContentBreed>
                        <s.TextDescriptionBreed>Sire</s.TextDescriptionBreed>
                        <s.TextDescriptionBreed>This Truffles will be the sire</s.TextDescriptionBreed>
                        {/* <s.CustomSelect 
                            onChange={e => setItemTarget(e.target.value)}
                        >
                        {data.allOwnerTruffles.filter(item => item.sell <= 0 && parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0).map((item, index) => 
                            <s.CustomOption key={index} value={item.id}>{item.id}</s.CustomOption>
                        )}
                        </s.CustomSelect> */}
                        {itemTarget !== undefined ? (
                        <>
                        {data.allOwnerTruffles.filter(item => item.id === itemTarget).map((item)  => (
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
                        </>
                        ) : (
                            <s.BoxBreed> 
                                <s.TextDescription>Select your Truffle</s.TextDescription>
                            </s.BoxBreed>
                        )}
                    </s.ContentBreed>
                </s.Container>
                {itemBreed === itemTarget && itemBreed !== undefined && itemTarget !== undefined ?(
                    <s.TextTitle style={{color: "#eb4d4b"}}>Breeds cannot be the same</s.TextTitle>
                ): (
                    null
                )}
                <s.TextDescription>Birthing fee: 0.01 ETH</s.TextDescription>
                {!loadingBreed && 
                <s.StyledButtonTransfer 
                    style={itemBreed !== itemTarget ? {marginTop: "20px"} : {marginTop: "20px", pointerEvents: "none", opacity: "0.5"}}
                    disabled={loadingBreed ? 1: 0}
                    onClick={() =>
                        Breeding(blockchain.account, itemBreed, itemTarget)
                    }
                >
                    start breeding
                </s.StyledButtonTransfer>
                }
                {loadingBreed &&
                <s.StyledButtonTransfer 
                    style={{marginTop: "20px", pointerEvents: "none"}}
                    disabled={loadingBreed ? 1: 0}
                >
                    <s.StyledButtonLoading/>
                </s.StyledButtonTransfer>
                }
            </s.Container>
        </s.Screen>
    )
}

export default Breed
