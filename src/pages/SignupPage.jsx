import { Box, Button, PasswordInput, Text, TextInput, BackgroundImage } from '@mantine/core'
import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  // States for registration
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // States for checking the errors
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post("http://localhost:5005/auth/signup", { username: username, email: email, password: password });
      navigate("/login")
    } catch (error) {
      console.log(error, "???????");
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
       }
  }

  return (

    <>   
    <Box>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1542235222-30e843cb43a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
      >

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
        <h2> Welcome to your next adventure</h2>
        Signup
      </Text>
      <Box
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '2rem' }}
        onSubmit={handleSubmit}
      >
        <TextInput label='Username' variant='filled' withAsterisk value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextInput label='Email' variant='filled' withAsterisk value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput label='Password' variant='filled' withAsterisk value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button
          type='submit'
          variant='filled'
          color='cyan'
          sx={{ marginTop: '1rem', alignSelf: 'center' }}
        >
          Register
        </Button>
      </Box>

      { errorMessage && <p className="error-message" style={{color: "red"}}>{errorMessage}</p> }
      <p >Already have account? <Link to={"/login"}> Login</Link></p>
      
    </Box>

    </BackgroundImage>
    </Box>

    </>
   
  )
}

export default SignupPage
