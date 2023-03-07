import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router';
import { SessionContext } from '../contexts/SessionContext';


function VotingList({allVotes}) {
    console.log("allVotes", allVotes)
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
        
        console.log("INSIDE THE USE EFFECT FOR VOTES2")
      }, [votes])
    

    
  return (
    <div>

<ul>
              {votes.map(user =>{
            return <li>{user.username}</li>
            })}
            </ul>

    </div>
  )
}

export default VotingList