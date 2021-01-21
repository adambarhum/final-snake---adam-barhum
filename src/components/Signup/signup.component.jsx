import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { cities } from '../../cities'
function Signup(props) {
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        confirm: "",
        bday: "",
        name: "",
        town: "",
        street: "",
        familyName: "",
        image: ""
    })
    const [error, setError] = useState("")
    function getBase64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            // cb(reader.result)
            setState(d=>({...d,image:reader.result}))
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let hasUppercase = state.password.split("").findIndex(v => v.toUpperCase() === v) > -1
        let hasLowercase = state.password.split("").findIndex(v => v.toLowerCase() === v) > -1
        if (hasLowercase && hasUppercase) {
            if (state.password === state.confirm) {
                localStorage.setItem("registerData", JSON.stringify([state]))
                props.history.push("/login")
            } else {
                setError("Password doesnt match")
            }
        } else {
            setError("Password should have uppercase and lower case letters")
        }
    }
    useEffect(() => {
        setError("")
    }, [state.password, state.confirm])
    return (
        <div className="login_container">
            <div className="login-box card mx-auto shadow mt-0">
                <form onSubmit={handleSubmit}>
                    <h3 className="h1 mb-4 text-center">Signup</h3>
                    <div className="form-group mb-1">
                        <label htmlFor="">Username</label>
                        <input required onChange={e => setState({ ...state, username: e.target.value })} type="text" className="form-control" />
                    </div>
                    <div className="form-group mb-1">
                        <label htmlFor="">Password</label>
                        <input required onChange={e => setState({ ...state, password: e.target.value })} type="password" className="form-control" />
                    </div>
                    <div className="form-group mb-1">
                        <label htmlFor="">Confirm Password</label>
                        <input required onChange={e => setState({ ...state, confirm: e.target.value })} type="password" className="form-control" />
                    </div>
                    <div className="form-group mb-1">
                        <label htmlFor="">Profile image</label>
                        <input accept="image/png" required onChange={e => getBase64(e.target.files[0])} type="file" className="form-control" />
                    </div>
                    <div className="form-group mb-1">
                        <label htmlFor="">Full Name</label>
                        <input required onChange={e => setState({ ...state, name: e.target.value })} type="text" className="form-control" />
                    </div>
                    <div className="form-group mb-1">
                        <label htmlFor="">Family name</label>
                        <input required onChange={e => setState({ ...state, familyName: e.target.value })} type="text" className="form-control" />
                    </div>
                    <div className="form-group mb-1">
                        <label htmlFor="">Email</label>
                        <input required onChange={e => setState({ ...state, email: e.target.value })} type="email" className="form-control" />
                    </div>
                    <div className="form-group mb-1">
                        <label htmlFor="" className="d-block">Birth date</label>
                        <DatePicker
                            selected={state.bday}
                            onChange={value => setState({ ...state, bday: value })}
                            minDate={new Date("01-01-2008")}
                            maxDate={new Date()}
                            required
                            className="form-control"
                            placeholderText="Select birth date"
                        />
                        {/* <input required onChange={e => setState({ ...state, bday: e.target.value })} type="date" className="form-control" /> */}
                    </div>
                    <div className="form-group mb-1">
                        <label htmlFor="">Town</label>
                        {/* <input required onChange={e => setState({ ...state, town: e.target.value })} type="text" className="form-control" /> */}
                        <select className="form-control" onChange={e => setState({ ...state, town: e.target.value })}>
                            {cities.map((val, i) => (<option value={val.eng_name}>{val.eng_name}</option>))}
                        </select>
                    </div>
                    <div className="form-group mb-1">
                        <label htmlFor="">Street</label>
                        <input required onChange={e => setState({ ...state, street: e.target.value })} type="text" className="form-control" />
                    </div>
                    <span className="text-danger">{error}</span>
                    <button className="btn btn-success mt-4 py-3">Signup</button>
                    <h4 className="text-primary mt-0"><Link to="/" className="text-primary">{"Login>"}</Link></h4>

                </form>
            </div>
        </div>
    )
}

export default Signup
