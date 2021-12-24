import { useEffect, useState, useRef} from "react";
import * as s from "../styles/globalStyles";
import _bg from "../assets/images/bg/_bg.png"
import _breed from "../assets/images/bg/breed.png";
import { fetchData } from "../redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TruffleRenderer from "../componets/TruffleRenderer";
import { BiDna } from "react-icons/bi";
import {Link} from "react-router-dom";

const Breed = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [itemBreed, setItemBreed] = useState();
    const [itemTarget, setItemTarget] = useState();

    const [loadingBreed, setLoadingBreed] = useState(false);
    const [loadingShow, setLoadingShow] = useState(false);
    
    let history = useHistory();

    const confettiRef = useRef(null);

    //Breed
    const breedFee = (data.breedFee / 1000000000000000000).toString();
    const Breeding = (_account, _id, _targetId) => {
        setLoadingBreed(true);
        setLoadingShow(false);
        blockchain.truffleFactory.methods
          .BreedAndMultiply(_id, _targetId)
          .send({
            from: _account,
            value: blockchain.web3.utils.toWei(breedFee, "ether"),
          })
        .once("error", (err) => {
        setLoadingBreed(false);
        console.log(err);
        })
        .then((receipt) => {
          setLoadingBreed(false);
          console.log(receipt);
          dispatch(fetchData(blockchain.account));
          setLoadingShow(true);
        });
    };

    // update 
    useEffect(() => {
        if (blockchain.account !== "" && blockchain.truffleFactory !== null) {
            dispatch(fetchData(blockchain.account));
        }
    }, [blockchain.account, blockchain.truffleFactory, dispatch]);
    const newTruffle = data.allOwnerTruffles.filter(item => item.id >= (data.allTruffles.length - 1)).map(item => item.id)
    return (
        <>
        {/* handShow */}
        <s.Containertoggle 
            ref={confettiRef}
            className={loadingShow === true ? "active-tab" : null}
        >
        <s.ImageToggleBreed image={_breed} />
        <s.TextTitle>
            Congratulations, you have breeding a new breed.
        </s.TextTitle>
        <s.Container fd={"row"} jc={"center"} ai={"center"} style={{marginTop: "50px"}}>
            <s.StyledButton
                style={{marginRight: "15px"}}
                onClick={() => { history.push(`/details/${newTruffle}`)}}
            >
                View
            </s.StyledButton>
            <s.StyledButtonBreedShow
                onClick={() => {
                setLoadingShow(false);
                }}
            >
                Close
            </s.StyledButtonBreedShow>
        </s.Container>
        </s.Containertoggle>
        <s.Screen image={_bg} className={loadingShow === true ? "blur" : null}>
            <s.Container ai={"center"} style={{margin: "1.9rem 0 1rem 0"}}>
                <s.ContainerBreed ai={"center"} style={{margin: "5.6rem 0 0 0"}}>
                    <s.TextDescriptionDetail>Breeding</s.TextDescriptionDetail>
                    <s.ContainerBreed fd={"row"} jc={"center"} ai={"center"}>
                        <s.ContentBreed jc={"center"} ai={"center"}>
                            {/* itemBreed */}
                            <s.TextDescriptionBreed>Dame</s.TextDescriptionBreed>
                            <s.TextSubTitle>This Truffles will be preggers</s.TextSubTitle>
                            <s.CustomSelect 
                                onClick={e => setItemBreed(e.target.value)}
                            >
                            {data.allOwnerTruffles.filter(item => item.sell <= 0 && parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0).map((item, index) => 
                                <s.CustomOption key={index} value={item.id}>{item.id}</s.CustomOption>
                            )}
                            </s.CustomSelect>
                            {itemBreed !== undefined ? (
                            <>
                            {data.allOwnerTruffles.filter(item => item.id === itemBreed).map((item)  => (
                            <s.Box key={item.id} style={{ padding: "18px", margin:"15px 0 0 0"}}>
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
                            </s.ContentBreed >
                            {/* target */}
                            <s.ContentBreed jc={"center"} ai={"center"}>
                            <s.TextDescriptionBreed>Sire</s.TextDescriptionBreed>
                            <s.TextSubTitle>This Truffles will be the sire</s.TextSubTitle>
                            <s.CustomSelect 
                                onClick={e => setItemTarget(e.target.value)}
                            >
                            {data.allOwnerTruffles.filter(item => item.sell <= 0 && parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0).map((item, index) => 
                                <s.CustomOption key={index} value={item.id}>{item.id}</s.CustomOption>
                            )}
                            </s.CustomSelect>
                            {itemTarget !== undefined ? (
                            <>
                            {data.allOwnerTruffles.filter(item => item.id === itemTarget).map((item)  => (
                            <s.Box key={item.id} style={{ padding: "18px", margin:"15px 0 0 0"}}>
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
                    </s.ContainerBreed>
                    {/* button breed */}
                    {itemBreed === itemTarget && itemBreed !== undefined && itemTarget !== undefined ?(
                        <s.TextDescription style={{color: "#eb4d4b", lineHeight: "0"}}>Breeds cannot be the same</s.TextDescription>
                    ): (
                        <s.TextDescription style={{color: "#eb4d4b", opacity: "0", lineHeight: "0"}}>Breeds cannot be the same</s.TextDescription>
                    )}
                    <s.TextDescription>Birthing fee: 0.01 BSC</s.TextDescription>
                    {!loadingBreed && 
                    <s.StyledButtonTransfer 
                        style={itemBreed !== itemTarget ? {} : {pointerEvents: "none", opacity: "0.5"}}
                        disabled={loadingBreed ? 1: 0}
                        onClick={() =>
                            Breeding(blockchain.account, itemBreed, itemTarget)
                        }
                    >
                        Start Breeding
                    </s.StyledButtonTransfer>
                    }
                    {loadingBreed &&
                    <s.StyledButtonTransfer 
                        style={{pointerEvents: "none"}}
                        disabled={loadingBreed ? 1: 0}
                    >
                        <s.StyledButtonLoading/>
                    </s.StyledButtonTransfer>
                    }
                </s.ContainerBreed>
   
            </s.Container>
        </s.Screen>
        <s.Screen style={{backgroundColor: "#1A1A22"}}>
            <s.Container ai={"center"}>
                {/* breed */}
                <s.ContainerHome  ai={"center"} style={{marginTop: "30px", padding: "15px"}}>
                <s.TextTitleHomev3>Breeding</s.TextTitleHomev3>
                <s.Container ai={"flex-start"}>
                    <s.TextTitleDetails>The success rate depends on the rarity of Dad and Mom.</s.TextTitleDetails>
                </s.Container>
                <s.StyledTable>
                    <s.StyledTableContent>
                        <s.TextTableName>Rarity</s.TextTableName>
                        <s.TextTableName>Count</s.TextTableName>
                        <s.TextTableName>Rate</s.TextTableName>
                    </s.StyledTableContent>
                        <tr >
                        <s.TextTableEvent>{'0 => 30'}</s.TextTableEvent>
                        <s.TextTableEvent>{'random(10)'}</s.TextTableEvent>
                        <s.TextTableEvent>{'50%'}</s.TextTableEvent>
                        </tr>
                        <tr >
                        <s.TextTableEvent>{'30 => 60'}</s.TextTableEvent>
                        <s.TextTableEvent>{'random(10)'}</s.TextTableEvent>
                        <s.TextTableEvent>{'45%'}</s.TextTableEvent>
                        </tr>
                        <tr >
                        <s.TextTableEvent>{'0 => 30 & 30 => 60'}</s.TextTableEvent>
                        <s.TextTableEvent>{'random(10)'}</s.TextTableEvent>
                        <s.TextTableEvent>{'40%'}</s.TextTableEvent>
                        </tr>
                        <tr >
                        <s.TextTableEvent>{'60 => 99'}</s.TextTableEvent>
                        <s.TextTableEvent>{'random(8)'}</s.TextTableEvent>
                        <s.TextTableEvent>{'30%'}</s.TextTableEvent>
                        </tr>
                        <tr >
                        <s.TextTableEvent>{'0 => 60 & 60 => 99'}</s.TextTableEvent>
                        <s.TextTableEvent>{'random(7)'}</s.TextTableEvent>
                        <s.TextTableEvent>{'20%'}</s.TextTableEvent>
                        </tr>
                    </s.StyledTable>
                </s.ContainerHome> 
                {/* cooldown    */}
                <s.ContainerHome ai={"center"} style={{marginTop: "30px", padding: "15px"}}>
                    <s.TextTitleHomev3>Cooldown</s.TextTitleHomev3>
                    <s.Container ai={"flex-start"}>
                        <s.TextTitleDetails>Each level reduces cooldown by 30 minutes. </s.TextTitleDetails>
                    </s.Container>
                    <s.StyledTable>
                    <s.StyledTableContent>
                        <s.TextTableName>Rarity</s.TextTableName>
                        <s.TextTableName>Cooldown</s.TextTableName>
                    </s.StyledTableContent>
                        <tr >
                        <s.TextTableEvent>{'0 => 49'}</s.TextTableEvent>
                        <s.TextTableEvent>{'24h'}</s.TextTableEvent>
                        </tr>
                        <tr >
                        <s.TextTableEvent>{'50 => 74'}</s.TextTableEvent>
                        <s.TextTableEvent>{'18h'}</s.TextTableEvent>
                        </tr>
                        <tr >
                        <s.TextTableEvent>{'75 => 99'}</s.TextTableEvent>
                        <s.TextTableEvent>{'12h'}</s.TextTableEvent>
                        </tr>
                    </s.StyledTable>
                </s.ContainerHome>   
            </s.Container>
        </s.Screen>
        </>
    )
}

export default Breed
