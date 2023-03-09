import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Text, Group, Container, Button, Grid, Box, Paper, Flex } from '@mantine/core';
import { ColorRing } from 'react-loader-spinner';
const AllTripsPage = () => {
  const [trips, setTrips] = useState([])


  const fetchTrips = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/trip/trips/alltrips`)
      const parsed = await response.json()
      setTrips(parsed)
      //console.log("Parsed is :", parsed)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  //console.log("THESE ARE TRIPS:", trips)
  if (trips.length === 0) {
    <p> There are no trips in the database. </p>
  }

  return (
    <Container size="xl" px="xs">
      <Flex align="center" justify="center" >
        <Text fz="xl" fw={900}> <h2>Discover the trips created by the Grip community </h2> </Text>
      </Flex>


      <Paper mt={-50} mr={50} ml={50} shadow="xl" radius="md" p={100} width={900}>
        <Grid gutter="lg">
          {trips ? trips.map((trip) => {
            return (
              <Grid.Col key={trip._id} md={6} lg={3} maw={150}>

                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section component="a">
                    <Link to={`/trips/${trip._id}`} style={{ textDecoration: "none", color: "#0B7285" }}>
                      <Image
                        src={trip.image}
                        height={160}
                        alt="trip"
                      />
                    </Link>
                  </Card.Section>

                  <Box p={20}>
                    <Button variant="light" color="cyan" fullWidth mt="md" radius="md">

                      <Link to={`/trips/${trip._id}`} style={{ textDecoration: "none", color: "#0B7285" }}>{trip.tripName}</Link>

                    </Button>
                  </Box>
                </Card>

              </Grid.Col>
            )
          }) : <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#d6f5f9', '#13daf4', '#a7f0f9', '#40d2e5', '#15aabf']}
          />}
        </Grid>
      </Paper>
    </Container>


  )
}

export default AllTripsPage