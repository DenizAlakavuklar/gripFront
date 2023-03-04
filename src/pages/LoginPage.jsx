import { Box, Button, PasswordInput, Text, TextInput } from '@mantine/core'
import axios from 'axios';
import { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { SessionContext } from '../contexts/SessionContext';


const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setUserId } = useContext(SessionContext);
 
    // States for checking the errors
    const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log("This is the userID:", userId)
    try {
      const response = await axios.post("http://localhost:5005/auth/login", {username: username, password: password}) 
      setToken(response.data.token);

      const userId = response.data.userId;
      setUserId(userId);
      navigate(`/profile/${userId}`);
      
      console.log(response.data)

    } catch (error) {
      console.log("Error: ", error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  }

  return (
    <Box
      sx={{
        margin: '0 auto',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'calc(100vh - 100px)',
      }}
    >
      <Text align='center' size='xl' weight='bold'>
        Login
      </Text>
      <Box
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '2rem' }}
        onSubmit={handleSubmit}
      >
        <TextInput label='Username' variant='filled' withAsterisk value={username} onChange={(e) => setUsername(e.target.value)} />
        <PasswordInput label='Password' variant='filled' withAsterisk value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button
          type='submit'
          variant='filled'
          color='cyan'
          sx={{ marginTop: '1rem', alignSelf: 'center' }}
        >
          Connect
        </Button>
      </Box>
      { errorMessage && <p className="error-message" style={{color: "red"}}>{errorMessage}</p> }
 
 <p>Don't have an account yet?</p>
 <Link to={"/signup"}> Sign Up</Link>
    </Box>
  )
}

export default LoginPage
