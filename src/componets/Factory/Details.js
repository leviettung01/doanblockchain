import React, { useEffect , useState} from 'react';
import * as s from "../../styles/globalStyles";
import TruffleRenderer from "../TruffleRenderer";
import { BiDna } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData} from "../../redux/data/dataActions";
import { removeData } from '../../redux/data/dataActions';
import _color from "../../assets/images/bg/_color.png";

const Details = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const blockchain = useSelector((state) => state.blockchain);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const list = data.allOwnerTruffles;
  const [toggleState, setToggleState] = useState(1);
  const [name, setName] = useState();
  const [stateTransfer, setStateTransfer] = useState(0);
  //toggleTab
  const toggleTab = (index) => {
    setToggleState(index);
  }

  // levelUpzombie
  const levelUpZombie = (_account, _id) => {
      setLoading(true);
      blockchain.TruffleFactory.methods
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
  //transfer
  const transferToken = (_account, _from, _to, _tokenId) => {
    setLoading(true);
    blockchain.TruffleFactory.methods
      .safeTransferFrom( _from, _to, _tokenId)
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
  });
};

  //updateNameZombie
  const updateNameTruffle = (_account, _id, _newName ) => {
    setLoading(true);
    blockchain.TruffleFactory.methods
      .updateName(_id, _newName)
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
        {list.filter(item => item.id === id).map((item, index) => (
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
              <s.Container ai={"center"} jc={"space-around"} fd={"row"} style={{marginTop: "10.8rem"}} >
                <s.StyledButtonAction style={{marginRight: "5px"}}>Breed</s.StyledButtonAction>
                {!loading && 
                <s.StyledButtonAction 
                  disabled={loading ? 1: 0}
                  onClick={(e) => {
                    e.preventDefault();
                    levelUpZombie(blockchain.account, item.id)
                  }}
                >
                  Level Up
                </s.StyledButtonAction>
                }
                {loading && 
                <s.StyledButtonAction 
                  disabled={loading ? 1: 0}
                  onClick={(e) => {
                    e.preventDefault();
                    levelUpZombie(blockchain.account, item.id)
                  }}
                >
                  <s.StyledButtonLoadingAction/>
                </s.StyledButtonAction>
                }
              </s.Container>
            </s.ContainerDetails>
          </s.Container>
          {/* tabbar    */}
          <s.SpacerSuperLarge/>
          <s.Container ai={"center"}>
            <s.MenuTabs >
              <s.Tabs 
                className={toggleState === 1 ? "active-tab" : null}
                onClick={() => toggleTab(1)}
              >
                Items
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
              <s.TextTitle style={{marginLeft: "10px"}}>
                Comming soon...
              </s.TextTitle>
            </s.Container>
            ): (null)}
            {toggleState === 2 ? (
            <s.Container  ai={"center"} style={{marginTop: "5rem"}}>
              <s.TextSubTitle >Change this truffle name</s.TextSubTitle>
              <s.Container flex={1} fd={"row"} ai={"center"} jc={"center"}>
                <s.InputTransfer 
                  placeholder={"Mickey"} 
                  style={{marginRight: "5px"}}
                  onChange={e => setName(e.target.value)}
                />
                <s.StyledButtonTransfer
                    onClick={() => {
                      updateNameTruffle(blockchain.account, item.id, setName(name));
                  }}
                >
                  Update
                </s.StyledButtonTransfer>
              </s.Container>
            </s.Container>
            ): (null)}
            {toggleState === 3 ? (
            <s.Container  ai={"center"} style={{marginTop: "5rem"}}>
              <s.TextSubTitle >Transfer this Truffle to someone</s.TextSubTitle>
              <s.Container flex={1} fd={"row"} ai={"center"} jc={"center"}>
                <s.InputTransfer 
                  placeholder={"0x92Da0E5C9D58AcCDCA6E280a2F632B23D9aA0705"} 
                  style={{marginRight: "5px"}}
                  onChange={e => setStateTransfer(e.target.value)}
                />
                <s.StyledButtonTransfer
                  onClick={() => {
                    transferToken(blockchain.account, setStateTransfer(stateTransfer), item.id)
                  }}
                >
                  Transfer
                </s.StyledButtonTransfer>
              </s.Container>
            </s.Container>
            ): (null)}
          </s.Container>
        ))}
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
};

export default Details;