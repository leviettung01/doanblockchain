import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import TruffleRenderer from "../TruffleRenderer";
import _color from "../../assets/images/bg/_color.png";
import { BiDna } from "react-icons/bi";
import {Link} from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [loading, setLoading] = useState(false);
    const name = "Truffle";
  
    console.log(data);

    const mintNFT = (_account,_name) => {
      setLoading(true);
      blockchain.TruffleFactory.methods
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
        });
    };

    useEffect(() => {
        if (blockchain.account !== "" && blockchain.TruffleFactory !== null) {
          dispatch(fetchData(blockchain.account));
        }
      }, [blockchain.account, blockchain.TruffleFactory, dispatch]);
      
    console.log(blockchain.account)

    return (
        <s.Screen image={_color}>
          {blockchain.account === "" || blockchain.TruffleFactory === null ? (
            <s.Container flex={1} ai={"center"} jc={"center"}>
              <s.TextTitle style={{textAlign: "center", fontSize: "25px"}}>Wellcom to Project Truffle</s.TextTitle>
              <s.TextTitle>Connect to the Game</s.TextTitle>
              <s.SpacerSmall />
              <s.StyledButton 
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                }}
              >
                Connect
              </s.StyledButton>
              <s.SpacerXSmall />
              {blockchain.errorMsg !== "" ? (
                <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
              ) : null}
            </s.Container>
          ) : (
            <s.Container ai={"center"} >
              {/* Kiểm tra xem owner có sở hữu nấm hay không ? nếu có thì getAllTruffle */}
              {data.allOwnerTruffles.length === 0 ? ( <> 
              <s.TextTitle style={{textAlign: "center", fontSize: "25px"}}>
                We noticed that you do not have any Truffle to start with.
              </s.TextTitle>
              <s.TextTitle style={{textAlign: "center", fontSize: "25px"}}>
                Click on the CREATE button below to generate a Truffle, please note this will cost 0.025 ETH
              </s.TextTitle>
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
              </> 
              ) : (
              <s.Container  ai={"center"} style={{paddingTop: "24px"}} >
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
                <s.Container jc={"center"} fd={"row"} style={{flexWrap: "wrap"}}>
                  {data.allOwnerTruffles.map((item, index) => {
                    return (
                      <s.Box key={index} style={{ padding: "15px", margin:"15px"}}>
                        <s.StyledImg>
                          <Link to={`/details/${item.id}`} >
                            <TruffleRenderer truffle={item}/>
                          </Link>
                        </s.StyledImg>
                        <s.SpacerXSmall />
                        <s.Container >
                          <s.StyledTextBoxName>
                            <s.TextDescription>{item.name}</s.TextDescription>
                          </s.StyledTextBoxName>
                            <s.TextDescription>#{item.id}</s.TextDescription>
                            <s.TextDescription><BiDna/> {item.dna}</s.TextDescription>
                          <s.StyledTextBox>
                            <s.TextDescription>Rarity: {item.rarity}</s.TextDescription>
                            <s.TextDescription>Level: {item.level}</s.TextDescription>
                          </s.StyledTextBox>
                          {/* <s.StyledButton
                            disabled={loading ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              levelUpZombie(blockchain.account, item.id);
                            }}
                          >
                            Level Up
                          </s.StyledButton> */}
                        </s.Container>
                      </s.Box>
                    );
                  })}
                </s.Container> 
              </s.Container>
              )}
            </s.Container>
          )}
          <s.Footer>
            <s.TextSubTitleFooter>
              Account: {blockchain.account}
            </s.TextSubTitleFooter>
            <s.TextSubTitleFooter>
              Total Truffle in game: {data.allTruffles.length}
              </s.TextSubTitleFooter>
          </s.Footer>
        </s.Screen>
      );
}

export default Home;
