import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext';

const TripPage = () => {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [trip, setTrip] = useState()
  const [proposals, setProposals] = useState([])
  const { userId } = useContext(SessionContext);

  const fetchTrip = async () => {
    try {
      console.log(userId)
      const response = await fetch(`http://localhost:5005/trip/trips/${tripId}`)
      const parsed = await response.json()
      if (parsed === null) {
        navigate('/trips/:tripId')
      } else {
        //console.log(parsed)
        setTrip(parsed)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTrip()
    fetchProposals()
  }, [tripId])


  const fetchProposals = async () => {
    try {
      const response = await fetch(`http://localhost:5005/proposals/${tripId}/`)
      const parsed = await response.json()
      setProposals(parsed)
      setIsLoading(false)
      //console.log("parsed :", parsed)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    await fetch(`http://localhost:5005/trip/trips/${tripId}`, {
      method: 'DELETE',
    })
    navigate('/trips/usertrips')
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
    <div style={{ border: "1px solid black", padding: "10px" }}>
        <h1>{trip.tripName}</h1>
        <p>Date estimation: {trip.dateDescription}</p>
        <img src={trip.image} alt="Trip" width="300" />
        <p>Description: {trip.description}</p>
        <p>Budget: {trip.budget}</p>
        <p>Location: {trip.location}</p>
        <p>Attendees: {trip.attendees}</p>
        <p>createdBy: {trip.createdBy}</p>

{/* Only show update and delete buttons if you were the creator */}
        {userId===trip.createdBy ? 
        <>
          <Link to={`/trips/update/${trip._id}`}>
          <button type='button'>Update</button>
          </Link>
          <button type='button' onClick={handleDelete}>
              Delete
          </button>
        </>
        : ""}

        

      </div>

        <h2>Proposals</h2>
        <Link to={`/proposals/${trip._id}/add`}>
          <button type='button'>Add Proposal</button>
          </Link>
        {/* If 0 proposals, show text, if not, show proposals */}
    {proposals.length===0 ? "This trip has no proposals yet! Be the first to create one!" :

      <div style={{ display: "flex", width: "600px" }}>
        {proposals.map(proposal => {
          return (

            <div key={proposal._id} style={{ border: "1px solid black", padding: "10px" }}>


              <h3>{proposal.title}</h3>
              {/* <img src={proposal.image} alt={proposal.title} width="300"/> */}
              <p><b>Type:</b> {proposal.type}</p>
              <p><b>Location:</b> {proposal.location}</p>
              <p><b>Total Price:</b> {proposal.totalPrice}</p>
              <p><b>Nights:</b> {proposal.nights}</p>

              <Link to={proposal.link} target="_blank">
                <button type='button'>More info</button>
              </Link>

              {proposal.link2 ? (<Link to={proposal.link2} target="_blank">
                <button type='button'>More info</button>
              </Link>) : ''}

              <p>Votes: {proposal.votes}</p>
              <p>Created By: {proposal.createdBy}</p>

              <Link to={`/proposals/${tripId}/${proposal._id}`}>
                <button type='button'>View proposal</button>
              </Link>

            </div>)
        })

        }


      </div>
}

    </>
  )
}

export default TripPage