/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { withFirebase } from "../Firebase";
import { withRouter } from 'react-router-dom';
import InvPage from '../InvPage';
import Redirection0 from '../Redirection/redirection0';
import Redirection1 from '../Redirection/redirection1';
import Redirection2 from '../Redirection/redirection2';
import Redirection3 from '../Redirection/redirection3';
import RedirectionF from '../Redirection/redirectionfinal';
import { TimeSlot1, TimeSlot2, TimeSlot3, TimeSlot4, TimeSlot5, TimeSlot6, TimeSlot7, TimeSlot8, TimeSlot9, TimeSlot10 } from '../TimeSlot';
import * as MONEY from '../../constants/money';
import * as TIME from '../../constants/time';
import Rank from '../Rank';
import './index.css';
// import { useBeforeunload } from 'react-beforeunload';

const GamepageBase = () => {
    const [startTime] = useState(TIME.START_TIME);
    const [expired, setExpired] = useState(0);
    const time = [
        0,
        TIME.ACC_ROUND1_VIDEO_OFFSET,
        TIME.ACC_ROUND1_INVEST_OFFSET,
        TIME.ACC_ROUND2_VIDEO_OFFSET,
        TIME.ACC_ROUND2_INVEST_OFFSET,
        TIME.ACC_ROUND3_VIDEO_OFFSET,
        TIME.ACC_ROUND3_INVEST_OFFSET,
        TIME.ACC_FINAL_VIDEO_OFFSET,
        TIME.ACC_FINAL_INVEST_OFFSET,
        TIME.ACC_FINAL_REDIRECTION_OFFSET
    ];
    useEffect(() => {
        if (expired <= 9) {
            setTimeout(() => {
                setExpired(expired + 1);
            }, startTime + time[expired] - new Date().getTime());
        }


    }, [expired, startTime, time]);
   
    switch (expired) {
        case 0:
            return <div className="p5container">
                <TimeSlot1 leftTime={startTime + time[expired] - new Date().getTime()} />
                {/* <InvPage round={1} count={MONEY.ROUND1_TEAM} /> */}
                <iframe className="p5" src="http://editor.p5js.org/quantum0430/embed/-b1N-tDv0"/>
                
            </div>;
        case 1:
            return <>
                <TimeSlot2 leftTime={startTime + time[expired] - new Date().getTime()} />
                <Redirection0 />
            </>;
        case 2:
            // console.log(startTime + time[1] - new Date().getTime());
            return <>
                <TimeSlot3 leftTime={startTime + time[expired] - new Date().getTime()} />
                <InvPage round={1} count={MONEY.ROUND1_TEAM} />

            </>;
        case 3:
            return <>
                <TimeSlot4 leftTime={startTime + time[expired] - new Date().getTime()} />
                <Redirection1 />

            </>;
        case 4:
            return <>
                <TimeSlot5 leftTime={startTime + time[expired] - new Date().getTime()} />
                <InvPage round={2} count={MONEY.ROUND2_TEAM} />

            </>;
        case 5:
            return <>
                <TimeSlot6 leftTime={startTime + time[expired] - new Date().getTime()} />
                <Redirection2 />

            </>;
        case 6:
            return <>
                <TimeSlot7 leftTime={startTime + time[expired] - new Date().getTime()} />
                <InvPage round={3} count={MONEY.ROUND3_TEAM} />

            </>;
        case 7:
            return <>
                <TimeSlot8 leftTime={startTime + time[expired] - new Date().getTime()} />
                <Redirection3 />

            </>;
        case 8:
            return <>
                <TimeSlot9 leftTime={startTime + time[expired] - new Date().getTime()} />
                <InvPage round={4} count={MONEY.FINAL_TEAM} />

            </>;
        case 9:
            return <>
                <TimeSlot10 leftTime={startTime + time[expired] - new Date().getTime()} />
                <RedirectionF />

            </>;
        default:
            return <div>
                <Rank />
            </div>;
    }
}

const GamePage = withRouter(withFirebase(GamepageBase));

export default GamePage;