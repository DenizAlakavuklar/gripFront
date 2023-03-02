import { useReducedMotion } from '@mantine/hooks'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext';

function Profile() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const {token} = useContext(SessionContext);

  console.log('userid:', userId);
  

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
      // console.log(user)
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
    </div>
  );
}

export default Profile;
