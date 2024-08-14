import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Gendercheckbox from '../../components/Gendercheckbox'
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';


const Signup = () => {
  document.title = 'Signup';
  const [loading, setLoading] = useState(false)
  const { authUser, setAuthUser, data, setData } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams();
  const form = searchParams.get('form');
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
  })
  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender })
  }
  // console.log(form, location.pathname)
  useEffect(() => {
    if (localStorage.getItem("chat-user")) {
      navigate("/")
    }
  }, [])

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const { fullName, username, email, gender, password, confirmPassword } = inputs;
    if (!fullName || !username || !email || !gender || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password do not match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    function isValidEmail(mail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(mail);
    }

    if (!isValidEmail(email)) {
      toast.error("Email is invalid");
      return;
    }


    setLoading(true);
    try {
      // fetch(`/api/auth/signup`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ fullName, username, email, gender, password, confirmPassword })
      // })
      //   .then(response => response.json())
      //   .then(resData => setData(resData))
      //   console.log(data, "data")

      const response = await axios.post('/api/auth/signup', {
        fullName,
        username,
        email,
        gender,
        password,
        confirmPassword
      });

      setData(response.data);
      if (response.data?.error) {
        throw new Error(response.data?.error)
      }

      // local storage
      localStorage.setItem("chat-user", JSON.stringify(response.data))
      // context api
      setAuthUser(response.data)
      if (response.status === 201) {
        toast.success("User Create Successfully")
      }
      if (!response.data?.error) {
        if (form) {
          navigate(form || "/")
            
          }else{
            navigate("/")
          }
      }
    } catch (error) {
      // if (error.response) {
      //   if (error.response.status === 400) {
      //     // Display the custom error message in a toast
      //     toast.error(error.response.data?.error || 'Something went wrong');
      //   }else{
      //     toast.error(error.message);
      //   }

      if (error.response) {
        switch (error.response.status) {
          case 400:
            // Custom error message from the server
            toast.error(error.response.data?.error || 'Bad Request');
            break;
          case 401:
            toast.error(error.response.data?.error || 'Unauthorized access');
            break;
          case 403:
            toast.error(error.response.data?.error || 'Forbidden: You donât have permission');
            break;
          case 404:
            toast.error(error.response.data?.error || 'Resource not found');
            break;
          case 500:
            toast.error(error.response.data?.error || 'Internal server error');
            break;
          default:
            toast.error(error.response.data?.error || 'An unexpected error occurred');
        }
      } else if (error.request) {
        toast.error('No response from server');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
    //

  }
  // console.log(inputs)
  return (
    <div className='flex flex-col mx-auto justify-center items-center min-w-96'>
      <div className='w-full rounded-lg shadow-md p-6 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-gray-300 text-center'>Signup <span className='text-blue-500'>ChatApp</span></h1>
        <form onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="nameId" className="label p-2">
              <span className="text-base label-text">Full Name:</span>
            </label>
            <input type="text" id="nameId" placeholder='John Doe' className="input input-bordered h-10 w-full"
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
          </div>
          <div>
            <label htmlFor="usernameId" className="label p-2">
              <span className="text-base label-text">Username:</span>
            </label>
            <input type="text" id="usernameId" placeholder='Enter Your username' className="input input-bordered h-10 w-full"
              value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} required />
          </div>
          <div>
            <label htmlFor="emailId" className="label p-2">
              <span className="text-base label-text">Email:</span>
            </label>
            <input type="email" id="emailId" placeholder='Enter Your Email' className="input input-bordered h-10 w-full" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} required />
          </div>
          <div>
            <label htmlFor="passwordId" className="label p-2">
              <span className="text-base label-text" >password</span>
            </label>
            <input type="password" id="passwordId" placeholder='Enter Your Password' className="input input-bordered h-10 w-full" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
            <span className='text-red-600 text-left flex ml-2'>use minimum 6 characters</span>
          </div>
          <div>
            <label htmlFor="passwordId" className="label p-2">
              <span className="text-base label-text">password</span>
            </label>
            <input type="password" id="passwordId" placeholder='Enter Your Password' className="input input-bordered h-10 w-full" value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>
          <Gendercheckbox handleCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
          <NavLink to={"/login"} className='text-sm hover:underline hover:text-blue-500 mt-2 inline-block text-white'>Already have an account? </NavLink>
          <div className='pt-2'>
            <button type='submit' className="btn btn-block btn-sm " disabled={loading}>{loading ? <span className="loading loading-spinner"></span> : "Sign up"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup