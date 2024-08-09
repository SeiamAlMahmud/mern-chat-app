import React from 'react'
import { NavLink } from 'react-router-dom'
import Gendercheckbox from '../../components/Gendercheckbox'

const Signup = () => {

  const handleOnSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='flex flex-col mx-auto justify-center items-center min-w-96'>
      <div className='w-full rounded-lg shadow-md p-6 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-gray-300 text-center'>Signup <span className='text-blue-500'>ChatApp</span></h1>
        <form onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="nameId" className="label p-2">
              <span className="text-base label-text">Full Name:</span>
            </label>
            <input type="text" id="nameId" placeholder='John Doe' className="input input-bordered h-10 w-full" />
          </div>
          <div>
            <label htmlFor="usernameId" className="label p-2">
              <span className="text-base label-text">Username:</span>
            </label>
            <input type="text" id="usernameId" placeholder='Enter Your username' className="input input-bordered h-10 w-full" />
          </div>
          <div>
            <label htmlFor="emailId" className="label p-2">
              <span className="text-base label-text">Email:</span>
            </label>
            <input type="email" id="emailId" placeholder='Enter Your Email' className="input input-bordered h-10 w-full" />
          </div>
          <div>
            <label htmlFor="passwordId" className="label p-2">
              <span className="text-base label-text" >password</span>
            </label>
            <input type="password" id="passwordId" placeholder='Enter Your Password' className="input input-bordered h-10 w-full" />
            <span className='text-red-600 text-left flex ml-2'>use minimum 6 characters</span>
          </div>
          <div>
            <label htmlFor="passwordId" className="label p-2">
              <span className="text-base label-text">password</span>
            </label>
            <input type="text" id="passwordId" placeholder='Enter Your Password' className="input input-bordered h-10 w-full" />
          </div>
          <Gendercheckbox />
          <NavLink to={"/login"} className='text-sm hover:underline hover:text-blue-500 mt-2 inline-block text-white'>Already have an account? </NavLink>
          <div className='pt-2'>
            <button className="btn btn-block btn-sm ">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup