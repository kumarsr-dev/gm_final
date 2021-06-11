import React, { useState,useEffect } from 'react';
import Msg from '../component/message'
import Header from '../includes/header'
import Footer from '../includes/footer'
import Path from '../includes/path'
import DashboardMenu from '../includes/left'


export default function Account() {
  const [Name, setName] = useState(null);
  const [Phone, setPhone] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Address, setAddress] = useState(null);
  const [City, setCity] = useState(null);
  const [Pcode, setPcode] = useState(null);
  const [msg, setMsg] = useState(null);
  useEffect(() => {
     const userToken= localStorage.getItem('token')
      console.log(userToken)
      let url = 'type=getVendor&sessToken='+userToken     
        fetch(Path + url)
            .then(res => res.json())
            .then((result)=>{
                if(result.status == '200') {
                    console.log(result)
                    setName(result.data[0].name)
                    setPhone(result.data[0].phone)
                    setEmail(result.data[0].email)
                    setCity(result.data[0].city)
                    setPcode(result.data[0].postal_code)
                }                
            })
        .catch(error => console.log(error.message));
   
    
  }, [])

  const updateData =() => {
    const auth_token = localStorage.getItem("token")

    const url = 'type=profileUpdate';
    fetch(Path+url, {
      method: 'POST',
      headers: { Accept: 'application/json', Token: auth_token },
      body: JSON.stringify({
        "name": Name,
        "addressBuildingName": Address,
        "city": City,
        "postal_code": Pcode,
        "email": Email,
      })
    })
    .then(res => res.json())
    .then(response => {
      setMsg('success')
    })
    .catch(error => setMsg('failed'));
  }

  return (
    <div>
      <Header/>
      <div class="dashboard_main">
      <div class="container">
      <DashboardMenu />
      <div class="dashboard_right">
        <h2>My Account</h2>
      <Msg type={msg} />
      <div class="account_form">
 
 
 
        <ul>
        
          <li>
            <label>Full Name</label>
            <input type="text" value={Name} onChange={(e) => setName(e.target.value)} />
          </li>
          <li>
            <label>Phone</label>
            <input type="text" value={Phone} onChange={(e) => setPhone(e.target.value)} />
          </li>
          <li>
            <label>Email</label>
            <input type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />
          </li>
          <li>
            <label>Address</label>
            <input type="text" value={Address} onChange={(e) => setAddress(e.target.value)} />
          </li>
          <li>
            <label>City</label>
            <input type="text" value={City} onChange={(e) => setCity(e.target.value)} />
          </li>
          
          <li>
            <label>Pin Code</label>
            <input type="text" value={Pcode} onChange={(e) => setPcode(e.target.value)} />
          </li>
          <li>
            <button type="submit" onClick={updateData}>Submit</button>
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

