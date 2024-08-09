import React from 'react'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className='flex h-screen p-4 items-center justify-center'>
    <Outlet/>   
    </div>
  )
}

export default Root