import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext';
import axios from 'axios';


const Login = () => {

  document.title = " Log In";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const form = searchParams.get('form');
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { authUser, setAuthUser, data, setData } = useAuthContext()


  useEffect(() => {
    if (localStorage.getItem("chat-user")) {
       navigate("/") 
    }
  }, [])
  const handleOnSubmit = async (e) => {
    e.preventDefault();



    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

   


    setLoading(true)
    try {


      const response = await axios.post('/api/auth/login', {
        username,
        password,
       });

       setData(response.data);
       if (response.data?.error) {
         throw new Error(response.data?.error)
       }

       // local storage
      localStorage.setItem("chat-user", JSON.stringify(response.data))
      // context api
      setAuthUser(response.data)


      if (response.status === 200) {
        toast.success("User Login Successfully")
      }
      if (!response.data?.error) {
          navigate("/")
        
      }

    } catch (error) {

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
      setLoading(false)
    }

  }


  return (
    <div className='flex flex-col mx-auto justify-center items-center min-w-96'>
      <div className='w-full rounded-lg shadow-md p-6 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-gray-300 text-center'>Login <span className='text-blue-500'>ChatApp</span></h1>
        <form onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="usernameId" className="label p-2">
              <span className="text-base label-text">username</span>
            </label>
            <input type="text" id="usernameId" placeholder='Enter Your Username' className="input input-bordered h-10 w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div>
            <label htmlFor="passwordId" className="label p-2">
              <span className="text-base label-text">password</span>
            </label>
            <input type="text" id="passwordId" placeholder='Enter Your Password' className="input input-bordered h-10 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <NavLink to={"/signup"} className='text-sm hover:underline hover:text-blue-500 mt-2 inline-block text-black'>{"Don't"} have an account? </NavLink>
          <div className='pt-2'>
            <button type='submit' className="btn btn-block btn-sm " disabled={loading}>{loading ? <span className="loading loading-spinner"></span> : "Login"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login