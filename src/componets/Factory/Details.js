import React, { useEffect , useState} from 'react';
import * as s from "../../styles/globalStyles";
import TruffleRenderer from "../TruffleRenderer";
import { BiDna} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData} from "../../redux/data/dataActions";
import { removeData } from '../../redux/data/dataActions';
import _color from "../../assets/images/bg/_color.png";
import { useHistory } from "react-router-dom";

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
  const [name, setName] = useState('');
  const [transfer, setTransfer] = useState();
  const [sell, setSell] = useState();

  let history = useHistory();

  const [timerDays,setTimerDays] = useState(0);
  const [timerHours,setTimerHours] = useState(0);
  const [timerMinutes,setTimerMinutes] = useState(0);
  const [timerSeconds,setTimerSeconds] = useState(0);

  //toggleTab
  const toggleTab = (index) => {
    setToggleState(index);
  }

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
  })

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
      <s.Screen image={_color} >
        {data.allTruffles.filter(item => item.id === id ).map((item, index)  => (
          <s.Container key={index} style={{ padding:"10px 100px"}}>
            <s.StyledTextBoxNameDetails>
              <s.TextDescriptionDetail>
                Truffles ID: #{item.id}
              </s.TextDescriptionDetail>
            </s.StyledTextBoxNameDetails>
            <s.Container jc={"space-between"} ai={"center"} fd={"row"}> 
              <s.StyledImgDetails>       
                <TruffleRenderer truffle={item} style={{with: "350px", height: "350px"}} />
              </s.StyledImgDetails>
   
              <s.ContainerDetails>
                <s.TextTitle>{item.name}</s.TextTitle>
                <s.TextDescription><BiDna/> {item.dna}</s.TextDescription>
                <s.StyledTextBox >
                  <s.TextDescription>Rarity: {item.rarity}</s.TextDescription>
                  <s.TextDescription>Level: {item.level}</s.TextDescription>
                </s.StyledTextBox>
                <s.StyledTextBox >
                  <s.TextDescription>DadID: {item.dadId}</s.TextDescription>
                  <s.TextDescription>MumID: {item.mumId}</s.TextDescription>
                </s.StyledTextBox>
                <s.BoxTimerCouter>
                  {timerDays !== 0 && timerHours !== 0 && timerMinutes !== 0 && timerSeconds !== 0 ? (
                  <s.TextDescriptionDetail style={{color: "#ffd32a"}}>
                      {timerDays}:{timerHours}:{timerMinutes}:{timerSeconds} 
                  </s.TextDescriptionDetail>
                  ) : (
                    <s.TextDescriptionDetail style={{color: "#32ff7e"}}>
                      Breed Ready
                    </s.TextDescriptionDetail>
                  )}
                </s.BoxTimerCouter>
                <s.Container ai={"center"} jc={"space-around"} fd={"row"}>
                  <s.StyledButtonAction style={{marginRight: "5px"}}
                  >
                    Breed
                  </s.StyledButtonAction>
                  {!loading &&
                  <s.StyledButtonAction 
                    style={{marginLeft: "5px"}}
                    disabled={loading ? 1: 0}
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
                    <s.StyledButtonLoadingAction/>
                  </s.StyledButtonAction>
                  }
                </s.Container>
              </s.ContainerDetails>
            </s.Container>
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
              <s.Container  ai={"center"} style={{marginTop: "5rem"}}>
                <s.BoxTab>
                  {data.allOwnerTruffles.filter(item => item.id === id ).map(result => result.sell) <= 0 ? (
                    <>
                    <s.TextSubTitle >Enter the amount you want to sell</s.TextSubTitle>
                    <s.Container fd={"row"} ai={"center"} jc={"center"}>
                        <s.InputTransferNumber
                          required
                          placeholder={"Price must be at least 1 wei"} 
                          style={{marginRight: "5px"}}
                          onChange={e => setSell(e.target.value)}
                          value={sell}
                        />
                      {timerDays === 0 && timerHours === 0 && timerMinutes === 0 && timerSeconds === 0 ? (
                        <s.Container>
                        {!loadingTabSell &&
                        <s.StyledButtonTransfer
                            disabled={loadingTabSell ? 1: 0}
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
                          <s.StyledButtonLoadingAction/>
                        </s.StyledButtonTransfer>
                        }
                        </s.Container>
                      ) : (
                        <s.Container>
                          {!loadingTabSell &&
                          <s.StyledButtonTransfer
                            style={{pointerEvents: "none", opacity: 0.5}} 
                          >
                            Sell
                          </s.StyledButtonTransfer>
                          }
                        </s.Container>
                      )}
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
                        <s.StyledButtonLoadingRemove/>
                      </s.StyledButtonUnsale>
                      }
                    </s.Container>
                  )}
                </s.BoxTab>
              </s.Container>
              ): (null)}
              {toggleState === 2 ? (
              <s.Container  flex={1} fd={"column"} ai={"center"}  style={{marginTop: "5rem"}}>
                <s.BoxTab>
                  <s.TextSubTitle >Change this truffle name</s.TextSubTitle>
                  <s.Container  fd={"row"} ai={"center"} jc={"center"}>
                    <s.InputTransfer 
                      required
                      placeholder={"Any name... "} 
                      style={{marginRight: "5px"}}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    {!loadingTabUpdate &&
                    <s.StyledButtonTransfer
                        disabled={loadingTabUpdate ? 1: 0}
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
                      <s.StyledButtonLoadingAction/>
                    </s.StyledButtonTransfer>
                    }
                  </s.Container>
                </s.BoxTab>
              </s.Container>
              ): (null)}
              {toggleState === 3 ? (
              <s.Container  ai={"center"} style={{marginTop: "5rem"}}>
                <s.BoxTab>
                  <s.TextSubTitle >Transfer this Truffle to someone</s.TextSubTitle>
                  <s.Container  fd={"row"} ai={"center"} jc={"center"}>
                    <s.InputTransfer 
                      placeholder={"0x92Da0E5C9D58AcCDCA6E280a2F632B23D9aA0705"} 
                      style={{marginRight: "5px"}}
                      value={transfer}
                      required
                      onChange={(e) => 
                        setTransfer(e.target.value)}
                    />
                    {!loadingTabTransfer &&
                    <s.StyledButtonTransfer
                      disabled={loadingTabTransfer ? 1: 0}
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
                      <s.StyledButtonLoadingAction/>
                    </s.StyledButtonTransfer>
                    }
                  </s.Container>
                </s.BoxTab>
              </s.Container>
              ): (null)}
            </s.Container>
        ))}
      </s.Screen>
  );
};

export default Details;