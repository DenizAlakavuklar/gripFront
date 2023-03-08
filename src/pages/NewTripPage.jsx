import React from 'react'
import TripForm from '../components/TripForm'
import { useState, useEffect } from 'react'


function NewTripPage() {
  const [allUsers, setAllUsers] = useState("")

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/auth/allusers`)
      const parsed = await response.json()
      setAllUsers(parsed)
      console.log("Parsed users is :", parsed)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchUsers()
    console.log("HELLO mounted")
  }, [])

  return (
    
    <div>
      
        <TripForm allUsers={allUsers}/>
    

    </div>
  )
}

export default NewTripPage