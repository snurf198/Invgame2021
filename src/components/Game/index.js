import React, {useEffect, useState} from 'react';
import * as assets from '../../constants/money';
import { withAuthorization } from '../Session';
import { SignUpForm } from '../SignUp';
import { withFirebase } from "../Firebase";
import { Link, withRouter } from 'react-router-dom';
import Video1 from '../Video/Video1';
import Video2 from '../Video/video2';
import Video3 from '../Video/video3';
import Final from '../Video/final';
import InvPage from '../InvPage';
import Redirection1 from '../Redirection/redirection1';
import Redirection2 from '../Redirection/redirection2';
import Redirection3 from '../Redirection/redirection3';
import RedirectionF from '../Redirection/redirectionfinal';
import {TimeSlot1, TimeSlot2, TimeSlot3, TimeSlot4, TimeSlot5, TimeSlot6, TimeSlot7, TimeSlot8, TimeSlot9} from '../TimeSlot';
import * as MONEY from '../../constants/money';
import * as TIME from '../../constants/time';
import Rank from '../Rank';
// import { useBeforeunload } from 'react-beforeunload';

const GamepageBase = (props) => {
    const [startTime, setStartTime] =  useState(TIME.START_TIME); //useState(new Date().getTime());
    const [expired, setExpired] = useState(0);
    const [index, setIndex] = useState(0);
    const time = [20000, 80000, 90000, 110000, 170000, 180000, 200000, 260000, 270000, 300000, 310000, 320000, 330000];
    useEffect(() => {
        if(expired <=11 ){
            setTimeout(()=>{
                setExpired(expired+1);
            }, startTime + time[expired] - new Date().getTime());
        }

        
    }, [expired]);
    // useBeforeunload(() => "You'll lose your data!");
//     window.addEventListener("beforeunload", (ev) => 
// { 
//     ev.preventDefault();
//     alert("hey");
//     const fb = props.firebase;
//     console.log(fb.auth.currentUser);
//     return ev.returnValue = 'Are you sure you want to close?';
// });
    switch (expired){
        case 0:
            return <>
                <Video1 />
                <TimeSlot1 leftTime={startTime + time[expired] - new Date().getTime()} />
            </>;
        case 1:
            console.log(startTime + time[1] - new Date().getTime());
            return <>
                <InvPage round={1} count={MONEY.ROUND1_TEAM} />
                <TimeSlot2 leftTime={startTime + time[expired] - new Date().getTime()} />
            </>; 
        case 2:
            return <>
                <Redirection1/>
            </>;
        case 3:
            return <>
                <Video1/>
                <TimeSlot3 leftTime={startTime + time[expired] - new Date().getTime()} />
            </>;
        case 4:
            return <>
                <InvPage round={2} count={MONEY.ROUND2_TEAM}/>
                <TimeSlot4 leftTime={startTime + time[expired] - new Date().getTime()} />
            </>;
        case 5:
            return <>
                <Redirection2/>
            </>;
        case 6:
            return <>
                <Video1 />
                <TimeSlot5 leftTime={startTime + time[expired] - new Date().getTime()} />
            </>;
        case 7:
            return <>
                <InvPage round={3} count={MONEY.ROUND3_TEAM}/>
                <TimeSlot6 leftTime={startTime + time[expired] - new Date().getTime()} />
            </>;
        case 8:
            return <>
                <Redirection3/>
            </>;
        case 9:
            return <>
                <Final />
                <TimeSlot7 leftTime={startTime + time[expired] - new Date().getTime()} />
            </>;
        case 10:
            return <>
                <InvPage round={4} count={MONEY.FINAL_TEAM} />
                <TimeSlot8 leftTime={startTime + time[expired] - new Date().getTime()} />
            </>;
        case 11:
            return <>
                <RedirectionF />
                <TimeSlot9 leftTime={startTime + time[expired] - new Date().getTime()} />
            </>;
        default:
            return <div>
                <div>Rank!</div>
                <Rank />
            </div>;
    }
}

const GamePage = withRouter(withFirebase(GamepageBase));

export default GamePage;