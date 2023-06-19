

import { NavLink, Outlet } from "react-router-dom";
import Logo from './Logo'
import styled from 'styled-components'
import '../App.scss'
import marker from '../img/address-marker.svg'
import printer from '../img/printer-fill.svg'
import phone from '../img/round-phone.svg'
const Address = styled.p` 
    margin-bottom: 1em;
    &:before {
        content: url(${props => props.$icon});
        padding-right: 10px;
        vertical-align: middle
    }
`



const Footer = () => {
    return(
        <footer>
            <section className="footer-content">
                <Logo/>
                <section className="site-address">
                    <Address $icon={marker}>
                        844 Honey Creek St. Springfield, PA 19064
                        </Address>
                    <Address $icon={phone} className="contact-num">(123) 456-7890</Address>
                    <Address $icon={printer} className="contact-num contact-num-2">(123) 456-7890</Address>
                    <section className="socials">
                        <div style={{display: "inline-block", color: 'rgba(210, 215, 211, 0.5)'}}>Social Media</div>
                        <ul>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 128 128">
                                <path fill="#695ef5" d="M116.42 5.07H11.58a6.5 6.5 0 0 0-6.5 6.5v104.85a6.5 6.5 0 0 0 6.5 6.5H68V77.29H52.66V59.5H68V46.38c0-15.22 9.3-23.51 22.88-23.51a126 126 0 0 1 13.72.7v15.91h-9.39c-7.39 0-8.82 3.51-8.82 8.66V59.5H104l-2.29 17.79H86.39v45.64h30a6.51 6.51 0 0 0 6.5-6.5V11.58a6.5 6.5 0 0 0-6.47-6.51z"/>
                                </svg>
                            </li>

                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#695ef5" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"/>
                                </svg>
                            </li>

                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#695ef5" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"/>
                                </svg>
                            </li>
                        </ul>
                    </section>
                </section>
            </section>

            <section className="footer-nav">
                <section className="footer-nav-content">
                    <ul>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Help</li>
                        <li>Privacy Policy</li>
                        <li>Disclaimer</li>
                    </ul>
                </section>
                <small>Copyright &copy; 2023 • Videa.</small>
            </section>
        </footer>
        
    )
}

export default Footer