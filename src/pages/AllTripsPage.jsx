import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AllTripsPage = () => {
  const [trips, setTrips] = useState([])
  

  const fetchTrips = async () => {
    try {
      const response = await fetch('http://localhost:5005/trip/trips/alltrips')
      const parsed = await response.json()
      setTrips(parsed)
      console.log("Parsed is :", parsed)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log("Hello")
    fetchTrips()
  }, [])

  console.log("THESE ARE TRIPS:", trips)
  if (trips.length===0){
    <p> Loading...</p>
  } 

  return (
    <>
      <h1>All the trips you've ever wanted</h1>
      <ul>
        {trips.map((trip) => {
            return(
          <li key={trip._id}>
            <Link to={`/trips/${trip._id}`}>{trip.tripName}</Link>
          </li>
          )})}
          
      </ul>
    </>
  )
}

export default AllTripsPage