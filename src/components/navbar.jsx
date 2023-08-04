import React from "react"; 
import { BrowserRouter, Route, Link } from "react-router-dom";
export const Navbar = () => {
    return (     
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
            <div className="navbar-brand">
                Note App
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className = "nav-link" to="/" exact="true"> Home </Link>         
                </li>
                <li className="nav-item">           
                    <Link className = "nav-link" to="/About" exact="true">About</Link>
                </li>
            </ul>
        </nav>
    )
}