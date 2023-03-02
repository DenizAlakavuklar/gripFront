import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


const TripPage= () => {
  const { tripId } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [trip, setTrip] = useState()

  const fetchTrip = async () => {
    try {
      const response = await fetch(`http://localhost:5005/trip/trips/${tripId}`)
      const parsed = await response.json()
      if (parsed === null) {
        navigate('/404')
      } else {
        console.log(parsed)
        setTrip(parsed)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTrip()
  }, [tripId])

  const handleDelete = async () => {
    await fetch(`http://localhost:5005/trip/trips/${tripId}`, {
      method: 'DELETE',
    })
    navigate('/trips/alltrips')
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
    <div style={{ border: "1px solid black", padding: "10px" }}>
        <h1>{trip.tripName}</h1>
        <img src={trip.image} alt="Trip" />
        <p>Description: {trip.description}</p>
        <Link to={`/trips/update/${trip._id}`}>
            <button type='button'>Update</button>
        </Link>
        <button type='button' onClick={handleDelete}>
            Delete
        </button>
      </div>
    </>
  )
}

export default TripPage