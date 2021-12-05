import React, { useEffect , useState} from 'react';
import * as s from "../../styles/globalStyles";
import TruffleRenderer from "../TruffleRenderer";
import { BiDna} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData} from "../../redux/data/dataActions";
import { removeData } from '../../redux/data/dataActions';
import _bg from "../../assets/images/bg/_color.png";
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";

const Details = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const blockchain = useSelector((state) => state.blockchain);
  const [loading, setLoading] = useState(false);
  const [loadingTabUpdate, setLoadingTabUpdate] = useState(false);
  const [loadingTabTransfer, setLoadingTabTransfer] = useState(false);
  const [loadingTabSell, setLoadingTabSell] = useState(false);
  const [loadingUnSell, setLoadingUnSell] = useState(false);
  const { id } = useParams();

  const [toggleState, setToggleState] = useState(1);
  const [sell, setSell] = useState();
  const [name, setName] = useState('');
  const [transfer, setTransfer] = useState();

  let history = useHistory();

  const [timerDays,setTimerDays] = useState(0);
  const [timerHours,setTimerHours] = useState(0);
  const [timerMinutes,setTimerMinutes] = useState(0);
  const [timerSeconds,setTimerSeconds] = useState(0);

  const [Endurance, setEndurance] = useState(0);

  //toggleTab
  const toggleTab = (index) => {
    setToggleState(index);
  }

  //cooldowns
  useEffect(() => {
    const Rarity  = data.allOwnerTruffles.filter(item => item.id === id ).map(result => 
      result.rarity
    )

    const levelUp  = data.allOwnerTruffles.filter(item => item.id === id ).map(result => 
      result.level
    )

    if(Rarity < 50 && levelUp <=0 ) 
      setEndurance(24)
    else if(Rarity < 50 && levelUp > 0 )
      setEndurance(24 - (0.5*levelUp))  
    else if(Rarity >= 50 && Rarity < 75 )
      setEndurance(18)
    else if(Rarity >= 50 && Rarity < 75 && levelUp > 0)
      setEndurance(18 - (0.5*levelUp))
    else if(Rarity >= 75)
      setEndurance(12)
    else if(Rarity >= 75 && levelUp > 0)
    setEndurance(12 - (0.5*levelUp))
  },[data.allOwnerTruffles, id])


  useEffect(() => {
    const startCouterTimer = setInterval(() => {
      const seconds  = data.allOwnerTruffles.filter(item => item.id === id ).map(result =>
        // console.log(parseInt(result.readyTime - Date.now() /1000))
        parseInt(result.readyTime - Date.now() / 1000)
      )

      var remaining = {hours: 0, minutes: 0, seconds: 0 };
      if (seconds < 0) return remaining;

      const minutes = `0${Math.floor(seconds / 60)}`;
      const hours = `0${Math.floor(minutes / 60)}`;
      const days = `0${Math.floor(hours / 24)}`;

      remaining.days = days;
      remaining.hours = hours - remaining.days * 24;
      remaining.minutes = minutes - remaining.days * 24 * 60 - remaining.hours * 60;
      remaining.seconds = seconds - remaining.days * 24 * 60 * 60 - remaining.hours * 60 * 60 - remaining.minutes * 60;

      setTimerDays(remaining.days)
      setTimerHours(remaining.hours)
      setTimerMinutes(remaining.minutes)
      setTimerSeconds(remaining.seconds)
    }, 1000);

    return () => {
      clearInterval(startCouterTimer);
    }
  },)

  // levelUpTruffle
  const levelUpTruffle = (_account, _id) => {
      setLoading(true);
      blockchain.truffleFactory.methods
        .levelUp(_id)
        .send({
        from: _account,
        value: blockchain.web3.utils.toWei("0.001", "ether"),
      })
      .once("error", (err) => {
      setLoading(false);
      console.log(err);
      })
      .then((receipt) => {
      setLoading(false);
      console.log(receipt);
      dispatch(fetchData(blockchain.account));
    });
  };

  //sell
  const sellTruffle = (_account, _tokenId, _price) => {
    setLoadingTabSell(true);
    blockchain.truffleFactory.methods
      .allowBuy( _tokenId, _price)
      .send({
      from: _account,
      value: blockchain.web3.utils.toWei("0.001","ether")
    })
    .once("error", (err) => {
    setLoadingTabSell(false);
    console.log(err);
    })
    .then((receipt) => {
    setLoadingTabSell(false);
    console.log(receipt);
    dispatch(fetchData(blockchain.account));
    });
  }

    //unsell
    const UnSellTruffle = (_account, _tokenId) => {
      setLoadingUnSell(true);
      blockchain.truffleFactory.methods
      .disallowBuy( _tokenId)
      .send({
          from: _account,
      })
      .once("error", (err) => {
      setLoadingUnSell(false);
      console.log(err);
      })
      .then((receipt) => {
      setLoadingUnSell(false);
      console.log(receipt);
      dispatch(fetchData(blockchain.account));
      });
    }

  //updateNameZombie
  const updateNameTruffle = (_account, _id, _newName ) => {
    setLoadingTabUpdate(true);
    blockchain.truffleFactory.methods
      .updateName(_id, _newName)
      .send({
      from: _account,
    })
    .once("error", (err) => {
      setLoadingTabUpdate(false);
      console.log(err);
    })
    .then((receipt) => {
      setLoadingTabUpdate(false);
      console.log(receipt);
      dispatch(fetchData(blockchain.account));
    });
  };

  //transfer
  const transferToken = (_account, _from, _to, _tokenId) => {
    setLoadingTabTransfer(true);
    blockchain.truffleFactory.methods
      .safeTransferFrom( _from, _to, _tokenId)
      .send({
        from: _account,
      })
    .once("error", (err) => {
    setLoadingTabTransfer(false);
    console.log(err);
    })
    .then((receipt) => {
      setLoadingTabTransfer(false);
      console.log(receipt);
      dispatch(fetchData(blockchain.account));
      history.push("/");
    });
  };

  useEffect(() => {
    if(id && id !== "") 
    dispatch(fetchData(blockchain.account))
    return () => {
      dispatch(removeData())
    }
  }, [blockchain.account, dispatch, id])

  return (
      <s.Screen image={_bg}>
        {data.allTruffles.filter(item => item.id === id ).map((item)  => (
          <s.Container 
            key={item.id} 
            ai={"center"}
            style={{ margin:"74px 0px 50px 0px"}}
          >
            <s.ContainerDetails>
            <s.StyledTextBoxNameDetails>
              <s.TextDescriptionDetail>
                Truffles ID: {item.id}
              </s.TextDescriptionDetail>
            </s.StyledTextBoxNameDetails>
            <s.Container jc={"space-between"} ai={"flex-start"} fd={"row"}> 
              <s.StyledImgDetails>       
                  <TruffleRenderer truffle={item} style={{height: "400px", with: "400px"}} />
              </s.StyledImgDetails>
   
              <s.BoxDetails>
                  <s.TextTitle>{item.name}</s.TextTitle>  
                <s.TextTitleDetails><BiDna/> {item.dna}</s.TextTitleDetails> 
                <s.TextDescription>DadID: {item.dadId}</s.TextDescription>
                <s.TextDescription>MumID: {item.mumId}</s.TextDescription>
                <s.BoxTimerCouter>
                  {timerDays !== 0 && timerHours !== 0 && timerMinutes !== 0 && timerSeconds !== 0 ? (
                    <s.TextTitle style={{color: "#ffd32a"}}>
                        {timerHours}h{timerMinutes}m{timerSeconds}s
                    </s.TextTitle>
                  ) : (
                    <s.TextTitle style={{color: "#e96bd4"}}>
                      Breed Ready
                    </s.TextTitle>
                  )}
                </s.BoxTimerCouter>
                <s.StyledTextBoxAround>
                  <s.TextTitleDetails>Rarity</s.TextTitleDetails>
                  <s.TextTitleDetails>Endurance </s.TextTitleDetails>
                  <s.TextTitleDetails>Level</s.TextTitleDetails>
                </s.StyledTextBoxAround>
                <s.StyledTextBoxAround >
                  <s.TextTitle>{item.rarity}</s.TextTitle>
                  <s.TextTitle>{Endurance} Hrs</s.TextTitle>
                  <s.TextTitle>{item.level}</s.TextTitle>
                </s.StyledTextBoxAround>
                <s.Container ai={"center"} jc={"space-around"} fd={"row"}>
                    <s.StyledButtonAction style={{marginRight: "15px"}}
                    >
                      <a href="/breed"> Breed</a>
                    </s.StyledButtonAction>
                  {!loading &&
                  <s.StyledButtonAction 
                    disabled={loading ? 1: 0}
                    style={parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0 && item.sell <= 0 ? {} : {pointerEvents: "none", opacity: "0.5"}} 
                    onClick={(e) => {
                      e.preventDefault();
                      levelUpTruffle(blockchain.account, item.id);
                    }}
                  >
                    Level Up
                  </s.StyledButtonAction>
                  }
                  {loading && 
                  <s.StyledButtonAction 
                    style={{pointerEvents: "none"}}
                    disabled={loading ? 1: 0}
                  >
                    <s.StyledButtonLoading/>
                  </s.StyledButtonAction>
                  }
                </s.Container>
              </s.BoxDetails>
            </s.Container>
            {/* {test} */}
                {/* {console.log(item.dadId)}
              <s.Container jc={"center"}  style={{flexWrap: "wrap"}}>
                    {data.allTruffles.filter(item => item.id === item.dadId).map((item) => {
                      return (
                        <s.Box key={item.id} style={{ padding: "15px", margin:"15px"}}>
                          <s.StyledImg>
                            <Link to={`/details/${item.id}`} >
                              <TruffleRenderer truffle={item}/>
                            </Link>
                          </s.StyledImg>
                        </s.Box>
                      );
                    })}
                  </s.Container> 
                  <s.Container jc={"center"}style={{flexWrap: "wrap"}}>
                    {data.allTruffles.filter(item => item.id === item.mumId).map((item) => {
                      return (
                        <s.Box key={item.id} style={{ padding: "15px", margin:"15px"}}>
                          <s.StyledImg>
                            <Link to={`/details/${item.id}`} >
                              <TruffleRenderer truffle={item}/>
                            </Link>
                          </s.StyledImg>
                        </s.Box>
                      );
                    })}
                  </s.Container>  */}
            {/* Tabbar    */}
            <s.SpacerSuperLarge/>
            <s.Container ai={"center"}>
              <s.MenuTabs >
                <s.Tabs 
                  className={toggleState === 1 ? "active-tab" : null}
                  onClick={() => toggleTab(1)}
                >
                  Sell
                </s.Tabs>
                <s.Tabs 
                  className={toggleState === 2 ? "active-tab" : null}
                  onClick={() => toggleTab(2)}
                >
                  Update
                </s.Tabs>
                <s.Tabs 
                  className={toggleState === 3 ? "active-tab" : null}
                  onClick={() => toggleTab(3)}
                >
                  Transfer
                </s.Tabs>
              </s.MenuTabs>
            </s.Container>
              {toggleState === 1 ? (  
              <s.Container  ai={"center"} style={{marginTop: "6rem"}}>
                <s.BoxTab>
                  {data.allOwnerTruffles.filter(item => item.id === id ).map(result => result.sell) <= 0 ? (
                    <>
                    <s.TextSubTitleDetail>Enter the amount you want to sell (ETH)</s.TextSubTitleDetail>
                    <s.Container fd={"row"} ai={"center"} jc={"center"}>
                        <s.InputTransferNumber
                          required
                          placeholder={"Price must be at least 1 wei"} 
                          style={{marginRight: "10px"}}
                          onChange={e => setSell(e.target.value)}
                          value={sell}
                        />
                      <s.Container>
                      {!loadingTabSell &&
                      <s.StyledButtonTransfer
                          disabled={loadingTabSell ? 1: 0}
                          style={parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0 ? {} : {pointerEvents: "none", opacity: "0.5"}} 
                          onClick={() => {
                            sellTruffle(blockchain.account, item.id, blockchain.web3.utils.toWei(sell, "ether"));
                            setSell('');
                          }}
                      >
                        Sell
                      </s.StyledButtonTransfer>
                      }
                      {loadingTabSell &&
                      <s.StyledButtonTransfer
                          disabled={loadingTabSell ? 1: 0}
                          style={{pointerEvents: "none"}} 
                      >
                        <s.StyledButtonLoading/>
                      </s.StyledButtonTransfer>
                      }
                      </s.Container>
                    </s.Container>
                    </>
                  ) : (
                    <s.Container fd={"column"} ai={"center"} jc={"center"}>
                      <s.TextTitle>The product has been sold on the Market !</s.TextTitle>
                      <s.TextTitle>Click the button below to Remove from sale</s.TextTitle>
                      {!loadingUnSell &&
                      <s.StyledButtonUnsale
                          disabled={loadingTabSell ? 1: 0}
                          onClick={() => {
                            UnSellTruffle(blockchain.account, item.id);
                          }}
                      >
                        Remove from sale
                      </s.StyledButtonUnsale>
                      }
                      {loadingUnSell &&
                      <s.StyledButtonUnsale
                          disabled={loadingUnSell ? 1: 0}
                          style={{pointerEvents: "none"}} 
                      >
                        <s.StyledButtonLoading/>
                      </s.StyledButtonUnsale>
                      }
                    </s.Container>
                  )}
                </s.BoxTab>
              </s.Container>
              ): (null)}
              {toggleState === 2 ? (
              <s.Container  flex={1} fd={"column"} ai={"center"}  style={{marginTop: "6rem"}}>
                <s.BoxTab>
                  <s.TextSubTitleDetail>Change this truffle name</s.TextSubTitleDetail>
                  <s.Container  fd={"row"} ai={"center"} jc={"center"}>
                    <s.InputTransfer 
                      required
                      placeholder={"Bob"} 
                      style={{marginRight: "10px"}}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    {!loadingTabUpdate &&
                    <s.StyledButtonTransfer
                        disabled={loadingTabUpdate ? 1: 0}
                        style={item.level >= 2 && item.sell <= 0 && parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0 ? {} : {pointerEvents: "none", opacity: "0.5"}}
                        onClick={() => {
                          updateNameTruffle(blockchain.account, item.id, name);
                          setName('');
                        }}
                    >
                      Update
                    </s.StyledButtonTransfer>
                    }
                    {loadingTabUpdate &&
                    <s.StyledButtonTransfer
                        disabled={loadingTabUpdate ? 1: 0}
                        style={{pointerEvents: "none"}} 
                    >
                      <s.StyledButtonLoading/>
                    </s.StyledButtonTransfer>
                    }
                  </s.Container>
                </s.BoxTab>
              </s.Container>
              ): (null)}
              {toggleState === 3 ? (
              <s.Container  ai={"center"} style={{marginTop: "6rem"}}>
                <s.BoxTab>
                  <s.TextSubTitleDetail>Transfer this Truffle to someone</s.TextSubTitleDetail>
                  <s.Container  fd={"row"} ai={"center"} jc={"center"}>
                    <s.InputTransfer 
                      placeholder={"0x92Da0E5C9D58AcCDCA6E280a2F632B23D9aA0705"} 
                      style={{marginRight: "10px"}}
                      value={transfer}
                      required
                      onChange={(e) => 
                        setTransfer(e.target.value)}
                    />
                    {!loadingTabTransfer &&
                    <s.StyledButtonTransfer
                      disabled={loadingTabTransfer ? 1: 0}
                      style={parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0 && item.sell <= 0 ? {marginRight: "5px"} : {marginRight: "5px", pointerEvents: "none", opacity: "0.5"}} 
                      onClick={() => {
                        transferToken(blockchain.account, blockchain.account, transfer, item.id);
                        setTransfer('');
                      }}
                    >
                      Transfer
                    </s.StyledButtonTransfer>
                    }
                    {loadingTabTransfer &&
                    <s.StyledButtonTransfer
                      disabled={loadingTabTransfer ? 1: 0}
                      style={{pointerEvents: "none"}} 
                    >
                      <s.StyledButtonLoading/>
                    </s.StyledButtonTransfer>
                    }
                  </s.Container>
                </s.BoxTab>
              </s.Container>
              ): (null)}
              </s.ContainerDetails>
            </s.Container>
        ))}
      </s.Screen>
  );
};

export default Details;