import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';
import { useDispatch, useSelector } from "react-redux";
import { connect } from '../../redux/blockchain/blockchainActions';
import { useEffect } from "react";
import { fetchData } from "../../redux/data/dataActions"
import { IoWalletOutline } from "react-icons/io5";
import _logo from "../../assets/images/bg/_logo.png"

const Navbar = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const dispatch = useDispatch();
  const account = blockchain.account;

    useEffect(() => {
      if (account !== "" && account !== null) {
        dispatch(fetchData(account));
      }
    }, [account, dispatch]);
  
    // console.log(account);
    
    const links = blockchain.account !== null
    ? (
      <>
        <NavLink to="/" exact activeStyle>My Truffle</NavLink>
        <NavLink to="/breed" activeStyle>Breed</NavLink>
        <NavLink to="/marketplace" activeStyle>Marketplace</NavLink>
      </>
    ) : null

  return (
    <>
    <Nav>
      <NavLink to='/' exact>
        <img src={_logo} alt="Logo" style={{height: "110px", backgroundSize: "cover", backgroundPosition: "cover"}} />
      </NavLink>
      <Bars />
      <NavMenu>
        {links}
        {blockchain.account !== null ? (
        <NavBtn>
          <NavBtnLink 
            to="/"
            style={{pointerEvents: "none"}}
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            {account.substring(0, 4)}....
            {account.substring(account.length - 4)}
          </NavBtnLink>
        </NavBtn>
        ) : (
        <NavBtn>
          <NavBtnLink to='/'  
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}>
            <IoWalletOutline style={{paddingRight: "10px"}}/>
            Wallet Connect
          </NavBtnLink>
        </NavBtn>
        )}
      </NavMenu>
    </Nav>
  </>
  );
}

export default Navbar
