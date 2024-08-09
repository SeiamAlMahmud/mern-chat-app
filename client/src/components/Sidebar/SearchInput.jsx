import React from 'react'
import { FiSearch } from "react-icons/fi";
const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
      <input type="text" placeholder="Search.." className="input input-bordered rounded-full" />
      <button className='btn btn-circle bg-blue-500 text-white'>
      <FiSearch className='w-6 h-6 outline-none' />
      </button>
    </form>
  )
}

export default SearchInput