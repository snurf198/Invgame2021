import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as assets from '../../constants/money';
import CompanyPage from './CompanyPage';
import './index.css';


const InvPageBase = ({round,firebase,history,count}) => {
    const [curms, setCurms] = useState([]);
    const [aftms, setAftms] = useState([]);
    const [names, setNames] = useState([]);
    const [asset, setAsset] = useState(0);
    const [inputs, setInputs] = useState([]);
    const [inputsum, setInputsum] = useState(0);
    const [invDone, setInvDone] = useState(false);
    const [invDoneCheck, setInvDoneCheck] = useState(true);
    const [check, setCheck] = useState(false);
    const [rankedList, setRankedList] = useState([]);

    var fb = firebase;
    var user = fb.auth.currentUser;
    if(user===null){
        history.push(ROUTES.SIGN_IN);
    }
    var uid = user.uid;
    function getInput(data, index, radix){
        var list = inputs;
        var update = 0;
        if(radix===0){   /* 투자 */
            update = data;
        }
        else if(radix===1){  /* 철회 */
            update = - data * (1 - assets.ROUND1_FEE_RATIO);
        }
        else{
            update = 0;
        }
        list[index]=update;
        setInputs(list);
        console.log(inputs.reduce((a, b) => a+b, 0));
    }
    
    useEffect(()=>{
        // document.addEventListener('keypress',function(){setInputsum(inputs.reduce((a, b) => a+b, 0))});
    
        async function getAsset(){
            const snapshot = await fb.db.ref(`/users/${uid}/asset/`).once('value');
            const asset = snapshot.val();
            setAsset(asset);
        }
        
        async function getNames(){
            const snapshot = await fb.db.ref(`/companies/`).once('value');
            const value_list = snapshot.val().map(e=>e.companyname);
            if(names !== value_list)
            {
                setNames(value_list);
            }
            return snapshot;
        }
        async function getCurms(){
            const snapshot = await fb.db.ref('/users/'+uid+`/invest/`).once('value');
            const value_list = Object.values(snapshot.val()).map(e=>e.curm);
            if(curms !== value_list){
                setCurms(value_list);
            }
            return snapshot;
        }
        async function getAftms(){
            const snapshot = await fb.db.ref('/users/'+uid+`/invest/`).once('value');
            const value_list = Object.values(snapshot.val()).map(e=>e.aftm);
            if(aftms !== value_list){
                setAftms(value_list);
            }
            return snapshot;
        }
        async function getRank(){
            var updates = {};
            //updates['/equal1']=false;
            //updates['/round1submitted']=0;
            const snapshot = await fb.db.ref('/companies/').once('value');
            const objs = snapshot.val();
            const companyRankList = objs.sort((a, b) => a[`round${round}rank`] > b[`round${round}rank`] ? 1 : -1);
            return companyRankList.map(res=>res['index']);
        }
        getRank().then(res=>{
            if(rankedList !== res){
                setRankedList(res);
            };
        });
    
        getAsset();
        // setInputsum(inputs.reduce((a, b) => a+b, 0));
        
        if(invDoneCheck){
            console.log("hi");
            getNames();
            getCurms();
            getAftms();
            setInvDoneCheck(false);
        }
        if(invDone){
            setInvDone(false);
        }
        if(check){
            
            // setInputsum(inputs.reduce((a, b) => a+b, 0));
            // console.log(inputsum);
            alert(`니 자산: ${asset-inputs.reduce((a, b) => a+b, 0)}`);
            setCheck(false);
        }
        console.log("lll", inputs);
        // alert(`니 자산: ${asset-inputsum}`);
    },[aftms, asset, curms, fb.db, inputs, invDone, invDoneCheck, names, uid, inputsum, check]);
    
    // setInputsum(inputs.reduce((a, b) => a+b, 0));
            
    async function complete(){
        //CompanyPage.aftm
        setInvDone(true);
        setInvDoneCheck(true);
        var input = inputs.reduce((a,b)=>a+b, 0);
        var updates = {};
        if(asset>=input){
            updates[`/users/${user.uid}/invest/input`]=input;
        
        }
        else{
            const snapshot = await fb.db.ref(`/users/${uid}/invest/`).once('value');
            const curms = Object.values(snapshot.val()).map(e=>e.curm);
            for(var i=0; i<8; i++){
                updates[`/users/${uid}/invest/company${i}/aftm`]=curms[i];
            }
        }
        fb.db.ref().update(updates);
    }
    return (
        <>
        <div class="wrapper">
            <h1 class="header">Game</h1>
            {rankedList.slice(0, count).map(i => <div class={`comp${i}`}><CompanyPage key={i} calc={getInput} name={names[i]} curm={curms[i]} invDone={invDone} aftm={aftms[i]} index={i}/></div>)}
        </div>
        <div>
            <button className="button" onClick={function(){setCheck(true);}}>투자 후 자산 확인하기</button>
            <button className="button" onClick={complete}>저장</button>
        </div>
        </>
        

    );
   
}
const InvPage = withRouter(withFirebase(InvPageBase));
export default InvPage;