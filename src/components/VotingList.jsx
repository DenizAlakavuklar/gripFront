import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router';
import { SessionContext } from '../contexts/SessionContext';
import VoteButton from './VoteButton';


function VotingList({proposal, allVotes, trip}) {
    //console.log("allVotes", allVotes)
    const { userId } = useContext(SessionContext);
    const {tripId} = useParams()
    const [proposals, setProposals] = useState([])
    const [votes, setVotes] = useState(allVotes)

    const fetchProposals = async () => {
        try {
  
          //PROPOSALS
    
          const response2 = await fetch(`http://localhost:5005/proposals/${tripId}/`)
          const parsed2 = await response2.json()
          setProposals(parsed2)

        } catch (error) {
          console.log(error)
        }
      }
    
      useEffect(() => {
        fetchProposals()

      }, [votes])
    

  return (
    <div>
  <VoteButton key={proposal._id}  
  allVotes={proposal.votes} proposalId={proposal._id} trip={trip._id} tripId={trip._id}
  title={proposal.title}
  image={proposal.image}
  location={proposal.location}
  type={proposal.type}
  totalPrice={proposal.totalPrice}
  nights={proposal.nights}
  link={proposal.link}
  link2={proposal.link2}
  votes={votes}
  setVotes={setVotes}
  />

<ul>
              {votes.map(user =>{
            return <li>{user.username}</li>
            })}
            </ul>


    </div>
  )
}

export default VotingList