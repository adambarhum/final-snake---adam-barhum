import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login(props) {
    const [state, setState] = useState({
        name: "",
        password: ""
    })
    const [error, setError] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        if (state.name === "admin" && state.password === "admin1234admin") {
            props.history.push("/home")
        } else {
            setError("User not exists")
        }
    }
    return (
        <div className="login_container">
            <div className="login-box card mx-auto shadow">
                <form onSubmit={handleSubmit}>
                    <h3 className="h1 mb-4 text-center">Login</h3>
                    <div className="form-group mb-5">
                        <label htmlFor="">Username</label>
                        <input required onChange={e => setState({ ...state, name: e.target.value })} type="text" className="form-control" />
                    </div>
                    <div className="form-group mb-5">
                        <label htmlFor="">Password</label>
                        <input required onChange={e => setState({ ...state, password: e.target.value })} type="password" className="form-control" />
                    </div>
                    <p className="text-danger">{error}</p>
                    <button className="btn btn-success mt-4 py-3">Login</button>
                    <h4 className="text-primary mt-0"><Link to="/signup" className="text-primary">{"Signup>"}</Link></h4>
                </form>
            </div>
        </div>
    )
}

export default Login
