import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
export const AuthContext = createContext(null)


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))||null)
  const [loading, setLoading] = useState(false)

  const{data,refetch}=useQuery({
    queryKey:["user",user],
    queryFn:async()=>{
      const {data}=await axios(`${import.meta.env.VITE_API_URL}/users/${user?.email}`)
      if(data){
        localStorage.setItem('user', JSON.stringify(user));
            }
      setUser(data);
      return(data);
    }
  })
  const logOut = async () => {
    setLoading(true)
    try{
      await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true,
      }).then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
      setUser(null)
      
    }catch(err){
      console.log(err);
    }
    
   
  }
  // Get token from server
  const getToken = async email => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email },
      { withCredentials: true }
    )
    return data
  }

  

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    getToken,
    logOut,
    refetch,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  // Array of children.
  children: PropTypes.array,
}

export default AuthProvider
