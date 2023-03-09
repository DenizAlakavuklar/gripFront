import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TripUpdateForm from '../components/TripUpdateForm'
import { ColorRing } from 'react-loader-spinner';

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

        //console.log("This is the parse", parsed)
        //console.log("This is the trip", trip)
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
          <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#d6f5f9', '#13daf4', '#a7f0f9', '#40d2e5', '#15aabf']}
          />
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