import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TripUpdateForm from '../components/TripUpdateForm'


const UpdateTripPage = () => {
    const { tripId } = useParams()
  
    const [isLoading, setIsLoading] = useState(true)
    const [trip, setTrip] = useState()
  
    const fetchTypedTripData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/trip/trips/${tripId}`)
        console.log("This is the resp", response)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const parsed = await response.json()
        setTrip(parsed)

        console.log("This is the parse", parsed)
        console.log("This is the trip", trip)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      fetchTypedTripData()
    }, [tripId])

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
             {isLoading ? (
          <h1>Loading ...</h1>
        ) : (
          <TripUpdateForm
          tripName={trip.tripName}
          image={trip.image}
          description={trip.description}
          budget={trip.budget}
          location={trip.location}
          currentAttendees={trip.attendees}
          isUpdating
          tripId={tripId}
          allUsers={allUsers}
        />
      )}
    </div>
  )
}

export default UpdateTripPage