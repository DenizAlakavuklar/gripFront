import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SessionContext } from '../contexts/SessionContext';
import { Box, Flex, Paper, Button, PasswordInput, Text, TextInput, BackgroundImage } from '@mantine/core'
import { ColorRing } from 'react-loader-spinner';
function Profile() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { token } = useContext(SessionContext);
  const [attendeesTrips, setAttendeesTrips] = useState([]);
  const [trips, setTrips] = useState([]);
  const [tripCount, setTripCount] = useState(0);
  
  const fetchUser = async () => {
    const response = await fetch(`${import.meta.env.VITE_HOST}/auth/user/${userId}`, {
      method: 'GET',
      headers: {
        authorization: `Hopper ${token}`
      },
    });
    const user = await response.json();
    setUser(user);
  };

  useEffect(() =>{
    fetchUser()
    }, [])

    useEffect(() => {
      fetchUser();
      const fetchTrips = async () => {
        //trips that user made
        const response = await fetch(`${import.meta.env.VITE_HOST}/trip/trips/usertrips/${userId}`, {
          method: 'GET',
          headers: {
            authorization: `Hopper ${token}`
          },
        });
        const parsed = await response.json();
        setTrips(parsed);

        //trips that user is an attendee of
        const response2 = await fetch(`${import.meta.env.VITE_HOST}/trip/trips/usertrips/${userId}/attendees`, {
          method: 'GET',
          headers: {
            authorization: `Hopper ${token}`
          },
        });
        const parsed2 = await response2.json();
        setAttendeesTrips(parsed2);
      };
      fetchTrips();
    }, [userId, token]);
    
    
    useEffect(() => {
      setTripCount(trips.length);
    }, [trips]);
    if (!user) {
      return <div>Loading...</div>;
    } 

    //console.log("Thus is the username:", typeof user.username)
  
  
    return (
   

<Box>
    <BackgroundImage
        src="https://images.unsplash.com/photo-1542235222-30e843cb43a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
    >

      <Flex justify="center" align="center">

        <Box mt={230} mb={60}>
        <Paper shadow="xl" radius="md" p={100} pt={80}>

                {user.username ? <h1>Welcome home, {user.username.charAt(0).toUpperCase() + user.username.substring(1)}!</h1> : <ColorRing
visible={true}
height="80"
width="80"
ariaLabel="blocks-loading"
wrapperStyle={{}}
wrapperClass="blocks-wrapper"
colors={['#d6f5f9', '#13daf4', '#a7f0f9', '#40d2e5', '#15aabf']}
/>}
      

                <p>Explore and discover the world with us.</p>
              <p>
                <b>You have created </b> 
                <b style={{color: "#9c3002", fontSize:"30px"}}> {tripCount} </b>
                <b>trips </b>
              </p>

              <p>
                <b>You are attending </b> 
                <b style={{color: "#9c3002", fontSize:"30px"}}> {trips.length + attendeesTrips.length} </b>
                <b>trips </b>
              </p>

           <Flex>

               <Box mr={40}>
                  <Link to="/trips/new" mr={50}>
                <button>Create a trip</button>
                  </Link>
              </Box>

              <Box>
                <Link to="/trips/usertrips">
                  <button>Explore my trips</button>
                </Link>
              </Box>

           </Flex>
</Paper>
            <Box
            sx={{
              margin: '0 auto',
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 'calc(20vh - 1px)',
            }}
            />


           </Box>
       

  </Flex>

  </BackgroundImage>
  </Box>
  

);
}

export default Profile;