import React from 'react';
import { Redirect } from 'react-router-dom'
import Path from '../includes/path'
import { loginCheck, verifyLogin } from '../services/api/api.service'

export default function Login() {
  const [phoneno, setphoneno] = React.useState(null)
  const [phoneotp, setphoneotp] = React.useState(false)

  const getotp = () => {
    if (phoneno == '' || phoneno == null) {
      alert('Enter Email Address')
    } else {
      loginCheck(phoneno)
        .then(function (result) {
          if (result.data.status == 200) {
            alert('successfully send otp check now')
            setphoneotp(true)
          } else {
            alert('technical problem please check your number and retry')
          }
        })
    }
  }

  return (
    <div class="login_banner">
      <div class="container-fluid ">
        <div class="container login_clr">
          <div class="costumer_form">
            <h2>Login with<span>Email Address</span></h2>


            {/* <!-- login --> */}

            <div id="login" class="login_details tabPanel" className={phoneotp ? 'hidden' : ''}>
              <form>
                {phoneno}
                <div class="login_email_field"><i class="fa fa-envelope-o" aria-hidden="true"></i><input type="text" placeholder="Email" id="login_email" name="login_email" value={phoneno} onChange={(e) => setphoneno(e.target.value)} /></div>
 
                <div class="forgat_pwd_and_submit"><input type="button" value="Get otp" onClick={getotp} /></div>

              </form>
            </div>
            {phoneotp ? <Checkotp number={phoneno} /> : null}
          </div>
        </div>
      </div>
    </div>

  )
}

function Checkotp(props) {
  const [otpsave, setotpsave] = React.useState(null)
  const submitotp = () => {
    if (otpsave == '' || otpsave == null) {
      alert('Enter valid otp')
    } else {

 
      verifyLogin(props.number, otpsave)
        .then(function(result) {
          if (result.data.status == 200) {
            alert('successfully login')
            localStorage.setItem('loginResult', result.data)
            localStorage.setItem('token', result[0].data.data[0].sessToken)
            localStorage.setItem('customer_id', result[0].data.data[0].id)
            return <Redirect to='/' />
          } else {
            alert('technical problem please check your otp and retry')
          }
        })
    }
  }
  return (
    <div id="login" class="tabPanel">
      <p>otp no. {props.number}</p>
      <form>
        {otpsave}
        <div class="login_email_field"><i class="fa fa-envelope-o" aria-hidden="true"></i><input type="text" placeholder="OTP" id="otp" name="otp" value={otpsave} onChange={(e) => setotpsave(e.target.value)} /></div>
        <div class="forgat_pwd_and_submit"><input type="button" value="Login" onClick={submitotp} /></div>

      </form>
    </div>
  )
}
