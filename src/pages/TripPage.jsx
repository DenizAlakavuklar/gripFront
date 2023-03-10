import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import VoteButton from '../components/VoteButton'
import Votes from '../components/Votes'
import VotingList from '../components/VotingList'
import { SessionContext } from '../contexts/SessionContext'
import { Card, Image, Flex, Text, Container, Button, Grid, Space, Box, Divider, Textarea, Paper } from '@mantine/core';
import { ColorRing } from 'react-loader-spinner';

const TripPage = () => {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [trip, setTrip] = useState()
  const [isDelete, setIsDelete] = useState(false)
  const [isSureDelete, setIsSureDelete] = useState(false)
  const [proposals, setProposals] = useState([])
  const [attendeesAllTrips, setAttendeesAllTrips] = useState([]);
  const { userId } = useContext(SessionContext);

  const fetchTrip = async () => {
    try {
      //console.log(userId)
      //TRIPS
      const response = await fetch(`${import.meta.env.VITE_HOST}/trip/trips/${tripId}`)
      const parsed = await response.json()
      //console.log(parsed)

      //PROPOSALS

      const response2 = await fetch(`${import.meta.env.VITE_HOST}/proposals/${tripId}/`)
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

  const fetchAttendeesTrips = async () => {
    try {

      //trips where user is an attendee
      const response = await fetch(`${import.meta.env.VITE_HOST}/trip/trips/usertrips/${userId}/attendeesAll`);
      const parsed = await response.json();

      setAttendeesAllTrips(parsed.map(trip => trip._id));

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTrip()
    setIsDelete(false)
  }, [tripId, isDelete])

  useEffect(() => {
    fetchAttendeesTrips()
    }, [proposals])

  const handleDelete = async () => {
    if (isSureDelete) {
      await fetch(`${import.meta.env.VITE_HOST}/trip/trips/${tripId}`, {
        method: 'DELETE',
      })

      navigate('/trips/usertrips')
    }

    if (!isSureDelete) {
      setIsSureDelete(!isSureDelete)
    }


  }

  const handleProposalDelete = async (tripId, proposalId) => {
    //console.log("tripId", tripId)
    //console.log("proposalId", proposalId)
    await fetch(`${import.meta.env.VITE_HOST}/proposals/${tripId}/${proposalId}`, {
      method: 'DELETE',
    })
    setIsDelete(true)
    navigate(`/trips/${tripId}`)

  }

  return isLoading ? (
    <ColorRing
visible={true}
height="80"
width="80"
ariaLabel="blocks-loading"
wrapperStyle={{}}
wrapperClass="blocks-wrapper"
colors={['#d6f5f9', '#13daf4', '#a7f0f9', '#40d2e5', '#15aabf']}
/>
  ) : (
    <>
    
      <Container size="xl" px="xs" style={{ display: "flex", flexDirection: "column", justifyContent: "left" }} mb={50}>
     <Box >


     
          <Box>
            <Flex justify="center" align="center" direction={"column"} gap="md" >

              <Image src={trip.image} width={600} height={400} radius="md" alt="trip" />

<Paper mr={50} ml={50} mt={50} shadow="xl" radius="md" p={50} pl={200} pr={200} width={900}>
              <Text fw={900}> <h1>{trip.tripName}</h1></Text>
              <Text size="sm" ><b>Description:  </b>{trip.description}</Text>
              <Text size="sm" ><b>Budget:  </b>{trip.budget}</Text>
              <Text size="sm" ><b>Location:  </b>{trip.location}</Text>
              <Text size="sm" ><b>Attendees:  </b> </Text>
              <ul>
                {trip.attendees.map(attendee => {
                  return <li>{attendee.username} <img src={attendee.picture} width="20" /></li>
                })}
              </ul>

              <Text color="cyan.9">Created By: {trip.createdBy.username}</Text>
              </Paper>
            
            </Flex>

            {/* Only show update and delete buttons if you were the creator */}

            <Flex justify="center" align="center" direction={"row"} gap="md" mt={50}>
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
                  </Button> : <Button color="cyan" type='button' onClick={handleDelete}>
                    Delete
                  </Button>}


                </>
                : ""}

            </Flex>
      </Box>


          <Divider size="sm" mt={30} />

        </Box>
        <Box mt={50}>
        <Flex direction={"row"} gap="5rem" >
        <Text size="xl" weight={700}>Proposals</Text>
        {attendeesAllTrips.includes(tripId) ? 
        <Link to={`/proposals/${trip._id}/add`}>
          <Button variant="outline" color="cyan" type='button'>Add New</Button>
        </Link>
        : ""}
      </Flex>
          <br />
          <br />
          {/* If 0 proposals, show text, if not, show proposals */}
          {proposals.length === 0 ? <p>This trip has no proposals yet! Be the first to create one!</p> :

            <Grid gutter="lg">
              {proposals.map(proposal => {
                return (
                  <Grid.Col key={proposal._id} md={6} lg={3} >
                    <Card shadow="sm" padding="lg" radius="md" withBorder p="xl" w={300} >
                      <Card.Section mb={20} >
                      <Link to={`/proposals/${tripId}/${proposal._id}`}>
                        <Image src={proposal.image} alt="trip" height={200} />
                      </Link>
                      </Card.Section>
                      <Paper h={150}>
                        <Text fz="lg" fw={700} lineClamp={2}>{proposal.title}</Text>
                        <br />

                        <Text size="sm" ><b>Location:</b> {proposal.location}</Text>

                        <Text size="sm" ><b>Nights:</b> {proposal.nights}</Text>
                        <Link to={`/proposals/${tripId}/${proposal._id}`} style={{ color: "indigo" }}>
                          <p>View details</p>
                        </Link>
                      </Paper>
                      <Divider size="sm" mt={30} />
                      <Paper mt={20}>
                        <Text size="sm" ><b>Votes:  </b> </Text>
                        <Votes proposal={proposal} allVotes={proposal.votes} trip={trip._id} tripId={trip._id} />

                        <Flex justify="flex-start" align="flex-start" direction={"row"} gap="xl" mt={20}>
                          <Text color="cyan.9">Added By:  {proposal.createdBy.username} <img src={proposal.createdBy.picture} width="20" /></Text>

                          {/* Only show update and delete buttons if you were the creator */}
                          {userId === proposal.createdBy._id ?
                            <>
                              <Button color="cyan.8" type='button' onClick={(e) => { handleProposalDelete(tripId, proposal._id) }}>
                                Delete
                              </Button>
                            </>
                            : ""}

                        </Flex>
                      </Paper>
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