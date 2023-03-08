import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import VoteButton from '../components/VoteButton'
import Votes from '../components/Votes'
import VotingList from '../components/VotingList'
import { SessionContext } from '../contexts/SessionContext'
import { Card, Image, Flex, Text, Container, Group, Button, Grid, Space, Box, Divider } from '@mantine/core';


const TripPage = () => {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [trip, setTrip] = useState()
  const [isDelete, setIsDelete] = useState(false)
  const [isSureDelete, setIsSureDelete] = useState(false)
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
    setIsDelete(false)
  }, [tripId, isDelete])

  /*   useEffect(() => {
      fetchTrip()
    }, [proposals])
   */

  const handleDelete = async () => {
if(isSureDelete){
await fetch(`http://localhost:5005/trip/trips/${tripId}`, {
      method: 'DELETE',
    })
    
    navigate('/trips/usertrips')
}

if(!isSureDelete){
  setIsSureDelete(!isSureDelete)
  }

    
  }

  const handleProposalDelete = async (tripId, proposalId) => {
    console.log("tripId", tripId)
    console.log("proposalId", proposalId)
    await fetch(`http://localhost:5005/proposals/${tripId}/${proposalId}`, {
      method: 'DELETE',
    })
    setIsDelete(true)
    navigate(`/trips/${tripId}`)

  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Container size="xl" px="xs" style={{ display: "flex", flexDirection: "column", justifyContent: "left" }} mb={50}>
        <Box >
          <Flex justify="flex-start" align="flex-start" direction={"column"} gap="md" >

            <Image src={trip.image} width={600} height={300}
              alt="trip" />


            <Text>{trip.tripName}</Text>

            <Text size="sm" ><b>Date estimation:  </b>{trip.dateDescription}</Text>
            <Text size="sm" ><b>Description:  </b>{trip.description}</Text>
            <Text size="sm" ><b>Budget:  </b>{trip.budget}</Text>
            <Text size="sm" ><b>Location:  </b>{trip.location}</Text>
            <Text size="sm" ><b>Attendees:  </b> </Text>
            <ul>
              {trip.attendees.map(attendee => {
                return <li>{attendee.username} <img src={attendee.picture} width="20" /></li>
              })}
            </ul>

            <Text color="cyan.9" underline italic>Created By: {trip.createdBy.username}</Text>
          </Flex>
          {/*  {console.log("userId: ", userId, "trip.createdBy: ", trip.createdBy)} */}
          {/* Only show update and delete buttons if you were the creator */}

          <Flex justify="flex-start" align="flex-start" direction={"row"} gap="md" mt={50}>
            {userId === trip.createdBy._id ?

              <>
                <Link to={`/trips/update/${trip._id}`}>
                  <Button color="cyan" type='button'>Update</Button>
                </Link>
                {/* <Button color="cyan" type='button' onClick={handleDelete}>
                  Delete
                </Button> */}

                {isSureDelete ? <Button color="red" type='button' onClick={handleDelete}>
                  Are you sure?
                </Button>:  <Button color="cyan" type='button' onClick={handleDelete}>
                  Delete
                </Button>}

                
              </>
              : ""}

          </Flex>
          <Divider size="sm" mt={30} />

        </Box>
        <Box mt={50}>
          <Flex direction={"row"} gap="5rem" >
            <Text size="xl" weight={700}>Proposals</Text>
            <Link to={`/proposals/${trip._id}/add`}>
              <Button variant="outline" color="cyan" type='button'>Add a New</Button>
            </Link>
          </Flex>
          <br />
          <br />
          {/* If 0 proposals, show text, if not, show proposals */}
          {proposals.length === 0 ? <p>This trip has no proposals yet! Be the first to create one!</p> :

            <Grid gutter="lg">
              {proposals.map(proposal => {
                return (

                  <Grid.Col key={proposal._id} md={6} lg={3} maw={150}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                      <Card.Section  >
                        <Image src={proposal.image} alt="trip" />


                      </Card.Section>
                      <h3>{proposal.title}</h3>

                      <Text size="sm" ><b>Location:</b> {proposal.location}</Text>

                      <Text size="sm" ><b>Nights:</b> {proposal.nights}</Text>
                      <Link to={`/proposals/${tripId}/${proposal._id}`} style={{ color: "indigo" }}>
                        View details
                      </Link>

                      {/* <Link to={proposal.link} target="_blank">
                  <Button type='button'>More info</Button>
                  </Link>
                */}
                      <Divider size="sm" mt={30} />

                     
                        <Text size="sm" ><b>Votes:  </b> </Text>
                        <Votes proposal={proposal} allVotes={proposal.votes} trip={trip._id} tripId={trip._id}/>
                
               


                      <Flex justify="flex-start" align="flex-start" direction={"row"} gap="xl" mt={20}>
                        <Text color="cyan.9" underline italic>Added By:  {proposal.createdBy.username} <img src={proposal.createdBy.picture} width="20" /></Text>

                        {/* Only show update and delete buttons if you were the creator */}
                        {userId === proposal.createdBy._id ?
                          <>
                            {/*  <Link to={`/${trip._id}/${proposal._id}/update/`}>
          <button type='button'>Update</button>
          </Link> */}

                            <Button color="cyan.8" type='button' onClick={(e) => { handleProposalDelete(tripId, proposal._id) }}>
                              Delete
                            </Button>
                          </>
                          : ""}


                      </Flex>

                    </Card>
                  </Grid.Col>)
              })

              }


            </Grid>

          }
        </Box>
      </Container>
    </>
  )
}

export default TripPage