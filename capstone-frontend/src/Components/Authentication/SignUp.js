import React, { useState } from 'react'
import './Login.css'
import { useHistory } from 'react-router-dom'

const SignUp = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    let history = useHistory();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
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
                        <h1>Sign Up</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name address</label>
                                <input type="name" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
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
    )
}

export default SignUp