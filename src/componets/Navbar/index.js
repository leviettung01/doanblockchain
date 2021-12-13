import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';
import { useDispatch, useSelector } from "react-redux";
import { connect } from '../../redux/blockchain/blockchainActions';
import { useEffect } from "react";
import { fetchData } from "../../redux/data/dataActions"
import { IoWalletOutline } from "react-icons/io5";
import _logo from "../../assets/images/bg/_logo.png"

const Navbar = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const account = blockchain.account;
  const isAdmin = blockchain.account === data.admin.toLowerCase();

    useEffect(() => {
      if (account !== "" && account !== null) {
        dispatch(fetchData(account));
      }
    }, [account, dispatch]);
  
    // only show nav links if there is a connected account
    const links = account !== null
    ? (
      <>
        <NavLink to="/" exact activeStyle>Home</NavLink>
        <NavLink to="/mytruffle" activeStyle>My Truffle</NavLink>
        <NavLink to="/breed" activeStyle>Breed</NavLink>
        <NavLink to="/game" activeStyle>Game</NavLink>
        <NavLink to="/marketplace" activeStyle>Marketplace</NavLink>
      </>
    ) : null
    // only show nav links if there is admin
    const admin = isAdmin
    ? (
        <NavLink to="/admin" activeStyle>Admin</NavLink>
    ) : null

  return (
    <Nav>
      <NavLink to='/'>
        <img src={_logo} alt="Logo" style={{height: "110px", backgroundSize: "cover", backgroundPosition: "cover"}} />
      </NavLink>
      <Bars />
      <NavMenu>
        {admin}
        {links}
        {blockchain.account !== null ? (
        <NavBtn>
          <NavBtnLink 
            to="/mytruffle"
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
          <NavBtnLink to='/mytruffle'  
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
  );
}

export default Navbar
