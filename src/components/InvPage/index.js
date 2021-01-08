import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as assets from '../../constants/money';
import CompanyPage from './CompanyPage';
import { listenerCount } from 'process';
import './index.css';

const InvPageBase = (props) => {
    const [curms, setCurms] = useState([]);
    const [aftms, setAftms] = useState([]);
    const [names, setNames] = useState([]);
    
    var fb = props.firebase;
    var user = fb.auth.currentUser;
    if(user==null){
        return(
        <div>No user</div>
        );
    }
    var uid = user.uid;
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
    

    
    
    if(names.length < 6){
        getNames();
    }
    if(curms.length < 6){
        getCurms();
    }
    if(aftms.length < 6){
        getAftms();
    }
    
    
    const index = [0,1,2,3,4,5];
    var companyPages = index.map(i => <div class={`comp${i}`}><CompanyPage key={i} name={names[i]} curm={curms[i]} aftm={aftms[i]}/></div>);
            
    function complete(){
        //CompanyPage.aftm
        for(var i=0;i<6;i++){

        }
        console.log("hi",companyPages[0].props.children.props);
        console.log(user);
    }
    return (
        <div class="wrapper">
            <h1 class="header">Game</h1>
            {companyPages}
            <button class="button" onClick={complete}>투자 완료</button>
        </div>

    );

}
const InvPage = withRouter(withFirebase(InvPageBase));
export default InvPage;