import React from 'react'
import TripForm from '../components/TripForm'
import { useState, useEffect } from 'react'


function NewTripPage() {
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
    console.log("HELLO mounted")
  }, [])

  return (
    <div>
        <h2>Create your trip</h2>
        <TripForm allUsers={allUsers}/>
    

    </div>
  )
}

export default NewTripPage