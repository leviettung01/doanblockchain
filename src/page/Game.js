import React, { useState, useEffect, useRef} from 'react';
import * as s from "../styles/globalStyles";
import _camping from "../assets/images/bg/campfire.png";
import camp from "../assets/images/bg/camp.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchData} from "../redux/data/dataActions";
import {Link} from "react-router-dom";
import TruffleRenderer from "../componets/TruffleRenderer";
import { BiDna } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import Confetti from 'react-confetti'

const Game = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const blockchain = useSelector((state) => state.blockchain);
  const [itemCamp, setItemCamp] = useState();
  const [loadingCamp, setLoadingCamp] = useState(false);
  const [loadingShow, setLoadingShow] = useState(false);

  const confettiRef = useRef(null);

  let history = useHistory();

  const CampUpTruffle = (_account, _id) => {
    setLoadingCamp(true);
    setLoadingShow(false);
    blockchain.truffleFactory.methods
      .dailyMission(_id)
      .send({
      from: _account,
    })
    .once("error", (err) => {
      setLoadingCamp(false);
      console.log(err);
    })
    .then((receipt) => {
      setLoadingCamp(false);
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

  return (
    <>
    {/* handShow */}
    <s.Containertoggle 
    ref={confettiRef}
    className={loadingShow === true ? "active-tab" : null}
    >
    <Confetti 
        style={{position: "absolute", top: "-200px", zIndex: 1}}
        recycle={true}
        numberOfPieces={200}
        height={900}
        width={1900}
    />
    <s.ImageToggle image={_camping} />
    <s.TextTitle>
        Congratulations, Your truffle has been trained. click Go to view or Click Close to return.
    </s.TextTitle>
    <s.Container fd={"row"} jc={"center"} ai={"center"} style={{marginTop: "50px"}}>
        <s.StyledButton
            style={{marginRight: "15px"}}
            onClick={() => { history.push("/")}}
        >
            Go to
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
    <s.Screen >
      <s.Container ai={"center"} style={{margin: "1.9rem 0 1rem 0"}}>
          <s.ContainerGame ai={"center"} style={{margin: "5.6rem 0 0 0"}}>
            <s.TextTitleHome>Welcome to the Shroom Scouts Adventure</s.TextTitleHome>
            <s.Container fd={"row"} jc={"space-between"} ai={"center"}>
              {/* img */}
              <s.ContainerGame >
                <s.ImageCamp image={camp}/>
                <s.TextTitleGame>Adventure Story</s.TextTitleGame>
                <s.TextDescriptionGame>
                  As the members of the Magic Truffle Clubhouse started to become 
                  close and share similar experiences within the new biotic universe, 
                  everlasting friendships were formed. Rumors started to circulate 
                  the community that there was more to this realm.</s.TextDescriptionGame>
              </s.ContainerGame>
              <s.ContentBreed jc={"center"} ai={"center"}>
                {/* itemBreed */}
                <s.TextSubTitle>Choose an item to get started</s.TextSubTitle>
                <s.CustomSelect 
                    onChange={e => setItemCamp(e.target.value)}
                >
                {data.allOwnerTruffles.filter(item => item.sell <= 0 && parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0).map((item, index) => 
                    <s.CustomOption key={index} value={item.id}>{item.id}</s.CustomOption>
                )}
                </s.CustomSelect>
                {itemCamp !== undefined ? (
                <>
                {data.allOwnerTruffles.filter(item => item.id === itemCamp).map((item)  => (
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
                {/* button Study */}
                {!loadingCamp && 
                <s.StyledButtonTransfer 
                    style={itemCamp !== undefined ? {marginTop: "15px"} : {pointerEvents: "none", opacity: "0.5", marginTop: "15px"}}
                    disabled={loadingCamp ? 1: 0}
                    onClick={() =>
                        CampUpTruffle(blockchain.account, itemCamp)
                    }
                >
                    Start Camping
                </s.StyledButtonTransfer>
                }
                {loadingCamp &&
                <s.StyledButtonTransfer 
                    style={{marginTop: "20px", pointerEvents: "none"}}
                    disabled={loadingCamp ? 1: 0}
                >
                    <s.StyledButtonLoading/>
                </s.StyledButtonTransfer>
                }
              </s.ContentBreed >
            </s.Container>
            <s.ContainerRarityGame ai={"center"}>
                <s.TextTitleHome>Level up</s.TextTitleHome>
              <s.TextTitleDetails>Success rate depends on rarity</s.TextTitleDetails>
              <s.TextTitleDetails>The higher the level, the shorter the cooldown</s.TextTitleDetails>
              <s.StyledTable>
                  <s.StyledTableContent>
                    <s.TextTableName>Rarity</s.TextTableName>
                    <s.TextTableName>Count</s.TextTableName>
                    <s.TextTableName>Cooldowns</s.TextTableName>
                    <s.TextTableName>Rate</s.TextTableName>
                  </s.StyledTableContent>
                    <tr >
                      <s.TextTableEvent>{'<= 10'}</s.TextTableEvent>
                      <s.TextTableEvent>{'+ 1'}</s.TextTableEvent>
                      <s.TextTableEvent>{'24h'}</s.TextTableEvent>
                      <s.TextTableEvent>{'20%'}</s.TextTableEvent>
                    </tr>
                    <tr >
                      <s.TextTableEvent>{'10 => 30'}</s.TextTableEvent>
                      <s.TextTableEvent>{'+ 1'}</s.TextTableEvent>
                      <s.TextTableEvent>{'24h'}</s.TextTableEvent>
                      <s.TextTableEvent>{'35%'}</s.TextTableEvent>
                    </tr>
                    <tr >
                      <s.TextTableEvent>{'31 => 50'}</s.TextTableEvent>
                      <s.TextTableEvent>{'+ 1'}</s.TextTableEvent>
                      <s.TextTableEvent>{'24h'}</s.TextTableEvent>
                      <s.TextTableEvent>{'40%'}</s.TextTableEvent>
                    </tr>
                    <tr >
                      <s.TextTableEvent>{'51 => 70'}</s.TextTableEvent>
                      <s.TextTableEvent>{'+ 1'}</s.TextTableEvent>
                      <s.TextTableEvent>{'24h'}</s.TextTableEvent>
                      <s.TextTableEvent>{'45%'}</s.TextTableEvent>
                    </tr>
                    <tr >
                      <s.TextTableEvent>{'71 => 90'}</s.TextTableEvent>
                      <s.TextTableEvent>{'+ 1'}</s.TextTableEvent>
                      <s.TextTableEvent>{'24h'}</s.TextTableEvent>
                      <s.TextTableEvent>{'60%'}</s.TextTableEvent>
                    </tr>
                    <tr >
                      <s.TextTableEvent>{'> 91'}</s.TextTableEvent>
                      <s.TextTableEvent>{'+ 1'}</s.TextTableEvent>
                      <s.TextTableEvent>{'24h'}</s.TextTableEvent>
                      <s.TextTableEvent>{'70%'}</s.TextTableEvent>
                    </tr>
                </s.StyledTable>
            </s.ContainerRarityGame>
          </s.ContainerGame>        
      </s.Container>
    </s.Screen>
    </>
  )
}

export default Game
