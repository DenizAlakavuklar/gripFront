import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext';
import Votes from '../components/Votes';
import { Card, Image, Flex, Text, Container, Group, Button, Grid, Space, Box, Paper} from '@mantine/core';


function ProposalDetailsPage() {
    const { tripId, proposalId } = useParams()
    const navigate = useNavigate()

    const [proposals, setProposals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { userId } = useContext(SessionContext);


   const fetchProposals = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/proposals/${tripId}/${proposalId}`)
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
      await fetch(`${import.meta.env.VITE_HOST}/proposals/${tripId}/${proposalId}`, {
        method: 'DELETE',
      })
      navigate(`/trips/${tripId}`)
    }


    return isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
        <Flex justify="flex-start" align="flex-start" direction={'column'}  >
           <Box mt={40} ml={50}>
              <Link to={`/trips/${proposals.trip}/`} >
                <button type='button'>Go back to trip</button>
              </Link>
           </Box>
        </Flex>

            <Flex justify="center" align="center" direction={'column'}>
                  <h1>{proposals.title}</h1>
                  <Image src={proposals.image} alt="Trip" width={800} height={400} radius="md"/>

          <Flex>
            <Box>
              <Paper mt={25} mr={50} ml={50} shadow="xl" radius="md" p={100} width={900}>
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

              </Paper>
            </Box>


          <Box>
            <Paper mt={25} mr={50} ml={50} shadow="xl" radius="md" p={100} width={900}>
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
              </Paper>
            </Box>
      </Flex>
        
        </Flex>
      
        </>
      )
}

export default ProposalDetailsPage