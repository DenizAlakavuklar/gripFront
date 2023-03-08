import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Text, Group, Container, Button, Grid, Box, Paper, Flex } from '@mantine/core';

const AllTripsPage = () => {
  const [trips, setTrips] = useState([])


  const fetchTrips = async () => {
    try {
      const response = await fetch('http://localhost:5005/trip/trips/alltrips')
      const parsed = await response.json()
      setTrips(parsed)
      console.log("Parsed is :", parsed)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  console.log("THESE ARE TRIPS:", trips)
  if (trips.length === 0) {
    <p> Loading...</p>
  }

  return (
    <Container size="xl" px="xs">
      <Flex align="center" justify="center" >
        <Text fz="xl"  fw={900}> <h2>Discover the trips created by the Grip community </h2> </Text>
      </Flex>
      <br/>
        <Paper shadow="xl" radius="md" p={100} width={900}>
            <Grid gutter="lg">
              {trips.map((trip) => {
                return (
                  <Grid.Col key={trip._id} md={6} lg={3} maw={150}>

                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                      <Card.Section component="a">
                        <Image
                          src={trip.image}
                          height={160}
                          alt="trip"
                        />
                      </Card.Section>

                      <Box  p={20}>
                        <Button variant="subtle" color="cyan" fullWidth mt="md" radius="md" >
                          <Link to={`/trips/${trip._id}`} style={{textDecoration:"none", color:"black"}}>{trip.tripName}</Link>
                        </Button>
                      </Box>
                    </Card>

                  </Grid.Col>
                )
              })}
            </Grid>
        </Paper>
    </Container>


  )
}

export default AllTripsPage