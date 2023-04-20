import React, { useState, useContext, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext';
function VoteButton({allVotes, proposalId, tripId, trip,
    title,
    image,
    location,
    type,
    totalPrice,
    nights,
    link,
    link2, 
    votes, setVotes}) {
    const [allUsers, setAllUsers] = useState("")

    const fetchUsers = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_HOST}/auth/allusers`)
          const parsed = await response.json()
          setAllUsers(parsed)
          //console.log("Parsed users is :", parsed)
        } catch (error) {
          console.log(error)
        }
      }
    
      useEffect(()=>{
        fetchUsers()
                 
      }, [])
const { userId } = useContext(SessionContext);
//console.log("votes:", votes)
//checks is user has already voted which is used to set state (button)
const proposalVote = {...votes}
//console.log("proposalVote: ", proposalVote)
const proposalVoteInfo = Object.values(proposalVote).filter(vote => vote._id===userId)[0]
//console.log("proposalVoteInfo", proposalVoteInfo)

//has user already voted? sets voted state at beginning
const [voted, setVoted] = useState(proposalVoteInfo ? true : false)
//logged in user info to beable to display username in list (instead of just userid - session context)
const userInfo = {...allUsers}
const loggedinUserInfo = Object.values(userInfo).filter(user => user._id===userId)[0]
//console.log("userId", userId)
const addVote = ()=>{
  //console.log("votes-before", votes)
  //if user has voted, when they click button they are removing the vote
  if(voted){
    console.log("inside VOTED HANDLESUBMIT:")
    const votesWithoutUser = votes.filter((vote)=>vote._id !==userId)
    setVotes(votesWithoutUser)
    //this will add their vote to votes
  } else {
    console.log("inside ELSE HANDLESUBMIT:")
      //current votes + logged in user
      setVotes([...votes, loggedinUserInfo])
  }
}
const handleSubmit = async (event) => {

  setVoted(!voted)
    //console.log("votes-after", votes)
    event.preventDefault()
    try {
        const response = await fetch(
            `${import.meta.env.VITE_HOST}/proposals/${tripId}/${proposalId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   /*  _id: proposalId, */
                    title,
                    image,
                    location,
                    type,
                    totalPrice,
                    nights,
                    link,
                    link2,
                    votes: votes,
                    trip: tripId,
                    createdBy: userId
                }),
            }
        );

        const parsed = await response.json()
        //setVotes(parsed.votes)
        console.log("response", response)

      } catch (error) {
        console.log(error)
      }
    }
    return (
      <div>
  <form  onSubmit={handleSubmit}>
  <button onClick={addVote}>{voted ? "✖️ Remove": "🗳️ Vote"}</button>

</form>
    </div>
  )
}
export default VoteButton
