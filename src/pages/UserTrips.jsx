import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext';
import { Card, Image, Text, Group, Container, Button, Grid, Space  } from '@mantine/core';

function UserTrips() {
    const [userTrips, setUserTrips] = useState([]);
    const [attendeesTrips, setAttendeesTrips] = useState([]);
    const { userId } = useContext(SessionContext);
    console.log("This is the user", userId)
    const fetchUserTrips = async () => {
      try {
        // with query:
        // const response = await fetch(`http://localhost:5005/trip/trips/usertrips/?user=${userId}`);
        // with params (I'd need to update the backedn routes): 
        //usertrips
        const response = await fetch(`http://localhost:5005/trip/trips/usertrips/${userId}`);
        const parsed = await response.json();
        setUserTrips(parsed);
        console.log('Parsed is :', parsed);


        //trips where user is an attendee
        const response2 = await fetch(`http://localhost:5005/trip/trips/usertrips/${userId}/attendees`);
        const parsed2 = await response2.json();
        setAttendeesTrips(parsed2);
        console.log('Parsed2 is :', parsed2);

      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
        if (userId){
            fetchUserTrips();
        }
    }, [userId]);
  
    console.log('These are the user trips', userTrips);

    
    return (
      <>

      <Container size="xl" px="xs">
<h1>Explore your next trips</h1>

<Text fz="xl" c="blue.9" fw={700}>Trips you made</Text>
              <br/>
        </Container>
      
      {userTrips.length > 0 ? 
      
      <Container size="xl" px="xs">
              
             
        <Grid gutter="lg">
                       {userTrips.map((userTrip) => {
                    return(
             
    <Grid.Col key={userTrip._id} md={6} lg={3} maw={150}>
   <Card shadow="sm" padding="lg" radius="md" withBorder>
  
   <Text fz="lg" c="blue.9" fw={500}>{userTrip.tripName}</Text>
   <Space h="md" />
                  <Card.Section component="a">
  
     
      <Link to={`/trips/${userTrip._id}/`}>
                  <img src={userTrip.image} alt="Trip" width="300" /></Link>
                  </Card.Section>
                  <p>{userTrip.description}</p>
                  <Link to={`/trips/${userTrip._id}`}>
                      <button type='button'>Details</button>
                  </Link>
                  </Card>
                  </Grid.Col>
                      )})}
                </Grid>
  
              </Container> 

              : 
              <Container size="xl" px="xs">
                <p>You have not created any trips yet. <Link to={`/trips/new`}>
                      Create a trip now!
                  </Link></p></Container>
                }
            
            
            


            <Container size="xl" px="xs" mt={50}>

            <Text fz="xl" c="blue.9" fw={700}>Other trips that you have been invited to</Text>

            </Container>

            {attendeesTrips.length > 0 ?  
            <Container size="xl" px="xs" mt={50}>
            <Grid gutter="lg">
           
                     {attendeesTrips.map((userTrip) => {
                  return(
            
 <Grid.Col key={userTrip._id} md={6} lg={3} maw={150}>
  <Card shadow="sm" padding="lg" radius="md" withBorder>
                
    <Text fz="lg" c="blue.9" fw={500}>{userTrip.tripName}</Text>
    <Space h="md" />
<Card.Section component="a">

    <Link to={`/trips/${userTrip._id}/`}>
                <img src={userTrip.image} alt="Trip" width="300" />
                </Link>
                </Card.Section>
                <p>{userTrip.description}</p>
                <Link to={`/trips/${userTrip._id}`}>
                    <button type='button'>Details</button>
                </Link>
                </Card>
                </Grid.Col>
                    )
                    
                    
                    })}
           
            </Grid>
            </Container>
            
            :
            
            <Container size="xl" px="xs" mt={50}>
            <p>You haven't been invited to other trips. Share Grip with your friends so they can start inviting you.</p>
              
       
              </Container>}
            
            </>
          )
        }
        export default UserTrips