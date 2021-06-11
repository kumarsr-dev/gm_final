import { useEffect, useState } from "react";
import React from 'react'
import { NavLink } from "react-router-dom";
import Header from '../includes/header'
import Footer from '../includes/footer'
import DashboardMenu from '../includes/left'

export default function Purchasehistory() {
  const [result,setresult]=useState([])
  useEffect(()=>{
    let proxy = 'https://cors-anywhere.herokuapp.com/'
    let url='http://greatmocks.com/json/history.json'
    fetch('http://greatmocks.com/json/history.json')
    .then(res=>res.json())
    .then(result=>{
      setresult(result.data)
    })
  },[])
const validity=(date)=>{
  let today=new Date()
  let expiry=new Date(date)

  //console.log(today)
  if(today>expiry){
    console.log(today)
    console.log(expiry)
    return 'gdfjdjdkhfkjglgl'
  }
}
  return (<>
    <Header/>
    <div class="dashboard_main">
      <div class="container">
      <DashboardMenu />
      <div class="dashboard_right">
      <h2>My Packages</h2>
    <div class="purchases_history_main">
 
      <div class="test_dtails">
       
        <ul>
        {result.map((pack)=>{

        return(
          <li>
            <ul>
              <li>
                <h4>{(pack.pkgName)}{validity(pack.expdate)}</h4>
                <span>Total Test({pack.Totaltest})</span>
                <span>Attempted({pack.Attemped})</span>
                <span>unattempted({pack.Totaltest-pack.Attemped})</span>
              </li>
              <li>
                <h5>Purchased on -  {pack.buydate}</h5>
                <span>Valid Till - {pack.expdate}</span>
                <NavLink to={"/listing/"+pack.pkgId}>Explore course</NavLink>
              </li>
            </ul>
          </li>)
        })}</ul>
      </div>
    </div>
    </div>
      </div>  
      </div>
        <Footer/>
</>
  );
}

