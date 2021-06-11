import React from 'react'
import { Link as NavLink } from 'react-router-dom';
 

export default function DashboardMenu() {
    return (
        <div class="dashboard_left">
            <ul>
                <li><NavLink to="/myaccount">My Account</NavLink></li>
                <li><NavLink to="/purchase_history">My Packages</NavLink></li>
                <li><NavLink to="/help">Help</NavLink></li>
                <li><NavLink to="/report-problem">Report a Problem</NavLink></li>
                <li><NavLink to="/">Logout</NavLink></li>
            </ul>
        </div>
    )
}