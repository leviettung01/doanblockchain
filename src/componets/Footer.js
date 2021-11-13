import React, { useEffect , useState} from 'react';
import * as s from "../styles/globalStyles";
import { useSelector } from "react-redux";

const Footer = () => {
    const data = useSelector((state) => state.data);
    const blockchain = useSelector((state) => state.blockchain);

    return (
        <s.Footer>
            <s.TextSubTitleFooter>
              Account: {blockchain.account}
            </s.TextSubTitleFooter>
            <s.TextSubTitleFooter>
              Total Truffle in game: {data.allTruffles.length}
              </s.TextSubTitleFooter>
        </s.Footer>
    )
}

export default Footer
