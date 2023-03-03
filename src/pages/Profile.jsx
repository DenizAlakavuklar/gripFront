import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SessionContext } from '../contexts/SessionContext';

function Profile() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { token } = useContext(SessionContext);
  const [trips, setTrips] = useState([]);
  const [tripCount, setTripCount] = useState(0);

  useEffect(() => {
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
    fetchUser();

    const fetchTrips = async () => {
      const response = await fetch(`http://localhost:5005/trip/user/${userId}`, {
        method: 'GET',
        headers: {
          authorization: `Hopper ${token}`
        },
      });
      const parsed = await response.json();
      setTrips(parsed);
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
      
      <h2>You have {tripCount} {tripCount === 1 ? 'trip' : 'trips'} created</h2>
      
      {trips.length > 0 ? (
        <>
          <ul>
            {trips.map((trip) => {
            return(
              <li key={trip._id}>
                <Link to={`/trips/${trip._id}`}>{trip.tripName}</Link>
              </li>
            )})}
          </ul>
        </>
      ) : (
        <div>
          <p>You don't have any trips created.</p>
          <Link to="/trips/new">
            <button>Create one</button>
          </Link>
        </div>
      )}
      <Link to="/trips/mytrips">
        <button>Explore my trips</button>
      </Link>

    </div>
  );
}

export default Profile;