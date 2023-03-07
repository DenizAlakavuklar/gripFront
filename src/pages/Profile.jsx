import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SessionContext } from '../contexts/SessionContext';

function Profile() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { token } = useContext(SessionContext);
  const [attendeesTrips, setAttendeesTrips] = useState([]);
  const [trips, setTrips] = useState([]);
  const [tripCount, setTripCount] = useState(0);
  
  const fetchUser = async () => {
    const response = await fetch(`http://localhost:5005/auth/user/${userId}`, {
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
        const response = await fetch(`http://localhost:5005/trip/trips/usertrips/${userId}`, {
          method: 'GET',
          headers: {
            authorization: `Hopper ${token}`
          },
        });
        const parsed = await response.json();
        setTrips(parsed);

        //trips that user is an attendee of
        const response2 = await fetch(`http://localhost:5005/trip/trips/usertrips/${userId}/attendees`, {
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

  return (
    <div>
   <h1>Welcome, {user.username}!</h1>
   <p>Explore and blah blah.</p>
   <p><b>Trips created: </b> {tripCount}</p>
   <p><b>Trips attending: </b> {trips.length + attendeesTrips.length}</p>

<Link to="/trips/new">
  <button>Create a trip</button>
</Link>
<Link to="/trips/usertrips">
  <button>Explore my trips</button>
</Link>
</div>
);
}
export default Profile;