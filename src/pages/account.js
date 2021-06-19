import React, { useState, useEffect } from 'react';
import Msg from '../component/message'
import Header from '../includes/header'
import Footer from '../includes/footer'
import { getVendor, profileUpdate } from '../services/api/api.service'
import DashboardMenu from '../includes/left'
import { packageAction } from '../redux/packageOwned.action'
import { useDispatch } from 'react-redux';

export default function Account() {
  const [Name, setName] = useState(null);
  const [Phone, setPhone] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Address, setAddress] = useState(null);
  const [City, setCity] = useState(null);
  const [Pcode, setPcode] = useState(null);
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const userToken = localStorage.getItem('token')
    getVendor(userToken)
      .then((result) => {
        console.log(result)
        if (result.data.status == '200') {
          setName(result.data.data[0].name)
          setPhone(result.data.data[0].phone)
          setEmail(result.data.data[0].email)
          setCity(result.data.data[0].city)
          setPcode(result.data.data[0].postal_code)
          dispatch(packageAction(result.data.packageOwned))
        }
      })
      .catch(error => console.log(error.message));
  }, [])

  const updateData = () => {
    const auth_token = localStorage.getItem("token")
    let profileData = {
      "name": Name,
      "addressBuildingName": Address,
      "city": City,
      "postal_code": Pcode,
      "email": Email,
    }
    let auth = { Accept: 'application/json', Token: auth_token }
    profileUpdate(profileData, auth)
      .then(response => {
        setMsg('success')
      })
      .catch(error => setMsg('failed'));
  }

  return (
    <div>
      <Header />
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
      <Footer />

    </div>
  );
}

