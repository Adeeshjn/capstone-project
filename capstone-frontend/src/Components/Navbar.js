import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from "react-router-dom";



const Navbar = () => {
    let location = useLocation();
    let history = useHistory();
    const isLogin = location.pathname.includes("/login")
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/login');
        }
    }, [])
    const handleLogout = () => {
        localStorage.removeItem('token')
        history.push('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">SmartBasket</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <div className='d-flex'>
                        {(!isLogin) ? (<Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        ) : (<Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>)}</div > : <div>

                        <div className="d-flex dropdown">
                            <div>
                                hi
                            </div>
                            <div className="nav-link dropdown-toggle" style={{ textTransform: 'uppercase', fontWeight: 'bold' }} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Welcome
                            </div>
                            <ul className="dropdown-menu dropdown-menu-end" style={{ "left": "auto" }}>
                                <li><Link className="dropdown-item" to="#">

                                    Account
                                </Link>
                                </li>
                                <li><Link className="dropdown-item" to="#">

                                    Settings
                                </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><div className="dropdown-item" style={{ cursor: 'pointer' }} onClick={handleLogout}>

                                    Logout
                                </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </nav>

    )
}

export default Navbar
