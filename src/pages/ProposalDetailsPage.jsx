import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'



function ProposalDetailsPage() {
    const { tripId, proposalId } = useParams()


    const [proposals, setProposals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  

   const fetchProposals = async () => {
      try {
        const response = await fetch(`http://localhost:5005/proposals/${tripId}/${proposalId}`)
        const parsed = await response.json()
        setProposals(parsed[0])
        setIsLoading(false)
        console.log("parsed :", parsed)
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      fetchProposals()
    }, [proposalId]) 


    return isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
        <div style={{ border: "1px solid black", padding: "10px" }}>
            <h1>{proposals.title}</h1>
            <img src={proposals.image} alt={proposals.title} width="300"/>
            <p><b>Type:</b> {proposals.type}</p>
            <p><b>Location:</b> {proposals.location}</p>
            <p><b>Total Price:</b> {proposals.totalPrice}</p>
            <p><b>Price per night:</b> {proposals.totalPrice / proposals.nights}</p>
            <p><b>Nights:</b> {proposals.nights}</p>

        <Link to={proposals.link} target="_blank">
            <button type='button'>More info</button>
        </Link>

        {proposals.link2 ? (<Link to={proposals.link2} target="_blank">
            <button type='button'>More info</button>
        </Link>) : '' }

            <p>Votes: {proposals.votes}</p>
            <p>Created By: {proposals.createdBy}</p>

          </div>
        </>
      )
}

export default ProposalDetailsPage