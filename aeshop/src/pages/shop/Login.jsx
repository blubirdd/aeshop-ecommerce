import React, { useContext, useEffect } from 'react'
import axiosClient from "../../axios-client.js";
import { Link, useNavigate } from "react-router-dom";
import { createRef } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import { useState } from "react";
import aeshop from '/aeshop.jpg'

function Login() {

  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken, setUserRole } = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        // setUserRole(data.role);
        // navigate(data.role === 'admin' ? '/admin/dashboard' : '/home');
        console.log("LOGGED IN: " + data.user.name);
        console.log("token:" + data.token);
        // navigate('/');
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }

  // useEffect(() => {
  //   setMessage("Error message");
  // },[])

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mt-16 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <Link to="/" className="flex justify-center pb-2">
              <img src={aeshop} className="w-72" />
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Don't have an account yet?&nbsp;
              <Link to="/guest/register " className="text-sky-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">Or</div>

            {message &&
              <div className="alert">
                <p>{message}</p>
              </div>
            }
            <form onSubmit={onSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                  <div className="relative">
                    <input 
                    type="email"
                    ref={emailRef} 
                    id="email" 
                    name="email"
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-sky-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" required aria-describedby="email-error" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                    <a className="text-sm text-sky-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" >Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input 
                    type="password"
                    ref={passwordRef} 
                    id="password" 
                    name="password" 
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-sky-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" required aria-describedby="password-error" />
                  </div>
                  <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-sky-600 pointer-events-none focus:ring-sky-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-sky-500 dark:checked:border-sky-500 dark:focus:ring-offset-gray-800" />
                  </div>
                  <div className="ms-3">
                    <label htmlFor="remember-me" className="text-sm dark:text-white">Remember me</label>
                  </div>
                </div>

                <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-sky-700 text-white hover:bg-sky-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login