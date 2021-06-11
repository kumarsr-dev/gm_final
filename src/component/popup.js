import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Redirect} from 'react-router-dom';
import { loginCheck, verifyLogin } from '../services/api/api.service'

export default function Popupbox(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [phoneno, setphoneno] = React.useState(null)
  const [phoneotp, setphoneotp] = React.useState(false)

  const getotp = () => {
    if (phoneno == '' || phoneno == null) {
      document.getElementById('allnumber').style.display = "block"
    } else {

      loginCheck(phoneno)
        .then(function (result) {
          if (result.data.status == 200) {
            setphoneotp(true)
          } else {
            document.getElementById('technicalproblem').style.display = "block"

          }
        })
    }
  }

 
  return (
    <>
      <Button variant="primary" onClick={handleShow}>{props.name}</Button>
      <Modal show={show} onHide={handleClose}>
        <div class="login_banner">
          <div class=" login_clr">
            <div class="costumer_form">
              <h2>Login <span>Email Address</span></h2>
              {/* <!-- login --> */}
              <div class="forgat_pwd_and_submit"></div>
              <div id="login" class="login_details tabPanel" className={phoneotp ? 'hidden' : ''}>
                <form>
                  <div class="hide_msg" role="alert" id="allnumber">
                    Enter valid Email Address
          </div>
                  <div class="hide_msg" role="alert" id="technicalproblem">
                    technical probler please check your number and retry
          </div>
                  <div class="login_email_field"><i class="fa fa-envelope-o" aria-hidden="true"></i><input type="text" placeholder="Enter Email Address" id="login_email" name="login_email" value={phoneno} onChange={(e) => setphoneno(e.target.value)} /></div>
                  <div class="forgat_pwd_and_submit"><input type="button" value="Get otp" onClick={getotp} /></div>
                  {/* <div class='socialmedia'>
                    <h2>OR Login with your</h2>
                    <div class='google'>
                      <GoogleLogin
                        clientId="1414507399320-149dsk395lfsoscomnvfcrmr698defcm.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                      />
                    </div>
                    <div class="facebook">
                      <FacebookLogin
                        appId="3939795952558601"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook} />
                    </div>
                  </div> */}
                </form>
              </div>
              {phoneotp ? <Checkotp number={phoneno} /> : null}

            </div>
          </div>
        </div>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Checkotp(props) {
  const [otpsave, setotpsave] = React.useState(null)

  const submitotp = () => {
    if (otpsave == '' || otpsave == null) {
      document.getElementById('fillotp').style.display = "block"
      alert('')
    } else {

      verifyLogin(props.number, otpsave)
        .then(function (result) {
         // console.log(result)
          if (result.data.status == 200) {
            document.getElementById('suessful').style.display = "block"
            for (var newdata of result.data.data) {
              //console.log(newdata.sessToken)
              localStorage.setItem('token', newdata.sessToken)
              localStorage.setItem('customer_id', newdata.id)
              // this.props.history.push("/listing");
              window.location.reload(false);
            }
          } else {
            document.getElementById('warning').style.display = "block"
            { <Redirect to="/somewhere/else" /> }
          }
        })
    }
  }
  return (
    <>

      <div id="login" class="tabPanel">
 
        <form>
          <div class="hide_msg" role="alert" id="suessful">
            Successfull login
          </div>
          <div class="hide_msg" role="alert" id="warning">
            technical problem please check your otp and retry
          </div>
          <div class="hide_msg" role="alert" id="fillotp">
            Enter valid Email otp
          </div>
          <div class="otp_sent">One Time Password sent to Email Adress ({props.number})</div>
          <div class="login_email_field"><i class="fa fa-envelope-o" aria-hidden="true"></i><input type="text" placeholder="OTP" id="otp" name="otp" value={otpsave} onChange={(e) => setotpsave(e.target.value)} /></div>
          
          <div class="forgat_pwd_and_submit"><input type="button" value="Login" onClick={submitotp} /></div>
        </form>
      </div>

    </>
  )
}
