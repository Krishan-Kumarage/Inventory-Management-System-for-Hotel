
import React from "react";
import { NavLink } from "react-router-dom";


function Header() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#212529', padding: '10px' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#" style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>Dhananjana Hotel</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" style={{ color: 'white' }}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/home" style={{ color: 'white', padding: '10px', fontSize: '18px' }}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/add" style={{ color: 'white', padding: '10px', fontSize: '18px' }}>Add Items</a>
                        </li>

                        <li className="nav-allitem">
                            <a className="nav-link" href="/Allitem" style={{ color: 'white', padding: '10px', fontSize: '18px' }}>Inventory</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
