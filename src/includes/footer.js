import React from 'react';
import { Link as NavLink } from 'react-router-dom'
export default function Footer() {
    return (
        <div>
            <div class="container-fluid footer_back">
                <div class="container">
                    <div class="footer">
                        <div class="left_section">
                            <ul>
                                <li>
                                    <h2>INFO </h2>
                                    <ul>
                                        <li><a>FAQs</a></li>
                                        <li><a>Blog</a></li>
                                        <li><a>Location</a></li>
                                        <li><a>Contact Us</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <h2>COURSES</h2>
                                    <ul>
                                        <li><NavLink to="/exam-prepration/MBA">MBA</NavLink></li>
                                        <li><NavLink to="/exam-prepration/MCA">MCA</NavLink></li>
                                        <li><NavLink to="/exam-prepration/GRE">GRE</NavLink></li>
                                        <li><NavLink to="/exam-prepration/Bank-PO"> Bank PO</NavLink></li>
                                        <li><NavLink to="/exam-prepration/IIT-JEE">IIT-JEE</NavLink></li>
                                    </ul>
                                </li>

                                <li>
                                    <h2>USEFUL</h2>
                                    <ul>
                                        <li><a>About Us</a></li>
                                        <li><a>Terms & Condition</a></li>
                                        <li><a>Privacy Policy</a></li>
                                    </ul>
                                </li>

                                <li>
                                    <h2>Address </h2>
                                    <ul>
                                        <li>"SANKALP" CP-6, Indra Vihar Kota (Rajasthan), India 324005 Phone: +91-744-2757575 Email: info@allen.ac.in</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="copyright">
                    <h2>
                        Copyright © 2012 - 2020 Mock Portal
        </h2>
                </div>
            </div>
        </div>
    )
}