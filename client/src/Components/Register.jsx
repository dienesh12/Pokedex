import React from "react";
import { useState } from "react";
import { addUser } from "../Service/api";

function Register() {
    const [userInfo,setuserInfo] = useState({
        username:"",
        password:"",
        emailID:""
    })

    const handleInput = async (e) => {
        const name = e.target.name
        const value = e.target.value

        setuserInfo({...userInfo,[name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {...userInfo}
        console.log(data);
        const res = await addUser(data)
        console.log(res);
    }

    return (
      <div className="regis">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

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
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/Login">Login?</a>
        </p>
      </form>
      </div>
    );
}

export default Register