import { useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/data/dataActions";
import * as s from "../styles/globalStyles";
import _bg from "../assets/images/bg/_bg.png"
import _reveal from "../assets/images/bg/reveal.png";
import { CgAddR } from "react-icons/cg";
import RenderSell from "../componets/RenderSell";
import RenderAll from "../componets/RenderAll";
import RenderStatus from "../componets/RenderStatus";
import Pagination from "../componets/Pagination";

const Mytruffle = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [loading, setLoading] = useState(false);
    const [loadingShow, setLoadingShow] = useState(false);
    const [toggleState, setToggleState] = useState(1);

    const name = "Magic Truffle";
    const nameFree = "Free Truffle";

    const time =  data.allOwnerTruffles.filter(item => parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0).length
    const sell = data.allOwnerTruffles.filter(item => item.sell > 0).length
    const kq = time - sell

    // console.log(data.admin.toLowerCase() === blockchain.account)

    const confettiRef = useRef(null);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    //GetCurrentItems
    const indexOfLastItem = currentPage * pageNumberLimit;
    const indexOfFirstItem = indexOfLastItem - pageNumberLimit;
    const currentItems = data.allOwnerTruffles.slice(indexOfFirstItem, indexOfLastItem);

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber); 

    //NextPage
    const handleNextbtn = () => {
      setCurrentPage(currentPage + 1);
      if(currentPage + 1 > maxPageNumberLimit) {
        setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }

    //PrevPage
    const handlePrevbtn = () => {
      setCurrentPage(currentPage - 1);
      if((currentPage - 1) % pageNumberLimit === 0) {
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    }
    //{state sell my truffle}
    const [currentPage1, setCurrentPage1] = useState(1);
    const [pageNumberLimit1] = useState(5);
    const [maxPageNumberLimit1, setmaxPageNumberLimit1] = useState(5);
    const [minPageNumberLimit1, setminPageNumberLimit1] = useState(0);

    //GetCurrentItems
    const indexOfLastItem1 = currentPage1 * pageNumberLimit1;
    const indexOfFirstItem1 = indexOfLastItem1 - pageNumberLimit1;
    const currentItemsSell = data.allOwnerTruffles.filter(item => item.sell > 0).slice(indexOfFirstItem1, indexOfLastItem1);
    //change page
    const paginate1 = (pageNumber) => setCurrentPage1(pageNumber); 

    //NextPage
    const handleNextbtn1 = () => {
      setCurrentPage1(currentPage1 + 1);
      if(currentPage1 + 1 > maxPageNumberLimit1) {
        setmaxPageNumberLimit1(maxPageNumberLimit1 + pageNumberLimit1);
        setminPageNumberLimit1(minPageNumberLimit1 + pageNumberLimit1);
      }
    }

    //PrevPage
    const handlePrevbtn1 = () => {
      setCurrentPage1(currentPage1 - 1);
      if((currentPage1 - 1) % pageNumberLimit1 === 0) {
        setmaxPageNumberLimit1(maxPageNumberLimit1 - pageNumberLimit1);
        setminPageNumberLimit1(minPageNumberLimit1 - pageNumberLimit1);
      }
    }
    // {state price}
    const [currentPage2, setCurrentPage2] = useState(1);
    const [pageNumberLimit2] = useState(5);
    const [maxPageNumberLimit2, setmaxPageNumberLimit2] = useState(5);
    const [minPageNumberLimit2, setminPageNumberLimit2] = useState(0);

    //GetCurrentItems
    const indexOfLastItem2 = currentPage2 * pageNumberLimit2;
    const indexOfFirstItem2 = indexOfLastItem2 - pageNumberLimit2;
    const currentItemsStatus = (data.allOwnerTruffles.filter(item => parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0)).slice(indexOfFirstItem2, indexOfLastItem2);
    //change page
    const paginate2 = (pageNumber) => setCurrentPage2(pageNumber); 

    //NextPage
    const handleNextbtn2 = () => {
      setCurrentPage2(currentPage2 + 1);
      if(currentPage2 + 1 > maxPageNumberLimit2) {
        setmaxPageNumberLimit2(maxPageNumberLimit2 + pageNumberLimit2);
        setminPageNumberLimit2(minPageNumberLimit2 + pageNumberLimit2);
      }
    }

    //PrevPage
    const handlePrevbtn2 = () => {
      setCurrentPage2(currentPage2 - 1);
      if((currentPage2 - 1) % pageNumberLimit2 === 0) {
        setmaxPageNumberLimit1(maxPageNumberLimit2 - pageNumberLimit2);
        setminPageNumberLimit1(minPageNumberLimit2 - pageNumberLimit2);
      }
    }


    //Fee = 0.025
    const mintFee = (data.mintFee / 1000000000000000000).toString();
    
    const mintNFT = (_account,_name) => {
      setLoading(true);
      setLoadingShow(false);
      blockchain.truffleFactory.methods
        .createRandomTruffle(_name)
        .send({
          from: _account,
          value: blockchain.web3.utils.toWei(mintFee, "ether"),
        })
        .once("error", (err) => {
          setLoading(false);
          console.log(err);
        })
        .then((receipt) => {
          setLoading(false);
          console.log(receipt);
          dispatch(fetchData(blockchain.account));
          setLoadingShow(true);
        });
    };
    // Fee = 0
    const mintNFTFree = (_account,_name) => {
      setLoading(true);
      setLoadingShow(false);
      blockchain.truffleFactory.methods
        .createRandomTruffleFree(_name)
        .send({
          from: _account,
        })
        .once("error", (err) => {
          setLoading(false);
          console.log(err);
        })
        .then((receipt) => {
          setLoading(false);
          console.log(receipt);
          dispatch(fetchData(blockchain.account));
          setLoadingShow(true);
        });
    };

    //toggleTab
    const toggleTab = (index) => {
      setToggleState(index);
    }

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
        <s.ImageToggle image={_reveal} />
        <s.TextTitle>
          Congratulations, you now own a Truffle. Click Close to return.
        </s.TextTitle>
        <s.Container fd={"row"} jc={"center"} ai={"center"} style={{marginTop: "50px"}}>
          <s.StyledButton
            onClick={() => {
              setLoadingShow(false);
            }}
          >
            Close
          </s.StyledButton>
        </s.Container>
      </s.Containertoggle>
      
      <s.Screen image={_bg} className={loadingShow === true ? "blur" : null} >
        <s.Container jc={"center"} ai={"center"} style={{paddingTop: "3rem", marginTop: "4.5rem"}}>
          <s.ContainerTabBar>
            <s.MenuTabsHome>
              <s.TabHome
                className={toggleState === 1 ? "active-tab" : null}
                onClick={() => toggleTab(1)}
              >
                All {toggleState === 1 ? '(' + data.allOwnerTruffles.length + ')' : null}
              </s.TabHome>
              <s.TabHome
                className={toggleState === 2 ? "active-tab" : null}
                onClick={() => toggleTab(2)}
              >
                On Sell {toggleState === 2 ? '(' + data.allOwnerTruffles.filter(item => item.sell > 0).length + ')' : null}
              </s.TabHome>
              <s.TabHome
                className={toggleState === 3 ? "active-tab" : null}
                onClick={() => toggleTab(3)}
              >
                Ready {toggleState === 3 ? '(' + kq + ')' : null}
              </s.TabHome>
            </s.MenuTabsHome>
            {/* //check free */}
            {data.allOwnerTruffles.length < 2 && data.allOwnerTruffles.filter(item => item.rarity <= 5).length < 2 ? (
            <>
              {/* //Free */}
              {!loading &&
                <s.StyledButtonHome
                  disabled={loading ? 1 : 0}
                  style={data.allOwnerTruffles.length === 0 ? {display: "none"} : {}}
                  onClick={(e) => {
                    e.preventDefault();
                    mintNFTFree(blockchain.account, nameFree);
                  }}
                >
                  <CgAddR style={{paddingRight: "10px"}}/> Free truffle ({data.allOwnerTruffles.length}/2)
                </s.StyledButtonHome>
                }
                {loading &&
                <s.StyledButtonHome
                  style={data.allOwnerTruffles.length === 0 ? {display: "none"} : {pointerEvents: "none"}}
                  disabled={loading ? 1 : 0}
                >
                  <s.StyledButtonLoading />
                </s.StyledButtonHome>
              }
            </>
            ) : (
              <>
                {/* Fee */}
                {!loading &&
                  <s.StyledButtonHome
                    disabled={loading ? 1 : 0}
                    style={data.allOwnerTruffles.length === 0 ? {display: "none"} : {}}
                    onClick={(e) => {
                      e.preventDefault();
                      mintNFT(blockchain.account, name);
                    }}
                  >
                    <CgAddR style={{paddingRight: "10px"}}/> New truffle
                  </s.StyledButtonHome>
                  }
                  {loading &&
                  <s.StyledButtonHome
                    style={data.allOwnerTruffles.length === 0 ? {display: "none"} : {pointerEvents: "none"}}
                    disabled={loading ? 1 : 0}
                  >
                    <s.StyledButtonLoading />
                  </s.StyledButtonHome>
                }
              </>
            )}
          </s.ContainerTabBar>
          {toggleState === 1 ? (
          <s.ContainerHome jc={"center"} ai={"center"} style={{flexWrap: "wrap", margin: "27px "}}>
            {data.allOwnerTruffles.length === 0 ? (
              <s.Container flex={1} ai={"center"} jc={"center"}>
                {/* Kiểm tra xem owner có sở hữu nấm hay không ? nếu có thì getAllTruffle */}
                <s.TextTitle>
                  Hi, Welcome to the Truffles game (beta version 1.0)
                </s.TextTitle>
                <s.TextSubTitleHome>
                  We noticed that you do not have any Truffle to start with.
                </s.TextSubTitleHome>
                <s.TextSubTitleHome>
                  Start by creating your first Truffle. Make sure you take good care of your Truffle by sending it to school.
                </s.TextSubTitleHome>
                <s.TextSubTitleHome>
                  Click on the CREATE button below to generate a Truffle.
                </s.TextSubTitleHome>
                <s.TextSubTitleHome>
                  (You get the first two free CREATE, but will limit some things)
                </s.TextSubTitleHome>
                <s.SpacerSmall />
                {!loading &&
                <s.StyledButton
                  disabled={loading ? 1 : 0}
                  onClick={(e) => {
                    e.preventDefault();
                    mintNFTFree(blockchain.account, nameFree);
                  }}
                >
                  Create
                </s.StyledButton>
                }
                {loading &&
                <s.StyledButton
                  style={{pointerEvents: "none"}}
                  disabled={loading ? 1 : 0}
                  onClick={(e) => {
                    e.preventDefault();
                    mintNFT(blockchain.account, name);
                  }}
                >
                  <s.StyledButtonLoading />
                </s.StyledButton>
                }
                <s.SpacerMedium />
              </s.Container>
            ) : (
            <>
            <Pagination 
              pageNumberLimit={pageNumberLimit} 
              totalItems={data.allOwnerTruffles.length} 
              paginate={paginate} currentPage={currentPage} 
              handleNextbtn={handleNextbtn}
              handlePrevbtn={handlePrevbtn}
              maxPageNumberLimit={maxPageNumberLimit}
              minPageNumberLimit={minPageNumberLimit}
            />
            <RenderAll data={currentItems} loading={loading}/>
            </>
          )}
          </s.ContainerHome> 
        ) : (null)}
        {/* toggle 2 */}
        {toggleState === 2 ? (
          <s.ContainerHome jc={"center"} ai={"center"} style={{flexWrap: "wrap", margin: "27px "}}>
          {data.allOwnerTruffles.length === 0 ? (
            <s.Container flex={1} ai={"center"} jc={"center"}>
              {/* Kiểm tra xem owner có sở hữu nấm hay không ? nếu có thì getAllTruffle */}
              <s.TextTitle>
                Hi, Welcome to the Truffles game (beta version 1.0)
              </s.TextTitle>
              <s.TextSubTitleHome>
                We noticed that you do not have any Truffle to start with.
              </s.TextSubTitleHome>
              <s.TextSubTitleHome>
                Start by creating your first Truffle. Make sure you take good care of your Truffle by sending it to school.
              </s.TextSubTitleHome>
              <s.TextSubTitleHome>
                Click on the CREATE button below to generate a Truffle.
              </s.TextSubTitleHome>
              <s.SpacerSmall />
              {!loading &&
              <s.StyledButton
                disabled={loading ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  mintNFT(blockchain.account, name);
                }}
              >
                Create
              </s.StyledButton>
              }
              {loading &&
              <s.StyledButton
                style={{pointerEvents: "none"}}
                disabled={loading ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  mintNFT(blockchain.account, name);
                }}
              >
                <s.StyledButtonLoading />
              </s.StyledButton>
              }
              <s.SpacerMedium />
            </s.Container>
          ) : (
          <>
            <Pagination 
              pageNumberLimit={pageNumberLimit1} 
              totalItems={data.allOwnerTruffles.filter(item => item.sell > 0).length} 
              paginate={paginate1} 
              currentPage={currentPage1} 
              handleNextbtn={handleNextbtn1}
              handlePrevbtn={handlePrevbtn1}
              maxPageNumberLimit={maxPageNumberLimit1}
              minPageNumberLimit={minPageNumberLimit1}
            />
            {data.allOwnerTruffles.filter(item => item.sell > 0).length ? (
              <RenderSell data={currentItemsSell} blockchain={blockchain} loading={loading}/>
            ) : (
              <s.Container ai={"center"}>
                <div style={{height: "422px", marginTop: "50px"}}>
                  <s.TextTitle>
                    No items on sale. 
                  </s.TextTitle>
                </div>
              </s.Container>
            )}
          </>
          )}    
          </s.ContainerHome> 
        ) : (null)}
        {/* toggle 3 */}
        {toggleState === 3 ? (
          <s.ContainerHome jc={"center"} ai={"center"} style={{flexWrap: "wrap", margin: "27px "}}>
            {data.allOwnerTruffles.length === 0 ? (
              <s.Container flex={1} ai={"center"} jc={"center"}>
                {/* Kiểm tra xem owner có sở hữu nấm hay không ? nếu có thì getAllTruffle */}
                <s.TextTitle>
                  Hi, Welcome to the Truffles game (beta version 1.0)
                </s.TextTitle>
                <s.TextSubTitleHome>
                  We noticed that you do not have any Truffle to start with.
                </s.TextSubTitleHome>
                <s.TextSubTitleHome>
                  Start by creating your first Truffle. Make sure you take good care of your Truffle by sending it to school.
                </s.TextSubTitleHome>
                <s.TextSubTitleHome>
                  Click on the CREATE button below to generate a Truffle.
                </s.TextSubTitleHome>
                <s.SpacerSmall />
                {!loading &&
                <s.StyledButton
                  disabled={loading ? 1 : 0}
                  onClick={(e) => {
                    e.preventDefault();
                    mintNFT(blockchain.account, name);
                  }}
                >
                  Create
                </s.StyledButton>
                }
                {loading &&
                <s.StyledButton
                  style={{pointerEvents: "none"}}
                  disabled={loading ? 1 : 0}
                  onClick={(e) => {
                    e.preventDefault();
                    mintNFT(blockchain.account, name);
                  }}
                >
                  <s.StyledButtonLoading />
                </s.StyledButton>
                }
                <s.SpacerMedium />
              </s.Container>
            ) : (
            <>
              <Pagination 
                pageNumberLimit={pageNumberLimit2} 
                totalItems={kq} 
                paginate={paginate2} 
                currentPage={currentPage2} 
                handleNextbtn={handleNextbtn2}
                handlePrevbtn={handlePrevbtn2}
                maxPageNumberLimit={maxPageNumberLimit2}
                minPageNumberLimit={minPageNumberLimit2}
              />
              <RenderStatus data={currentItemsStatus} loading={loading}/>
            </>
          )}
          </s.ContainerHome> 
        ) : (null)}
        </s.Container>
      </s.Screen>
      </>
    );
}

export default Mytruffle
