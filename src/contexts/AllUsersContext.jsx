import { createContext, useEffect, useState } from "react";

export const AllUsersContext = createContext();

const AllUsersContextProvider = ({ children }) => {
    const [allUsers, setAllUsers] = useState("")
    const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:5005/auth/allusers')
          const parsed = await response.json()
          setAllUsers(parsed)
          console.log("Parsed users is :", parsed)
        } catch (error) {
          console.log(error)
        }
      }
    
      useEffect(()=>{
        fetchUsers()
                 
      }, [])

    return (
        <AllUsersContext.Provider value={{ allUsers }} >{children}</AllUsersContext.Provider>
    )
}

export default AllUsersContext;