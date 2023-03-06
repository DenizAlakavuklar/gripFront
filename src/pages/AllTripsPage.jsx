import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Text, Group, Container, Button, Grid } from '@mantine/core';

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
      <Text fz="xl" c="violet.9" fw={700}>All the trips you've ever wanted</Text>
      <br/>
      <Grid gutter="lg">
        {trips.map((trip) => {
          return (
            <Grid.Col key={trip._id} md={6} lg={3} maw={150}>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" href="https://mantine.dev/">
                  <Image
                    src={trip.image}
                    height={160}
                    alt="trip"
                  />
                </Card.Section>

                <Button variant="light" color="cyan" fullWidth mt="md" radius="md">
                  <Link to={`/trips/${trip._id}`} style={{textDecoration:"none" , color:"indigo"}}>{trip.tripName}</Link>
                </Button>
              </Card>

            </Grid.Col>
          )
        })}
      </Grid>
    </Container>


  )
}

export default AllTripsPage