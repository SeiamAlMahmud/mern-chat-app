import React, { Children, createContext, useContext, useState } from 'react'


export const AuthContext = createContext()

export const useAuthContext = ()=>{
  return useContext(AuthContext)
}
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState( localStorage.getItem("chat-user") || null)
  const [data, setData] = useState()

  return <AuthContext.Provider value={{ authUser, setAuthUser, data, setData }} >
    {children}
  </AuthContext.Provider>
}