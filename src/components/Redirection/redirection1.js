import React from 'react';
import { withRouter } from 'react-router-dom';
import * as RATIOS from '../../constants/money';
import { withFirebase } from '../Firebase';
import './index.css';


const Redirection1Base = (props) => {
    const fb = props.firebase;
    console.log("hihi",fb);
    const user = fb.auth.currentUser;
    if(!user){
        return (
            <div class="no">No user</div>
        )
    }
    async function setAsset(){
        const snapshot = await fb.db.ref(`/users/${user.uid}/invest/input`).once('value');
        const snapshot2 = await fb.db.ref(`/users/${user.uid}/asset`).once('value');
        const input = snapshot.val();
        const asset = snapshot2.val();
        var updates = {};
        updates[`/users/${user.uid}/asset`] = -input + asset;
        updates[`/users/${user.uid}/invest/input`] = 0;
        fb.db.ref().update(updates);
    }
    async function setCompany(){
        const snapshot = await fb.db.ref(`/companies/`).once('value');
        const stocks = Object.values(snapshot.val()).map(e=>e.stock);
        const snapshot2 = await fb.db.ref(`/users/${user.uid}/invest/`).once('value');
        const curms = Object.values(snapshot2.val()).map(e=>e.curm);
        const aftms = Object.values(snapshot2.val()).map(e=>e.aftm);
        var updates = {};
        for(var index = 0; index < 8; index++){
            updates[`/companies/${index}/stock`] = stocks[index] + aftms[index] - curms[index];
        }
        fb.db.ref().update(updates);
    }
    async function getCurmsAndSet(){
        const snapshot = await fb.db.ref(`/users/${user.uid}/invest/`).once('value');
        const value_list = Object.values(snapshot.val()).map(e=>e.aftm);
        const snapshot2 = await fb.db.ref('/companies/').once('value');
        const rank_list = Object.values(snapshot2.val()).map(e=>e.round1rank);
        const snapshot3 = await fb.db.ref(`/users/${user.uid}/`).once('value');
        const curAsset = Object.values(snapshot3.val())[0];
        var updates = {}
        var reward = 0;
        for(var index = 0; index < 8; index++){
            reward += parseInt(value_list[index]*RATIOS.ROUND1_REWARD_RATIO[rank_list[index]-1]);
        }
        console.log("asafdsadfs",reward);
        updates[`/users/${user.uid}/asset`] = curAsset + reward;
        for(index = 0; index < 8; index++){
            updates[`/users/${user.uid}/invest/company${index}/curm`] = value_list[index];
            updates[`/users/${user.uid}/invest/company${index}/aftm`] = value_list[index];
        }
        fb.db.ref().update(updates);
    }
    setAsset().then(()=>{
        setCompany().then(()=>{
            getCurmsAndSet();
        }) 
    })
    
    
    
    return (
        <div className="container"><h1 className="wait">Wait...</h1></div>
        
    );
}

const Redirection1 = withRouter(withFirebase(Redirection1Base));
export default Redirection1;