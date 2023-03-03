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
        const response = await fetch(`http://localhost:5005/trip/trips/${tripId}`)
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
  
    return (
      <div>
      <> Update your trip!</>
        {isLoading ? (
          <h1>Loading ...</h1>
        ) : (
          <TripUpdateForm
          tripName={trip.tripName}
          image={trip.image}
          description={trip.description}
          budget={trip.budget}
          location={trip.location}
          attendees={trip.attendees}
          isUpdating
          tripId={tripId}
        />
      )}
    </div>
  )
}

export default UpdateTripPage