import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TripForm from '../components/TripForm'




const UpdateTripPage = () => {
    const { tripId } = useParams()
  
    const [isLoading, setIsLoading] = useState(true)
    const [trip, setTrip] = useState()
  
    const fetchTrip = async () => {
      try {
        const response = await fetch(`http://localhost:5005/trip/trips/${tripId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const parsed = await response.json()
        setTrip(parsed)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      fetchTrip()
    }, [tripId])
  
    return (
      <div>
      <p> Update your trip!</p>
        {isLoading ? (
          <h1>Loading ...</h1>
        ) : (
          <TripForm
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
  