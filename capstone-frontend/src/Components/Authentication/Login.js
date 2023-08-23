import React, { useState } from 'react'
import './Login.css'
import { useHistory } from 'react-router-dom'
import jwt_decode from "jwt-decode";


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useHistory();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            // Save the auth token and redirect
            console.log(json);
            localStorage.setItem('token', json.authtoken);
            const decoded = jwt_decode(json.authtoken);
            console.log(decoded);
            localStorage.setItem('user', decoded.user.name);
            history.push("/");
        }
        else {
            alert("Invalid credentials");
        }
    }

    const handleShowPassowrd = (e) => {
        if (e.target.checked) {
            setShowPassword(true);
        }
        else {
            setShowPassword(false);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    return (
        <div>
            <div className="container">
                <div className="container-wrap card">
                    <div className='my-3 mx-3'>
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type={(showPassword) ? "text":"password"} className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                            </div>
                            <input type="checkbox" className="form-check-input mb-3 mx-2 border-dark" name='showpassword' onChange={handleShowPassowrd} />
                            Show Password
                            <br />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;