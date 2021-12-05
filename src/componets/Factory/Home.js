import { useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import _bg from "../../assets/images/bg/_bg.png";
import reveal from "../../assets/images/bg/reveal.png";
import { CgAddR } from "react-icons/cg";
import Confetti from 'react-confetti'
import RenderSell from "../RenderSell";
import RenderAll from "../RenderAll";
import RenderStatus from "../RenderStatus";
import Pagination from "../Pagination";

const Home = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [loading, setLoading] = useState(false);
    const [loadingShow, setLoadingShow] = useState(false);
    const [toggleState, setToggleState] = useState(1);

    const name = "Magic Truffle";

    const confettiRef = useRef(null);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    //GetCurrentItems
    const indexOfLastItem = currentPage * pageNumberLimit;
    const indexOfFirstItem = indexOfLastItem - pageNumberLimit;
    const currentItems = data.allOwnerTruffles.slice(indexOfFirstItem, indexOfLastItem);
    const currentItemsSell = data.allOwnerTruffles.filter(item => item.sell > 0).slice(indexOfFirstItem, indexOfLastItem);
    const currentItemsStatus = data.allOwnerTruffles.filter(item => parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0).slice(indexOfFirstItem, indexOfLastItem);

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
  
    const mintNFT = (_account,_name) => {
      setLoading(true);
      setLoadingShow(false);
      blockchain.truffleFactory.methods
        .createRandomTruffle(_name)
        .send({
          from: _account,
          value: blockchain.web3.utils.toWei("0.025", "ether"),
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
      <Confetti 
        style={{position: "absolute", top: "-200px", zIndex: 1}}
        recycle={true}
        numberOfPieces={200}
        height={900}
        width={1900}
      />
      <s.ImageToggle image={reveal} />
      <s.TextTitle>
        Congratulations, you now own a Truffle. Click Close to return.
      </s.TextTitle>
      <s.StyledButton
        onClick={() => {
          setLoadingShow(false);
        }}
      >
        Close
      </s.StyledButton>
      </s.Containertoggle>
      
      <s.Screen image={_bg} className={loadingShow === true ? "blur" : null} >
        {blockchain.account === "" || blockchain.truffleFactory === null ? (
          <s.Container flex={1} ai={"center"} jc={"center"}>
            <s.BoxHome>
              <s.TextTitleHome>Collectible.</s.TextTitleHome>
              <s.TextTitleHome>Breedable.</s.TextTitleHome>
              <s.TextTitleHome>Adorable.</s.TextTitleHome> 
              <s.TextSubTitleHome>collect and breed digital truffles.</s.TextSubTitleHome>
              <s.SpacerSmall />
              <s.StyledButton 
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                }}
              >
                Start Collectible
              </s.StyledButton>
              <s.SpacerXSmall />
              {blockchain.errorMsg !== "" ? (
                <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
              ) : null}
            </s.BoxHome>
          </s.Container>
        ) : (
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
                Ready {toggleState === 3 ? '(' + data.allOwnerTruffles.filter(item => parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0).length + ')' : null}
              </s.TabHome>
            </s.MenuTabsHome>
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
              pageNumberLimit={pageNumberLimit} 
              totalItems={data.allOwnerTruffles.filter(item => item.sell > 0).length} 
              paginate={paginate} 
              currentPage={currentPage} 
              handleNextbtn={handleNextbtn}
              handlePrevbtn={handlePrevbtn}
              maxPageNumberLimit={maxPageNumberLimit}
              minPageNumberLimit={minPageNumberLimit}
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
                pageNumberLimit={pageNumberLimit} 
                totalItems={data.allOwnerTruffles.filter(item => parseInt((item.readyTime - Date.now() / 1000) / 3600) <= 0).length} 
                paginate={paginate} 
                currentPage={currentPage} 
                handleNextbtn={handleNextbtn}
                handlePrevbtn={handlePrevbtn}
                maxPageNumberLimit={maxPageNumberLimit}
                minPageNumberLimit={minPageNumberLimit}
              />
              <RenderStatus data={currentItemsStatus} loading={loading}/>
            </>
          )}
          </s.ContainerHome> 
        ) : (null)}
        </s.Container>
        )}
      </s.Screen>
      </>
    );
}

export default Home;
