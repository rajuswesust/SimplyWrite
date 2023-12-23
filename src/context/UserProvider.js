import React, { useEffect, useState } from 'react'
import userContext from './userContext'
import { getCurrentUserDetail, isLoggedIn } from '../auth';

const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        data: {},
        isLoggedIn: false
    });

    useEffect(() => {
      console.log("setting user to context...", getCurrentUserDetail(), " ", isLoggedIn());
      setUser({
          data: getCurrentUserDetail(),
          isLoggedIn: isLoggedIn()
      })
  }, [])

  return (
     <userContext.Provider value={{ user, setUser }}>
            {children}
    </userContext.Provider>
  )
}

export default UserProvider
