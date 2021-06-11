import React from 'react'
import { Link as NavLink } from 'react-router-dom';
import Loginpopup from "../component/popup";
import Logout from '../component/logout'

export default function Header() {
    const [checkLogin, setCheckLogin] = React.useState(null)
    React.useEffect(() => {
        setCheckLogin(localStorage.getItem('token'))
    }, [])
    return (
            <>
                <div class="container_fluid top_hed">
                    <div class="header">
                        <div class="header_logo"><NavLink to="/"><img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" /></NavLink></div>
                        <div class="header_text">
                            <ul>
                               
                                <li><NavLink to="/">Mobile Apps</NavLink></li>
                                <li><NavLink to='/allcategories'>Test by Categories</NavLink></li>
                                {checkLogin ?<li><NavLink to='/myaccount'>My Account</NavLink></li>: null }
                                {checkLogin ?<li><NavLink to='/purchase_history'>My Packages</NavLink></li>: null }
                            </ul>
                        </div>
                        <div class="header_contact">
                        {checkLogin ? <NavLink onClick={()=>Logout()}>Logout</NavLink>  : <Loginpopup name="Login or Register" />}
                        </div>
                    </div>
                </div>
         
            </>
    )
}