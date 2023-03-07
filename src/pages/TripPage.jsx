import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import VoteButton from '../components/VoteButton';
import Votes from '../components/Votes';
import VotingList from '../components/VotingList';
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
      //console.log(userId)
      //TRIPS
      const response = await fetch(`http://localhost:5005/trip/trips/${tripId}`)
      const parsed = await response.json()
      //console.log(parsed)

      //PROPOSALS

      const response2 = await fetch(`http://localhost:5005/proposals/${tripId}/`)
      const parsed2 = await response2.json()
      


      if (parsed === null || parsed2 === null) {
        navigate('/trips/:tripId')
      } else {
       // console.log(parsed)
        setTrip(parsed)
        setProposals(parsed2)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTrip()
  }, [tripId])

/*   useEffect(() => {
    fetchTrip()
  }, [proposals])

 */

  const handleDelete = async () => {
    await fetch(`http://localhost:5005/trip/trips/${tripId}`, {
      method: 'DELETE',
    })
    navigate('/trips/usertrips')
  }

  const handleProposalDelete = async (proposalId) => {
    console.log("proposalId", proposalId)
    await fetch(`http://localhost:5005/proposals/${tripId}/${proposalId}`, {
      method: 'DELETE',
    })
    navigate(`/trips/${tripId}`)
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
    <div  key={trip._id} style={{ border: "1px solid black", padding: "10px" }}>
        <h1>{trip.tripName}</h1>
        <p>Date estimation: {trip.dateDescription}</p>
        <img src={trip.image} alt="Trip" width="300" />
        <p>Description: {trip.description}</p>
        <p>Budget: {trip.budget}</p>
        <p>Location: {trip.location}</p>
        <p>Attendees: </p>
          <ul>
          {trip.attendees.map(attendee =>{
         return <li>{attendee.username} <img src={attendee.picture} width="20"/></li>
        })}
        </ul>
        <p>Created By: {trip.createdBy.username}</p>
       {/*  {console.log("userId: ", userId, "trip.createdBy: ", trip.createdBy)} */}
{/* Only show update and delete buttons if you were the creator */}
        {userId===trip.createdBy._id ? 
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
    {proposals.length===0 ? <p>This trip has no proposals yet! Be the first to create one!</p> :

      <div style={{ display: "flex", width: "600px" }}>
        {proposals.map(proposal => {
          return (
            <div key={proposal.title} style={{ border: "1px solid black", padding: "10px" }}>

              {console.log(proposal)
}
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

               <p>Votes: </p>

               <Votes proposal={proposal} allVotes={proposal.votes} trip={trip._id} tripId={trip._id}/>
            <p>CreatedBy: {proposal.createdBy.username} <img src={proposal.createdBy.picture} width="20"/></p>

              <Link to={`/proposals/${tripId}/${proposal._id}`}>
                <button type='button'>View proposal</button>


              {/* Only show update and delete buttons if you were the creator */}
        {userId===proposal.createdBy._id ? 
        <>
         {/*  <Link to={`/${trip._id}/${proposal._id}/update/`}>
          <button type='button'>Update</button>
          </Link> */}
          <button type='button' onClick={(e)=>{handleProposalDelete(proposal._id)}}>
              Delete
          </button>
        </>
        : ""}
                
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