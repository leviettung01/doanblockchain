import React, { useEffect , useState, useRef} from 'react';
import * as s from "../styles/globalStyles";
import TruffleRenderer from "../componets/TruffleRenderer";
import { BiDna} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData} from "../redux/data/dataActions";
import { removeData } from '../redux/data/dataActions';
import _color from "../assets/images/bg/_color.png";
import { RiWallet3Line } from "react-icons/ri";
import { BiArrowBack } from 'react-icons/bi';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
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
  const [loadingChangPrice, setLoadingChangPrice] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);

  const [loadingShow, setLoadingShow] = useState(false);
  const [loadingShowRemove, setLoadingShowRemove] = useState(false);
  const [loadingShowUpdatePrice, setLoadingShowUpdatePrice] = useState(false);
  const [loadingShowBuy, setLoadingShowBuy] = useState(false);
  const [loadingShowLevelup, setLoadingShowLevelup] = useState(false);
  const [loadingShowUpdateName, setLoadingShowUpdateName] = useState(false);
  const [loadingShowTransfer, setLoadingShowTransfer] = useState(false);

  const { id } = useParams();
  //toggerState
  const [toggleState, setToggleState] = useState(1);
  const [sell, setSell] = useState('');
  const [name, setName] = useState('');
  const [transfer, setTransfer] = useState('');

  let history = useHistory();

  const [timerDays,setTimerDays] = useState(0);
  const [timerHours,setTimerHours] = useState(0);
  const [timerMinutes,setTimerMinutes] = useState(0);
  const [timerSeconds,setTimerSeconds] = useState(0);

  const [Endurance, setEndurance] = useState(0);

  const confettiRef = useRef(null);

  //toggleTab
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const DadId = data.allTruffles.filter(item => item.id === id).map(result => result.dadId)
  const MumId = data.allTruffles.filter(item => item.id === id).map(result => result.mumId)
  const Children = data.allTruffles.filter(item => item.dadId === id || item.mumId === id).map(result => result.id)

  useEffect(() => {
    const Gen  = data.allOwnerTruffles.filter(item => item.id === id && item).map(result => 
      result.gen0
    )

    const levelUp  = data.allOwnerTruffles.filter(item => item.id === id ).map(result => 
      result.level
    )

    if(Gen == 0 && levelUp <= 0 ) 
      setEndurance(8)
    else if(Gen == 0 && levelUp > 0 )
      setEndurance(8 - (0.5*levelUp))  
    else if(Gen > 0 && Gen <= 5 && levelUp <= 0)
      setEndurance(12)
    else if(Gen > 0 && Gen <= 5 && levelUp > 0)
      setEndurance(12 - (0.5*levelUp))
    else if(Gen > 5 && Gen <= 10 && levelUp <= 0)
      setEndurance(24)
    else if(Gen > 5 && Gen <= 10 && levelUp > 0)
      setEndurance(24 - (0.5*levelUp))
    else if(Gen > 10 && levelUp <= 0)
      setEndurance(48)
    else if(Gen > 10 && levelUp > 0)
      setEndurance(48 - (0.5*levelUp))
  },[data.allOwnerTruffles, id])

  //readyTimer
  useEffect(() => {
    const startCouterTimer = setInterval(() => {
      const seconds  = data.allOwnerTruffles.filter(item => item.id === id ).map(result =>
        // console.log(Math.round(result.readyTime - Date.now() / 1000))
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
      setTimerHours(remaining.hours > 9 ? remaining.hours : '0' + remaining.hours)
      setTimerMinutes(remaining.minutes > 9 ? remaining.minutes : '0' + remaining.minutes)
      setTimerSeconds(remaining.seconds > 9 ? remaining.seconds : '0' + remaining.seconds)

    }, 1000);

    return () => {
      clearInterval(startCouterTimer);
    }
  },[data.allOwnerTruffles, id])

  //format Time
  function fromNow(date, nowDate = Date.now(), rft = new Intl.RelativeTimeFormat('en', { numeric: "auto" })) {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;
    const intervals = [
        { ge: YEAR, divisor: YEAR, unit: 'year' },
        { ge: MONTH, divisor: MONTH, unit: 'month' },
        { ge: WEEK, divisor: WEEK, unit: 'week' },
        { ge: DAY, divisor: DAY, unit: 'day' },
        { ge: HOUR, divisor: HOUR, unit: 'hour' },
        { ge: MINUTE, divisor: MINUTE, unit: 'minute' },
        { ge: 30 * SECOND, divisor: SECOND, unit: 'seconds' },
        { ge: 0, divisor: 1, text: 'just now' },
    ];
    const now = typeof nowDate === 'object' ? nowDate.getTime() : new Date(nowDate).getTime();
    const diff = now - (typeof date === 'object' ? date : new Date(date)).getTime();
    const diffAbs = Math.abs(diff);
    for (const interval of intervals) {
        if (diffAbs >= interval.ge) {
            const x = Math.round(Math.abs(diff) / interval.divisor);
            const isFuture = diff < 0;
            return interval.unit ? rft.format(isFuture ? x : -x, interval.unit) : interval.text;
        }
    }
  };

  const levelUpFee = (data.levelUpFee / 1000000000000000000).toString();
  // levelUpTruffle
  const levelUpTruffle = (_account, _id) => {
      setLoading(true);
      setLoadingShowLevelup(false);
      blockchain.truffleFactory.methods
        .levelUp(_id)
        .send({
        from: _account,
        value: blockchain.web3.utils.toWei(levelUpFee, "ether"),
      })
      .once("error", (err) => {
      setLoading(false);
      console.log(err);
      })
      .then((receipt) => {
      setLoading(false);
      console.log(receipt);
      dispatch(fetchData(blockchain.account));
      setLoadingShowLevelup(true);
    });
  };

  //sell
  const sellFee = (data.sellFee / 1000000000000000000).toString();
  const sellTruffle = (_account, _tokenId, _price) => {
    setLoadingTabSell(true);
    setLoadingShow(false);
    blockchain.truffleFactory.methods
      .allowBuy( _tokenId, _price)
      .send({
      from: _account,
      value: blockchain.web3.utils.toWei(sellFee,"ether")
    })
    .once("error", (err) => {
      setLoadingTabSell(false);
      console.log(err);
    })
    .then((receipt) => {
      setLoadingTabSell(false);
      console.log(receipt);
      dispatch(fetchData(blockchain.account));
      setLoadingShow(true);
    });
  };

  //unsell
  const UnSellTruffle = (_account, _tokenId) => {
    setLoadingUnSell(true);
    setLoadingShowRemove(false);
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
      setLoadingShowRemove(true);
    });
  };

  //ChangePrice
  const ChangePrice = (_account, _tokenId, _newPrice) => {
    setLoadingChangPrice(true);
    setLoadingShowUpdatePrice(false);
    blockchain.truffleFactory.methods
    .changePrice( _tokenId, _newPrice)
    .send({
        from: _account,
    })
    .once("error", (err) => {
      setLoadingChangPrice(false);
      console.log(err);
    })
    .then((receipt) => {
      setLoadingChangPrice(false);
      console.log(receipt);
      dispatch(fetchData(blockchain.account));
      setLoadingShowUpdatePrice(true);
    });
  };

  //updateNameTruffle
  const updateNameTruffle = (_account, _id, _newName ) => {
    setLoadingTabUpdate(true);
    setLoadingShowUpdateName(false);
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
      setLoadingShowUpdateName(true);
    });
  };

  //transfer
  const transferToken = (_account, _from, _to, _tokenId) => {
    setLoadingTabTransfer(true);
    setLoadingShowTransfer(false);
    blockchain.truffleFactory.methods
      .GiftToken( _from, _to, _tokenId)
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
      setLoadingShowTransfer(true);
    });
  };

  //Buy
  const BuyTruffle = (_account, _tokenId, _price) => {
    setLoadingBuy(true);
    setLoadingShowBuy(false);
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
    setLoadingShowBuy(true);
    });
  };

  //update account
  useEffect(() => {
    if(id && id !== "") 
    dispatch(fetchData(blockchain.account))
    return () => {
      dispatch(removeData())
    }
  }, [blockchain.account, dispatch, id])

  return (
    <>
    {/* handShow Transfer */}
    <s.Containertoggle 
      ref={confettiRef}
      className={loadingShowTransfer === true ? "active-tab" : null}
    >
    <s.TextTitle>
      Successful transfer of truffleID <span style={{color: "#fe16e7", opacity: "0.6"}}>{id}</span> 
    </s.TextTitle>
    <s.TextTitle>
      to <span style={{color: "#fe16e7", opacity: "0.6"}} >{data.allTruffles.filter(item => item.id === id).map(result => result.currentOwner)}</span>
    </s.TextTitle>
    <s.Container fd={"row"} jc={"center"} ai={"center"} style={{marginTop: "50px"}}>
        <s.StyledButton
          style={{marginRight: "15px"}}
          onClick={() => { history.push("/mytruffle")}}
        >
          Go home
        </s.StyledButton>
    </s.Container>
    </s.Containertoggle>
    {/* handShow sell */}
    <s.Containertoggle 
      ref={confettiRef}
      className={loadingShow === true ? "active-tab" : null}
    >
    <s.TextTitle>
    </s.TextTitle>
    <s.TextTitle>
      Your item has been listed for sale on the market.
    </s.TextTitle>
    <s.Container fd={"row"} jc={"center"} ai={"center"} style={{marginTop: "50px"}}>
        <s.StyledButton
          style={{marginRight: "15px"}}
          onClick={() => { history.push("/marketplace")}}
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
    {/* handShow Remove item */}
    <s.Containertoggle 
      ref={confettiRef}
      className={loadingShowRemove === true ? "active-tab" : null}
    >
    <s.TextTitle>
      Your item has been removed from the market. Click Close to return.
    </s.TextTitle>
    <s.Container fd={"row"} jc={"center"} ai={"center"} style={{marginTop: "50px"}}>
        <s.StyledButtonBreedShow
          onClick={() => {
            setLoadingShowRemove(false);
          }}
        >
          Close
        </s.StyledButtonBreedShow>
    </s.Container>
    </s.Containertoggle>
    {/* handShow Update Price */}
    <s.Containertoggle 
      ref={confettiRef}
      className={loadingShowUpdatePrice === true ? "active-tab" : null}
    >
    <s.TextTitle>
      Update Price successful. Click Close to return.
    </s.TextTitle>
    <s.Container fd={"row"} jc={"center"} ai={"center"} style={{marginTop: "50px"}}>
        <s.StyledButtonBreedShow
          onClick={() => {
            setLoadingShowUpdatePrice(false);
          }}
        >
          Close
        </s.StyledButtonBreedShow>
    </s.Container>
    </s.Containertoggle>
    {/* handShow Levelup */}
    <s.Containertoggle 
      ref={confettiRef}
      className={loadingShowLevelup === true ? "active-tab" : null}
    >
    <s.TextTitle>    
      Update successful. click Go to view or Click Close to return.
    </s.TextTitle>
    <s.Container fd={"row"} jc={"center"} ai={"center"} style={{marginTop: "50px"}}>
        <s.StyledButtonBreedShow
          onClick={() => {
            setLoadingShowLevelup(false);
          }}
        >
          Close
        </s.StyledButtonBreedShow>
    </s.Container>
    </s.Containertoggle>
    {/* handShow Update Name */}
    <s.Containertoggle 
      ref={confettiRef}
      className={loadingShowUpdateName === true ? "active-tab" : null}
    >
    <s.TextTitle>    
      Update successful. Click Close to return.
    </s.TextTitle>
    <s.Container fd={"row"} jc={"center"} ai={"center"} style={{marginTop: "50px"}}>
        <s.StyledButtonBreedShow
          onClick={() => {
            setLoadingShowUpdateName(false);
          }}
        >
          Close
      </s.StyledButtonBreedShow>
    </s.Container>
    </s.Containertoggle>
    {/* handShow Buy */}
    <s.Containertoggle 
      ref={confettiRef}
      className={loadingShowBuy === true ? "active-tab" : null}
    >
    <s.TextTitle>    
      Successfully purchase. click Go to view or Click Close to return.
    </s.TextTitle>
    <s.Container fd={"row"} jc={"center"} ai={"center"} style={{marginTop: "50px"}}>
        <s.StyledButton
          style={{marginRight: "15px"}}
          onClick={() => { history.push("/mytruffle")}}
        >
          Go to
        </s.StyledButton>
        <s.StyledButtonBreedShow
          onClick={() => {
            setLoadingShowBuy(false);
          }}
        >
          Close
        </s.StyledButtonBreedShow>
    </s.Container>
    </s.Containertoggle>
      <s.Screen 
        image={_color} 
        className={loadingShow === true || loadingShowRemove === true || loadingShowBuy === true || loadingShowLevelup === true || loadingShowTransfer || loadingShowUpdateName || loadingShowUpdatePrice ? "blur" : null}
      >
        {data.allTruffles.filter(item => item.id === id ).map((item)  => (
          <s.Container 
            key={item.id} 
            ai={"center"}
            style={{ margin:"6.5rem 0px 50px 0px"}}
          >
          <s.ContainerDetails>
            <s.StyledTextBoxNameDetails>
              <s.TextDescriptionDetail>
                Truffles ID: {item.id}
              </s.TextDescriptionDetail>
              <s.StyledButtonBack
                onClick={() => history.push("/mytruffle")}
              >
                <BiArrowBack style={{marginRight: "10px"}}/>
                  Back
              </s.StyledButtonBack>
            </s.StyledTextBoxNameDetails>
            <s.Container> 
              <s.Container ai={"center"} jc={"space-between"} fd={"row"}>
              <s.StyledImgDetails>       
                <TruffleRenderer truffle={item} style={{height: "400px", with: "400px"}} />
              </s.StyledImgDetails>
              {/* check address owner */}
              {blockchain.account === item.currentOwner.toLowerCase() ? (
              <s.BoxDetails>
                  <s.TextName>{item.name}</s.TextName>  
                <s.TextTitleDetails><BiDna/> {item.dna} (Gen {item.gen0})</s.TextTitleDetails> 
                {/* check view */}
                {item.sell <= 0 ? (
                  <>
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
                      <s.StyledButtonAction 
                        style={parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0 && item.sell <= 0 ? {marginRight: "15px"} : {marginRight: "15px" ,pointerEvents: "none", opacity: "0.5"}} 
                        onClick={() => history.push("/breed")}
                      >
                        Breed
                      </s.StyledButtonAction>
                    {/* uplevel */}
                    {!loading &&
                    <s.StyledButtonAction 
                      disabled={loading ? 1: 0}
                      style={parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0 && item.sell <= 0 && item.level < 20 ? {} : {pointerEvents: "none", opacity: "0.5"}} 
                      onClick={(e) => {
                        e.preventDefault();
                        levelUpTruffle(blockchain.account, item.id);
                      }}
                    >
                      {item.level < 20 ? 'Level Up' : 'Level Max'}
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
                  </>
                ) : (
                  <>
                  <s.BoxBuy>
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
                  </s.BoxBuy>
                  <s.TextSubTitleBuy>Price 
                    <s.StyledTextBox>
                      <s.TextTitleBuy>
                      {blockchain.web3.utils.fromWei(item.sell,"ether")} BNB
                      </s.TextTitleBuy>
                      <s.TextSubTitleBuy>{fromNow(item.sellTime * 1000)}</s.TextSubTitleBuy>
                    </s.StyledTextBox>
                  </s.TextSubTitleBuy>
                  {/* button Action */}
                  <s.Container>
                    {!loadingUnSell &&
                    <s.StyledButtonActionDetails 
                      disabled={loadingUnSell ? 1: 0}
                      onClick={() => {
                          UnSellTruffle(blockchain.account, item.id);
                      }}
                    >
                      <MdOutlineRemoveShoppingCart style={{paddingRight: "10px", fontSize: "30px"}}/> Remove 
                    </s.StyledButtonActionDetails>
                    }
                    {loadingUnSell && 
                    <s.StyledButtonActionDetails  
                      style={{pointerEvents: "none"}}
                      disabled={loadingUnSell ? 1: 0}
                    >
                      <s.StyledButtonLoading/>
                    </s.StyledButtonActionDetails>
                    }
                  </s.Container>
                  </>
                )}
              </s.BoxDetails>
              ) : (
                <s.BoxDetails>
                  <s.TextName>{item.name}</s.TextName>  
                  <s.TextTitleDetails><BiDna/> {item.dna} (Gen {item.gen0})</s.TextTitleDetails> 
                <s.BoxBuy>
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
                </s.BoxBuy>
                <s.TextSubTitleBuy>Price 
                  <s.StyledTextBox>
                    <s.TextTitleBuy>
                    {blockchain.web3.utils.fromWei(item.sell,"ether")} BNB
                    </s.TextTitleBuy>
                    <s.TextSubTitleBuy>{fromNow(item.sellTime * 1000)}</s.TextSubTitleBuy>
                  </s.StyledTextBox>
                </s.TextSubTitleBuy>
                {/* button Action */}
                <s.Container>
                  {!loadingBuy &&
                  <s.StyledButtonActionDetails 
                    disabled={loadingBuy ? 1: 0}
                    onClick={() => {
                        BuyTruffle(blockchain.account, item.id, blockchain.web3.utils.fromWei(item.sell, "ether"));
                    }}
                  >
                    <RiWallet3Line style={{paddingRight: "10px", fontSize: "30px"}}/> Buy Now
                  </s.StyledButtonActionDetails>
                  }
                  {loadingBuy && 
                  <s.StyledButtonActionDetails  
                    style={{pointerEvents: "none"}}
                    disabled={loadingBuy ? 1: 0}
                  >
                    <s.StyledButtonLoading/>
                  </s.StyledButtonActionDetails>
                  }
                </s.Container>
              </s.BoxDetails>
              )}
              </s.Container>
              {blockchain.account === item.currentOwner.toLowerCase() ? (
                <s.Container jc={"center"} ai={"center"} style={{paddingTop: "6rem"}}>
                  {/* parents */}
                    <s.Container>
                      <s.TextName>Parents</s.TextName>
                      {DadId[0] !== "0" && MumId[0] !== "0" ? (
                      <s.Container fd={"row"}>
                      {data.allTruffles.filter(item => item.id === DadId[0] ).map((item ) => (
                        <s.Container style={{marginRight: "20px"}}>
                          <s.TextDescription>Father</s.TextDescription>
                          <s.Box key={item.id}>
                              <s.StyledImg>
                              <Link to={`/details/${item.id}`} >
                                  <TruffleRenderer truffle={item}/>
                              </Link>
                              </s.StyledImg>
                          </s.Box>
                        </s.Container>
                      ))}
                      {/* mother */}
                      {data.allTruffles.filter(item => item.id === MumId[0] ).map((item ) => (
                        <s.Container>
                          <s.TextDescription>Mother</s.TextDescription>
                          <s.Box key={item.id} >
                              <s.StyledImg>
                              <Link to={`/details/${item.id}`} >
                                <TruffleRenderer truffle={item}/>
                              </Link>
                              </s.StyledImg>
                          </s.Box>
                        </s.Container>
                      ))} 
                      </s.Container>
                      ): ( 
                        <s.TextDescription>{item.gen0 === "0" ? "First generation" : "Un mated"}</s.TextDescription>
                      )}
                    </s.Container>
                  {/* Chidren */}
                  <s.Container style={{marginTop: "40px"}}>
                    <s.TextName>Children</s.TextName>
                    {Children.length !== 0 ? (
                      <s.Container fd={"row"} style={{flexWrap: "wrap"}}>
                        {data.allTruffles.filter(item => (item.dadId === id || item.mumId === id)).map((item ) => (
                          <s.Box key={item.id} style={{margin: "20px 20px 0 0"}}>
                            <s.StyledImg>
                              <Link to={`/details/${item.id}`}>
                                <TruffleRenderer truffle={item}/>
                              </Link>
                            </s.StyledImg>
                          </s.Box>
                        ))} 
                      </s.Container>
                    ) : (
                      <s.TextDescription>Un mated</s.TextDescription>
                    )}
                  </s.Container>   
                </s.Container>
              ): ( null )}
            </s.Container>
            {/* Tabbar    */}
            <s.SpacerSuperLarge/>
            {blockchain.account === item.currentOwner.toLowerCase() ? (
              <>
              <s.Container ai={"center"} style={{paddingTop: "7rem"}}>
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
                    Gift
                  </s.Tabs>
                </s.MenuTabs>
              </s.Container>
                {toggleState === 1 ? (  
                <s.Container  ai={"center"} style={{margin: "6rem 0 3rem 0"}}>
                  <s.BoxTab>
                    {data.allOwnerTruffles.filter(item => item.id === id ).map(result => result.sell) <= 0 ? (
                      <form>
                        {data.allOwnerTruffles.filter(item => item.id === id).map(result => result.rarity) > 5 ? (
                          <>
                          <s.TextSubTitleDetail>Enter the amount you want to sell (BNB)</s.TextSubTitleDetail>
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
                                  style={parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0 && sell > 0 && sell <= 99 ? {} : {pointerEvents: "none", opacity: "0.5"}} 
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
                          {sell > 99 ? (<s.TextDescription>Value exceeds the allowable limit !</s.TextDescription>) : (null)}
                          </>
                        ) : (
                          <s.Container ai={"center"}>
                            <s.TextTitle>
                              Require rarity > 5
                            </s.TextTitle>
                          </s.Container>
                        )}
                      </form>
                    ) : (
                      <form>
                        <s.TextSubTitleDetail>Enter the amount you want to Change (BNB)</s.TextSubTitleDetail>
                        <s.Container fd={"row"} ai={"center"} jc={"center"}>
                          <s.InputTransferNumber
                            required
                            placeholder={"Price must be at least 1 wei"} 
                            style={{marginRight: "10px"}}
                            onChange={e => setSell(e.target.value)}
                            value={sell}
                          />
                        <s.Container>
                          {!loadingChangPrice &&
                          <s.StyledButtonTransfer
                              disabled={loadingChangPrice ? 1: 0}
                              style={blockchain.web3.utils.fromWei(item.sell, "ether") === sell ? {pointerEvents: "none", opacity: "0.5"} : {}} 
                              onClick={() => {
                                ChangePrice(blockchain.account, item.id, blockchain.web3.utils.toWei(sell, "ether"));
                                setSell('');
                              }}
                          >
                            Change
                          </s.StyledButtonTransfer>
                          }
                          {loadingChangPrice &&
                          <s.StyledButtonTransfer
                              disabled={loadingChangPrice ? 1: 0}
                              style={{pointerEvents: "none"}} 
                          >
                            <s.StyledButtonLoading/>
                          </s.StyledButtonTransfer>
                          }
                          </s.Container>
                        </s.Container>
                        {blockchain.web3.utils.fromWei(item.sell, "ether") === sell ? (<s.TextDescription>Rrice must be different !</s.TextDescription>) : (null)}
                      </form>
                    )}
                  </s.BoxTab>
                </s.Container>
                ): (null)}
                {toggleState === 2 ? (
                <s.Container  flex={1} fd={"column"} ai={"center"}  style={{margin: "6rem 0 3rem 0"}}>
                  <s.BoxTab>
                    <from>
                      <s.TextSubTitleDetail>Change this truffle name (Requires level ≥ 2)</s.TextSubTitleDetail>
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
                            style={item.level >= 2 && item.sell <= 0 && parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0 && name.length > 0  && name.length < 20 ? {} : {pointerEvents: "none", opacity: "0.5"}}
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
                      {name.length > 20 ? (<s.TextDescription>Name cannot exceed 20 characters !</s.TextDescription>) : (null)}
                    </from>
                  </s.BoxTab>
                </s.Container>
                ): (null)}
                {toggleState === 3 ? (
                <s.Container  ai={"center"} style={{margin: "6rem 0 3rem 0"}}>
                  <s.BoxTab>
                    <form>
                      {data.allOwnerTruffles.filter(item => item.id === id).map(result => result.rarity) > 5 ? (
                      <>
                        <s.TextSubTitleDetail>Transfer this Truffle to someone</s.TextSubTitleDetail>
                        <s.Container  fd={"row"} ai={"center"} jc={"center"}>
                          <s.InputTransfer 
                            required
                            placeholder={"0x92Da0E5C9D58AcCDCA6E280a2F632B23D9aA0705"} 
                            style={{marginRight: "10px"}}
                            value={transfer}
                            onChange={(e) => 
                              setTransfer(e.target.value)}
                          />
                          {!loadingTabTransfer &&
                          <s.StyledButtonTransfer
                            disabled={loadingTabTransfer ? 1: 0}
                            style={parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0 && item.sell <= 0  && transfer.length > 0 && transfer.length <= 42 ? {marginRight: "5px"} : {marginRight: "5px", pointerEvents: "none", opacity: "0.5"}} 
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
                        {transfer.length > 42 ? (<s.TextDescription>wallet address does not exist !</s.TextDescription>) : (null)}
                      </>
                      ) : (
                        <s.Container ai={"center"}>
                          <s.TextTitle>Require rarity > 5 </s.TextTitle>
                        </s.Container>
                      ) }
                    </form>
                  </s.BoxTab>
                </s.Container>
                ): (null)}
              </>
            ) : (
              <s.Container jc={"center"} ai={"center"} style={{paddingTop: "6rem"}}>
                {/* parents */}
                  <s.Container>
                    <s.TextName>Parents</s.TextName>
                    {DadId[0] !== "0" && MumId[0] !== "0" ? (
                    <s.Container fd={"row"}>
                    {data.allTruffles.filter(item => item.id === DadId[0] ).map((item ) => (
                      <s.Container style={{marginRight: "20px"}}>
                        <s.TextDescription>Father</s.TextDescription>
                        <s.Box key={item.id}>
                            <s.StyledImg>
                            <Link to={`/details/${item.id}`} >
                                <TruffleRenderer truffle={item}/>
                            </Link>
                            </s.StyledImg>
                        </s.Box>
                      </s.Container>
                    ))}
                    
                    {data.allTruffles.filter(item => item.id === MumId[0] ).map((item ) => (
                      <s.Container>
                        <s.TextDescription>Mother</s.TextDescription>
                        <s.Box key={item.id} >
                            <s.StyledImg>
                            <Link to={`/details/${item.id}`} >
                              <TruffleRenderer truffle={item}/>
                            </Link>
                            </s.StyledImg>
                        </s.Box>
                      </s.Container>
                    ))} 
                    </s.Container>
                    ) : (
                      <s.TextDescription> First generation</s.TextDescription>
                    )}
                  </s.Container>
                {/* Chidren */}
                <s.Container style={{marginTop: "40px"}}>
                  <s.TextName>Children</s.TextName>
                  {Children.length !== 0 && DadId[0] !== "0" && MumId[0] !== "0" ? (
                    <s.Container fd={"row"}>
                      {data.allTruffles.filter(item => item.dadId === id || item.mumId === id).map((item ) => (
                        <s.Box key={item.id} style={{margin: "20px 20px 0 0"}}>
                          <s.StyledImg>
                            <Link to={`/details/${item.id}`}>
                              <TruffleRenderer truffle={item}/>
                            </Link>
                          </s.StyledImg>
                        </s.Box>
                      ))} 
                    </s.Container>
                  ) : (
                    <s.TextDescription>Un mated</s.TextDescription>
                  )}
                </s.Container>   
              </s.Container>
            )}  
            </s.ContainerDetails>
           </s.Container>
        ))}
      </s.Screen>
    </>
  );
};

export default Details;