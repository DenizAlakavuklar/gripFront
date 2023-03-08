import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext';
import Votes from '../components/Votes';
import { Card, Image, Flex, Text, Container, Group, Button, Grid, Space } from '@mantine/core';


function ProposalDetailsPage() {
    const { tripId, proposalId } = useParams()
    const navigate = useNavigate()

    const [proposals, setProposals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { userId } = useContext(SessionContext);


   const fetchProposals = async () => {
      try {
        const response = await fetch(`http://localhost:5005/proposals/${tripId}/${proposalId}`)
        const parsed = await response.json()
        setProposals(parsed[0])
        setIsLoading(false)
        //console.log("parsed :", parsed)
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      fetchProposals()
    }, [proposalId]) 

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
        <Flex justify="flex-start" align="flex-start" direction={'column'}  >
        <Link to={`/trips/${proposals.trip}/`}>
          <button type='button'>Go back to trip</button>
          </Link>
       
            <h1>{proposals.title}</h1>
            <img src={proposals.image} alt={proposals.title} width="300"/>
         
            <p><b>Type:</b> {proposals.type}</p>
            <p><b>Location:</b> {proposals.location}</p>
            <p><b>Total Price:</b> {proposals.totalPrice}</p>
            <p><b>Price per night:</b> {proposals.totalPrice / proposals.nights}</p>
            <p><b>Nights:</b> {proposals.nights}</p>
          
        {/* <Link to={proposals.link} target="_blank">
            <button type='button'>More info</button>
        </Link> */}

        {proposals.link2 ? (<Link to={proposals.link2} target="_blank">
            <button type='button'>More info</button>
        </Link>) : '' }

        <p><b>Votes:</b></p>

<Votes proposal={proposals} allVotes={proposals.votes} trip={tripId} tripId={tripId}/>
<p>Added By: {proposals.createdBy.username} <img src={proposals.createdBy.picture} width="20"/></p>

        {/* Only show update and delete buttons if you were the creator */}
        {userId===proposals.createdBy._id ? 
        <>
          {/* <Link to={`/${proposals.trip}/${proposals._id}/update/`}>
          <button type='button'>Update</button>
          </Link> */}
          <button type='button' onClick={(e)=>{handleProposalDelete(proposals._id)}}>
              Delete
          </button>
        </>
        : ""}
   

      </Flex>
        </>
      )
}

export default ProposalDetailsPage