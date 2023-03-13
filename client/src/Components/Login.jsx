import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { enterUser } from "../Service/api";


function Login({history}) {
    const [userInfo,setuserInfo] = useState({
        username:"",
        password:"",
        emailID:""
    })
    const {id} = useParams()

    const handleInput = async (e) => {
        const name = e.target.name
        const value = e.target.value

        setuserInfo({...userInfo,[name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {...userInfo}
        console.log(data);
        let response = await enterUser(data)
        let res = response.data
        console.log(res)
        localStorage.setItem("userInfo",JSON.stringify(res))
        window.location.href = './Home'
    }

    return (
      <div className="regis">
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>

        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="username"
            value={userInfo.username}
            onChange={handleInput}
          />
        </div>

        <br />

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={userInfo.password}
            onChange={handleInput}
          />
        </div>

        <br />

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="emailID"
            value={userInfo.emailID}
            onChange={handleInput}
          />
        </div>

        <br />

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>
        <p className="forgot-password text-right">
           <a href="/">New User?</a>
        </p>
      </form>
      </div>
    );
}

export default Login