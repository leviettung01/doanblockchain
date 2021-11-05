import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';
import { useDispatch, useSelector } from "react-redux";
import { connect } from '../../redux/blockchain/blockchainActions';
import { useEffect } from "react";
import { fetchData } from "../../redux/data/dataActions"

const Navbar = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const dispatch = useDispatch();
  const account = blockchain.account;

    useEffect(() => {
      if (account !== "" && account !== null) {
        dispatch(fetchData(account));
      }
    }, [account, dispatch]);
  
    console.log(account);
    
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
        <h1>Logo</h1>
      </NavLink>
      <Bars />
      <NavMenu>
        {links}
      </NavMenu>
        {blockchain.account !== null ? (
          <NavBtn>
          <NavBtnLink to='/'  
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}>
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
            Start
          </NavBtnLink>
        </NavBtn>
        )}
    </Nav>
  </>
  );
}

export default Navbar
