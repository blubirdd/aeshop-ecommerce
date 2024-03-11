import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from '../../axios-client.js';
import { UserContext } from '../../context/UserContext.jsx';
import aeshop from '/aeshop.jpg'


function Register() {

  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const { setUser, setToken } = useContext(UserContext)
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate();
  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token);
        navigate('/');
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }


  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mt-1 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <Link to="/" className="flex justify-center pb-2">
              <img src={aeshop} className="w-72" />
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?&nbsp;
              <Link to="/guest/login" className="text-sky-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">Or</div>

            {errors &&
              <div className="alert">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            }

            <form onSubmit={onSubmit}>
              <div className="grid gap-y-4">
              <div>
                  <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      ref={nameRef}
                      id="name"
                      name="name"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-sky-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                  <div className="relative">
                    <input
                      type="email"
                      ref={emailRef}
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-sky-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required aria-describedby="email-error" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      ref={passwordRef}
                      id="password"
                      name="password"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-sky-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required aria-describedby="password-error" />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm mb-2 dark:text-white">Confirm Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      ref={passwordConfirmationRef}
                      id="confirm-password"
                      name="confirm-password"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-sky-500 focus:ring-sky-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required aria-describedby="confirm-password-error" />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border border-gray-200 rounded text-sky-600 pointer-events-none focus:ring-sky-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-sky-500 dark:checked:border-sky-500 dark:focus:ring-offset-gray-800" />
                  </div>
                  <div className="ms-3">
                    <label htmlFor="remember-me" className="text-sm dark:text-white">I accept the <a className="text-sky-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">Terms and Conditions</a></label>
                  </div>
                </div>

                <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register