import React, { useState,useEffect } from 'react';
import Msg from '../component/message'
import Header from '../includes/header'
import Footer from '../includes/footer'
import Path from '../includes/path'
import DashboardMenu from '../includes/left'


export default function Help() {
  return (
    <div>
      <Header/>
      <div class="dashboard_main">
      <div class="container">
      <DashboardMenu />
      <div class="dashboard_right">
        <h2>Help</h2>
 
      </div>
      </div>  
      </div>
      <Footer/>

    </div>
  );
}

