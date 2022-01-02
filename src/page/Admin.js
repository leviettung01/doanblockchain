import { useEffect, useState, useRef } from "react";
import * as s from "../styles/globalStyles";
import _bg from "../assets/images/bg/_bg.png"
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/data/dataActions";
import { useHistory } from "react-router-dom";

const Admin = () => {

    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);

    const [loadingMintFee, setLoadingMintFee] = useState(false);
    const [loadingLevelFee, setLoadingLevelFee] = useState(false);
    const [loadingBreedFee, setLoadingBreedFee] = useState(false);
    const [loadingSellFee, setLoadingSellFee] = useState(false);
    const [loadingShow, setLoadingShow] = useState(false);

    const [updateMintFee, setUpdateMintFee] = useState();
    const [updateLevelFee, setUpdateLevelFee] = useState();
    const [updateBreedFee, setUpdateBreedFee] = useState();
    const [updateSellFee, setUpdateSellFee] = useState();

    const [toggleState, setToggleState] = useState(1);
    const [toggleStateUpdate, setToggleStateUpdate] = useState(1);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    let history = useHistory();

    const toggleTab = (index) => {
        setToggleState(index);
    }

    const toggleTabUpdate = (index) => {
        setToggleStateUpdate(index);
    }

    const confettiRef = useRef(null);

    console.log(data.mintFee)

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
    }

    //UpdateMintFee
    const UpdateMintFee = (_account, _fee) => {
        setLoadingMintFee(true);
        setLoadingShow(false);
        blockchain.truffleFactory.methods
        .updateFee( _fee)
        .send({
            from: _account,
        })
        .once("error", (err) => {
            setLoadingMintFee(false);
            console.log(err);
        })
        .then((receipt) => {
            setLoadingMintFee(false);
            console.log(receipt);
            dispatch(fetchData(blockchain.account));
            setLoadingShow(true);
        });
    };

    //UpdateLevelFee
    const UpdateLevelFee = (_account, _fee) => {
        setLoadingLevelFee(true);
        setLoadingShow(false);
        blockchain.truffleFactory.methods
        .updateFeeLevelUp( _fee)
        .send({
            from: _account,
        })
        .once("error", (err) => {
            setLoadingLevelFee(false);
            console.log(err);
        })
        .then((receipt) => {
            setLoadingLevelFee(false);
            console.log(receipt);
            dispatch(fetchData(blockchain.account));
            setLoadingShow(true);
        });
    };

    //UpdateFee
    const UpdateBreedFee = (_account, _fee) => {
        setLoadingBreedFee(true);
        setLoadingShow(false);
        blockchain.truffleFactory.methods
        .updateFeeBreed( _fee)
        .send({
            from: _account,
        })
        .once("error", (err) => {
            setLoadingBreedFee(false);
            console.log(err);
        })
        .then((receipt) => {
            setLoadingBreedFee(false);
            console.log(receipt);
            dispatch(fetchData(blockchain.account));
            setLoadingShow(true);
        });
    };

    //UpdateFee
    const UpdateSellFee = (_account, _fee) => {
        setLoadingSellFee(true);
        setLoadingShow(false);
        blockchain.truffleFactory.methods
        .updateFeeSell( _fee)
        .send({
            from: _account,
        })
        .once("error", (err) => {
            setLoadingSellFee(false);
            console.log(err);
        })
        .then((receipt) => {
            setLoadingSellFee(false);
            console.log(receipt);
            dispatch(fetchData(blockchain.account));
            setLoadingShow(true);
        });
    };


    //search
    const handleChange = (e) => {
        setSearchTerm(e.target.value)
      }
    
    //find search id
    useEffect(() => {
        const results = data.allTruffles.filter(item =>
            item.id.includes(searchTerm)
        );
        setSearchResults(results);
    }, [data.allTruffles, searchTerm])

    //update account
    useEffect(() => {
        if (blockchain.account !== "" && blockchain.truffleFactory !== null) {
          dispatch(fetchData(blockchain.account));
        }
    }, [blockchain.account, blockchain.truffleFactory, dispatch]);

    return (
        <>
        {/* handShow sell */}
        <s.Containertoggle 
            ref={confettiRef}
            className={loadingShow === true ? "active-tab" : null}
        >
        <s.TextTitle>
        </s.TextTitle>
        <s.TextTitle>
            Update successful. Click Close to return.
        </s.TextTitle>
        <s.Container fd={"row"} jc={"center"} ai={"center"} style={{marginTop: "50px"}}>
            <s.StyledButtonBreedShow
                onClick={() => {
                    setLoadingShow(false);
                }}
            >
                Close
            </s.StyledButtonBreedShow>
        </s.Container>
        </s.Containertoggle>

        <s.Screen image={_bg}>
            <s.Container ai={"center"} jc={"flex-start"} style={{paddingTop: "3rem", marginTop: "4.5rem"}}>
            <s.ContainerTabBar>
                  <s.MenuTabsHome>
                    <s.TabHome
                      className={toggleState === 1 ? "active-tab" : null}
                      onClick={() => toggleTab(1)}
                    >
                      All {toggleState === 1 ? '(' + data.allTruffles.length + ')' : null}
                    </s.TabHome>
                    <s.TabHome
                      className={toggleState === 2 ? "active-tab" : null}
                      onClick={() => toggleTab(2)}
                    >
                      Activity {toggleState === 2 ? '(' + data.allTruffles.filter(item => item.sell > 0).length + ')' : null}
                    </s.TabHome>
                    <s.TabHome
                      className={toggleState === 3 ? "active-tab" : null}
                      onClick={() => toggleTab(3)}
                    >
                      Update Fee 
                    </s.TabHome>
                  </s.MenuTabsHome>
                    <s.InputSearch 
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleChange}
                    />
                </s.ContainerTabBar>
                {/* toggle AllTruffle */}
                {toggleState === 1 ? (
                  <s.ContainerHome jc={"center"} ai={"center"} style={{flexWrap: "wrap", margin: "27px "}}>
                    {data.allTruffles.length === 0 ? (
                      <s.Container flex={1} ai={"center"} jc={"center"}>
                        <s.TextTitle>
                            Hi Admin, Welcome to the Truffles game (beta version 1.0)
                        </s.TextTitle>
                        <s.TextSubTitleHome>                        
                            Currently no tokens have been minted
                        </s.TextSubTitleHome>
                        <s.TextSubTitleHome>
                            try reloading the page !
                        </s.TextSubTitleHome>
                        <s.SpacerSmall />
                      </s.Container>
                    ) : (
                    <s.Container jc={"center"} ai={"center"} >
                      <s.StyledTable>
                        <s.StyledTableContent>
                          <s.TextTableName>Item</s.TextTableName>
                          <s.TextTableName>Name</s.TextTableName>
                          <s.TextTableName>Gen</s.TextTableName>
                          <s.TextTableName>Rarity</s.TextTableName>
                          <s.TextTableName>Level</s.TextTableName>
                          <s.TextTableName>Owner</s.TextTableName>
                        </s.StyledTableContent>
                        {searchResults != null ? (
                        <>  
                         {searchResults.map(item => {
                          return (
                            <s.StyledTableRow key={item.id} onClick={() => history.push(`/details/${item.id}`)}> 
                              <s.TextTableEvent>{item.id}</s.TextTableEvent>
                              <s.TextTableEvent>{item.name}</s.TextTableEvent>
                              <s.TextTableEvent>{item.gen0}</s.TextTableEvent>
                              <s.TextTableEvent>{item.rarity}</s.TextTableEvent>
                              <s.TextTableEvent>{item.level}</s.TextTableEvent>
                              <s.TextTableEvent>{item.currentOwner.substring(0, 6)}...{item.currentOwner.substring(item.currentOwner.length - 4)}</s.TextTableEvent>
                            </s.StyledTableRow>
                          )
                        })}
                        </>
                        ) : (
                        <>
                        {data.allTruffles.map(item => {
                            return (
                              <s.StyledTableRow key={item.id} onClick={() => history.push(`/details/${item.id}`)}> 
                                <s.TextTableEvent>{item.id}</s.TextTableEvent>
                                <s.TextTableEvent>{item.name}</s.TextTableEvent>
                                <s.TextTableEvent>{item.gen0}</s.TextTableEvent>
                                <s.TextTableEvent>{item.rarity}</s.TextTableEvent>
                                <s.TextTableEvent>{item.level}</s.TextTableEvent>
                                <s.TextTableEvent>{item.currentOwner.substring(0, 6)}...{item.currentOwner.substring(item.currentOwner.length - 4)}</s.TextTableEvent>
                              </s.StyledTableRow>
                            )
                        })}
                        </>
                        )}
                      </s.StyledTable>
                    </s.Container>
                    )}
                  </s.ContainerHome> 
                ) : (null)}
                {/* toggle ActiveSell */}
                {toggleState === 2 ? (
                  <s.ContainerHome jc={"center"} ai={"center"} style={{flexWrap: "wrap", margin: "27px "}}>
                    {data.allTruffles.filter(item => item.sell > 0).length === 0 ? (
                      <s.Container flex={1} ai={"center"} jc={"center"}>
                        <s.TextTitle>                        
                            There are currently no tokens for sale on the market
                        </s.TextTitle>
                        <s.TextSubTitleHome>
                            try reloading the page !
                        </s.TextSubTitleHome>
                        <s.SpacerSmall />
                      </s.Container>
                    ) : (
                    <s.Container jc={"center"} ai={"center"} >
                      <s.StyledTable>
                        <s.StyledTableContent>
                          <s.TextTableName>Item</s.TextTableName>
                          <s.TextTableName>Price</s.TextTableName>
                          <s.TextTableName>Gen</s.TextTableName>
                          <s.TextTableName>Owner</s.TextTableName>
                          <s.TextTableName>Time</s.TextTableName>
                        </s.StyledTableContent>
                        {searchResults != null ? (
                        <>  
                         {searchResults.filter(item => item.sell > 0).map((item) => {
                          return (
                            <s.StyledTableRow key={item.id} onClick={() => history.push(`/details/${item.id}`)}> 
                                <s.TextTableEvent>{item.id}</s.TextTableEvent>
                                <s.TextTableEvent>{blockchain.web3.utils.fromWei(item.sell, "ether")} BSC</s.TextTableEvent>
                                <s.TextTableEvent>{item.gen0}</s.TextTableEvent>
                                <s.TextTableEvent>{item.currentOwner.substring(0, 6)}...{item.currentOwner.substring(item.currentOwner.length - 4)}</s.TextTableEvent>
                                <s.TextTableEvent>{fromNow(item.sellTime * 1000)}</s.TextTableEvent>
                            </s.StyledTableRow>
                          )
                        })}
                        </>
                        ) : (
                        <>
                        {data.allTruffles.filter(item => item.sell > 0).map((item) => {
                          return (
                            <s.StyledTableRow key={item.id} onClick={() => history.push(`/details/${item.id}`)}> 
                              <s.TextTableEvent>{item.id}</s.TextTableEvent>
                              <s.TextTableEvent>{blockchain.web3.utils.fromWei(item.sell, "ether")} BSC</s.TextTableEvent>
                              <s.TextTableEvent>{item.currentOwner.substring(0, 6)}...{item.currentOwner.substring(item.currentOwner.length - 4)}</s.TextTableEvent>
                              <s.TextTableEvent>{item.previousOwner.substring(0, 6)}...{item.previousOwner.substring(item.previousOwner.length - 4)}</s.TextTableEvent>
                              <s.TextTableEvent>{fromNow(item.sellTime * 1000)}</s.TextTableEvent>
                            </s.StyledTableRow>
                          )
                        })}
                        </>
                        )}
                      </s.StyledTable>
                    </s.Container>
                    )}
                  </s.ContainerHome> 
                ) : (null)}
                {toggleState === 3 ? (
                <s.ContainerHome flex={1} jd={"row"} jc={"flex-start"} ai={"center"} style={{margin: "27px "}}>
                    <s.TextTitle style={{marginBottom: "100px "}}>
                        Update transaction fee
                    </s.TextTitle>
                    <s.Container ai={"center"}>
                        <s.MenuTabs >
                        <s.Tabs 
                            className={toggleStateUpdate === 1 ? "active-tab" : null}
                            onClick={() => toggleTabUpdate(1)}
                        >
                            Mint
                        </s.Tabs>
                        <s.Tabs 
                            className={toggleStateUpdate === 2 ? "active-tab" : null}
                            onClick={() => toggleTabUpdate(2)}
                        >
                            level Up
                        </s.Tabs>
                        <s.Tabs 
                            className={toggleStateUpdate === 3 ? "active-tab" : null}
                            onClick={() => toggleTabUpdate(3)}
                        >
                            Breed
                        </s.Tabs>
                        <s.Tabs 
                            className={toggleStateUpdate === 4 ? "active-tab" : null}
                            onClick={() => toggleTabUpdate(4)}
                        >
                            Sell
                        </s.Tabs>
                        </s.MenuTabs>
                    </s.Container>
                    {/* //mint */}
                    {toggleStateUpdate === 1 ? (
                        <s.Container  ai={"center"} style={{margin: "6rem 0 3rem 0"}}>
                        <s.BoxTab>
                            <form style={{margin: "20px 0"}}>
                                <s.TextSubTitleDetail>Enter the mint fee you want to change (BSC)</s.TextSubTitleDetail>
                                <s.Container fd={"row"} ai={"center"} jc={"center"}>
                                    <s.InputTransferNumber
                                    required
                                    placeholder={"Fee must be at least 1 wei"} 
                                    style={{marginRight: "10px"}}
                                    onChange={e => setUpdateMintFee(e.target.value)}
                                    value={updateMintFee}
                                />
                                <s.Container>
                                {!loadingMintFee &&
                                <s.StyledButtonTransfer
                                    disabled={loadingMintFee ? 1: 0}
                                    style={updateMintFee > 0  && updateMintFee < 10 ? {} : {pointerEvents: "none", opacity: "0.5"}}
                                    onClick={() => {
                                        UpdateMintFee(blockchain.account, blockchain.web3.utils.toWei(updateMintFee, "ether"));
                                        setUpdateMintFee('');
                                    }}
                                >
                                    Update
                                </s.StyledButtonTransfer>
                                }
                                {loadingMintFee &&
                                <s.StyledButtonTransfer
                                    disabled={loadingMintFee ? 1: 0}
                                    style={{pointerEvents: "none"}} 
                                >
                                    <s.StyledButtonLoading/>
                                </s.StyledButtonTransfer>
                                }
                                </s.Container>
                                </s.Container>
                                {updateMintFee > 10 ? (<s.TextDescription>fee is too big !</s.TextDescription>) : (null)}
                            </form>
                        </s.BoxTab>
                        </s.Container>
                    ): (null)}
                    {/* levelUp */}
                    {toggleStateUpdate === 2 ? (
                        <s.Container  ai={"center"} style={{margin: "6rem 0 3rem 0"}}>
                        <s.BoxTab>
                            <form style={{margin: "20px 0"}}>
                                <s.TextSubTitleDetail>Enter the levelup fee you want to change (BSC)</s.TextSubTitleDetail>
                                <s.Container fd={"row"} ai={"center"} jc={"center"}>
                                    <s.InputTransferNumber
                                    required
                                    placeholder={"Fee must be at least 1 wei"} 
                                    style={{marginRight: "10px"}}
                                    onChange={e => setUpdateLevelFee(e.target.value)}
                                    value={updateLevelFee}
                                />

                                <s.Container>
                                {!loadingLevelFee &&
                                <s.StyledButtonTransfer
                                    disabled={loadingLevelFee ? 1: 0}
                                    style={updateLevelFee > 0  && updateLevelFee < 10 ? {} : {pointerEvents: "none", opacity: "0.5"}}
                                    onClick={() => {
                                        UpdateLevelFee(blockchain.account, blockchain.web3.utils.toWei(updateLevelFee, "ether"));
                                        setUpdateLevelFee('');
                                    }}
                                >
                                    Update
                                </s.StyledButtonTransfer>
                                }
                                {loadingLevelFee &&
                                <s.StyledButtonTransfer
                                    disabled={loadingLevelFee ? 1: 0}
                                    style={{pointerEvents: "none"}} 
                                >
                                    <s.StyledButtonLoading/>
                                </s.StyledButtonTransfer>
                                }
                                </s.Container>

                                </s.Container>
                                {updateLevelFee > 10 ? (<s.TextDescription>fee is too big !</s.TextDescription>) : (null)}
                            </form>
                        </s.BoxTab>
                        </s.Container>
                    ): (null)}
                    {/* breed */}
                    {toggleStateUpdate === 3 ? (
                        <s.Container  ai={"center"} style={{margin: "6rem 0 3rem 0"}}>
                        <s.BoxTab>
                            <form style={{margin: "20px 0"}}>
                                <s.TextSubTitleDetail>Enter the breed fee you want to change (BSC)</s.TextSubTitleDetail>
                                <s.Container fd={"row"} ai={"center"} jc={"center"}>
                                    <s.InputTransferNumber
                                    required
                                    placeholder={"Fee must be at least 1 wei"} 
                                    style={{marginRight: "10px"}}
                                    onChange={e => setUpdateBreedFee(e.target.value)}
                                    value={updateBreedFee}
                                />

                                <s.Container>
                                {!loadingBreedFee &&
                                <s.StyledButtonTransfer
                                    disabled={loadingBreedFee ? 1: 0}
                                    style={updateBreedFee > 0  && updateBreedFee < 10 ? {} : {pointerEvents: "none", opacity: "0.5"}}
                                    onClick={() => {
                                        UpdateBreedFee(blockchain.account, blockchain.web3.utils.toWei(updateBreedFee, "ether"));
                                        setUpdateBreedFee('');
                                    }}
                                >
                                    Update
                                </s.StyledButtonTransfer>
                                }
                                {loadingBreedFee &&
                                <s.StyledButtonTransfer
                                    disabled={loadingBreedFee ? 1: 0}
                                    style={{pointerEvents: "none"}} 
                                >
                                    <s.StyledButtonLoading/>
                                </s.StyledButtonTransfer>
                                }
                                </s.Container>

                                </s.Container>
                                {updateBreedFee > 10 ? (<s.TextDescription>fee is too big !</s.TextDescription>) : (null)}
                            </form>
                        </s.BoxTab>
                        </s.Container>
                    ): (null)}
                    {/* sell */}
                    {toggleStateUpdate === 4 ? (
                        <s.Container  ai={"center"} style={{margin: "6rem 0 3rem 0"}}>
                        <s.BoxTab>
                            <form style={{margin: "20px 0"}}>
                                <s.TextSubTitleDetail>Enter the sell fee you want to change (BSC)</s.TextSubTitleDetail>
                                <s.Container fd={"row"} ai={"center"} jc={"center"}>
                                    <s.InputTransferNumber
                                    required
                                    placeholder={"Fee must be at least 1 wei"} 
                                    style={{marginRight: "10px"}}
                                    onChange={e => setUpdateSellFee(e.target.value)}
                                    value={updateSellFee}
                                />

                                <s.Container>
                                {!loadingSellFee &&
                                <s.StyledButtonTransfer
                                    disabled={loadingSellFee ? 1: 0}
                                    style={updateSellFee > 0  && updateSellFee < 10 ? {} : {pointerEvents: "none", opacity: "0.5"}}
                                    onClick={() => {
                                        UpdateSellFee(blockchain.account, blockchain.web3.utils.toWei(updateSellFee, "ether"));
                                        setUpdateSellFee('');
                                    }}
                                >
                                    Update
                                </s.StyledButtonTransfer>
                                }
                                {loadingSellFee &&
                                <s.StyledButtonTransfer
                                    disabled={loadingSellFee ? 1: 0}
                                    style={{pointerEvents: "none"}} 
                                >
                                    <s.StyledButtonLoading/>
                                </s.StyledButtonTransfer>
                                }
                                </s.Container>

                                </s.Container>
                                {updateSellFee > 10 ? (<s.TextDescription>fee is too big !</s.TextDescription>) : (null)}
                            </form>
                        </s.BoxTab>
                        </s.Container>
                    ): (null)}
                  </s.ContainerHome> 
                ) : (null)}
            </s.Container>
        </s.Screen>
        </>
    );
};

export default Admin;
