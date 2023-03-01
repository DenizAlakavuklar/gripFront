import { Box, Button, PasswordInput, Text, TextInput } from '@mantine/core'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post("http://localhost:5005/auth/signup", {username: username, password: password});
      navigate("/login")
    } catch (error) {
      console.log(error);
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
        Signup
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
          Register
        </Button>
      </Box>
    </Box>
  )
}

export default SignupPage
