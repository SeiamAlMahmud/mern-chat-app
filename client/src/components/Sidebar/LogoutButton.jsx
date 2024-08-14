import React from 'react'
import { BiLogOut } from "react-icons/bi"
import useLogOut from '../../Hooks/useLogOut'
const LogoutButton = () => {
  const { logOut, loading } = useLogOut()
  return (
    <div className='mt-auto'>
      {!loading ? (
        <BiLogOut className='h-6 w-6 cursor-pointer text-white'
          onClick={logOut} />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  )
}

export default LogoutButton