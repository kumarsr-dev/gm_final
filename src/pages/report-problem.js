import React, { useState,useEffect } from 'react';
import Msg from '../component/message'
import Header from '../includes/header'
import Footer from '../includes/footer'
import Path from '../includes/path'
import DashboardMenu from '../includes/left'


export default function Account() {
 
 const [subject, setSubject] = useState(null)
 const [message, setMessage] = useState(null)
  return (
    <div>
      <Header/>
      <div class="dashboard_main">
      <div class="container">
      <DashboardMenu />
      <div class="dashboard_right">
        <h2>Report a Problem</h2>
 
      <div class="account_form">
 
 
 
        <ul>
        
          <li>
            <label>Subject</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </li>
 
          <li>
            <label>Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          </li>
          <li>
            <button type="submit">Submit</button>
          </li>
        </ul>
      </div>
      </div>
      </div>  
      </div>
      <Footer/>

    </div>
  );
}

