import React from "react";
import * as s from "../styles/globalStyles";

const Footer = () => {

    return (
      <s.Container style={{ backgroundColor: "#25272E", position: "relative", zIndex: "2"}} jc={"center"} ai={"center"}>
        <s.Containerfooter>
            
            <s.TextSubTitleFooterContent>@2021 Truffle,All Rights Reserved</s.TextSubTitleFooterContent>
            <s.TextSubTitleFooterContent>Made with ♡ Hoang&Hai</s.TextSubTitleFooterContent>
        </s.Containerfooter>
      </s.Container>
    )
}

export default Footer
