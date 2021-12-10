import React from 'react'
import * as s from "../styles/globalStyles";
import {Link} from "react-router-dom";
import TruffleRenderer from "./TruffleRenderer";
import revealtruffle from "../assets/images/bg/_revealtruffle.png";

const RenderSell = ({data, blockchain,loading}) => {
    if(loading) {
        return (
            <s.Container jc={"center"} ai={"center"} >
                    <s.ImageToggleRender image={revealtruffle} />
                    <s.TextTitle>The system is in the process, please wait !</s.TextTitle>
                    <s.BoxLoadingRender>
                        <s.StyledButtonLoading/>
                    </s.BoxLoadingRender>
            </s.Container>
        )
    }

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
    
    return (
        <s.Container jc={"flex-start"} fd={"row"} style={{flexWrap: "wrap"}}>
            {data.filter(item => item.sell > 0).map(item => ( 
            <s.Box key={item.id} style={{ padding: "18px", margin:"15px"}}>
                <s.StyledImg>
                <Link to={`/details/${item.id}`} >
                    <TruffleRenderer truffle={item}/>
                </Link>
                </s.StyledImg>
                <>
                <s.StyledTextBox>
                    <s.TextDescription>{item.name}</s.TextDescription>
                    <s.TextSubTitle>Price</s.TextSubTitle>
                </s.StyledTextBox>
                <s.StyledTextBox>
                    <s.TextDescription>#{item.id}</s.TextDescription>
                    <s.StyledButtonPrice>
                        <s.TextDescription>{blockchain.web3.utils.fromWei(item.sell,"ether")} ETH</s.TextDescription>
                    </s.StyledButtonPrice>
                </s.StyledTextBox>  
                <s.TextSubTitle>
                    {fromNow(item.sellTime * 1000)}
                </s.TextSubTitle>
                <s.StyledTextBoxBoder>
                    <s.TextSubTitle>Rarity: <span style={{color: "#ffffff"}}>{item.rarity}</span></s.TextSubTitle>
                    <s.TextSubTitle>Level: <span style={{color: "#ffffff"}}>{item.level}</span></s.TextSubTitle>
                </s.StyledTextBoxBoder>
                </>
            </s.Box>
        ))}
        </s.Container>
    );
}

export default RenderSell
