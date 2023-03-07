import React, { useState, useContext, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext';



function VoteButton({allVotes}) {
    const [allUsers, setAllUsers] = useState("")
    const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:5005/auth/allusers')
          const parsed = await response.json()
          setAllUsers(parsed)
          console.log("Parsed users is :", parsed)
        } catch (error) {
          console.log(error)
        }
      }
    
      useEffect(()=>{
        fetchUsers()
                 
      }, [])


const { userId } = useContext(SessionContext);
const [votes, setVotes] = useState(allVotes)

const [voted, setVoted] = useState(false)

const userInfo = {...allUsers}
const loggedinUserInfo = Object.values(userInfo).filter(user => user._id===userId)[0]

//console.log("userId", userId)
console.log("votes", votes)



const addVote = ()=>{
    if(voted){
        const votesWithoutUser = votes.filter((vote)=>vote._id !==userId)
        setVotes(votesWithoutUser)
    } else {
        setVotes([...votes, loggedinUserInfo])
    }
        setVoted(!voted)

/* 
        const handleSubmit = async event => {
            event.preventDefault()
            try {
                const response = await fetch(
                    `http://localhost:5005/proposals/${tripId}/update`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
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
    
              if (response.status === 201) {
                const parsed = await response.json()
                navigate(`/trips/${parsed._id}`)
              }
              if (response.status === 200) {
                navigate(`/trips/${tripId}`)
              }
            } catch (error) {
              console.log(error)
            }
          } */



}
  return (
    <div>

<button onClick={addVote}>{voted ? "Remove Vote": "Add Vote"}</button>

    </div>
  )
}

export default VoteButton