import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {

  const handleOnSubmit = (e) => {
    e.preventDefault()
  }

  
  return (
    <div className='flex flex-col mx-auto justify-center items-center min-w-96'>
      <div className='w-full rounded-lg shadow-md p-6 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-gray-300 text-center'>Login <span className='text-blue-500'>ChatApp</span></h1>
        <form onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="usernameId" className="label p-2">
              <span  className="text-base label-text">username</span>
            </label>
            <input type="text" id="usernameId" placeholder='Enter Your Username' className="input input-bordered h-10 w-full" />
          </div>

          <div>
            <label htmlFor="passwordId" className="label p-2">
              <span  className="text-base label-text">password</span>
            </label>
            <input type="text" id="passwordId" placeholder='Enter Your Password' className="input input-bordered h-10 w-full" />
          </div>
          <NavLink to={"/signup"} className='text-sm hover:underline hover:text-blue-500 mt-2 inline-block text-black'>{"Don't"} have an account? </NavLink>
          <div className='pt-2'>
            <button className="btn btn-block btn-sm ">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login