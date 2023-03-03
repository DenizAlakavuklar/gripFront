import { Box, Button, } from '@mantine/core'
import { Link } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import { useContext } from 'react'

const NavBar = () => {

  const { isAuthenticated, logOutUser } = useContext(SessionContext)
  return (
    <>
      <Button component={Link} to='/' variant='subtle' color='cyan'>
        Home
      </Button>
      <Box>
      <Button component={Link} to='/about' variant='subtle' color='cyan'>
          AboutGRIP
        </Button>
        {!isAuthenticated && (
          <>
        <Button component={Link} to='/signup' variant='subtle' color='cyan'>
          Signup
        </Button>
        <Button component={Link} to='/login' variant='subtle' color='cyan'>
          Login
        </Button>
        </>
        )}

        {isAuthenticated && (
          <>
            <Button component={Link} to='/profile' variant='subtle' color='cyan'>
              Profile
            </Button>
            <Button component={Link} to='/' variant='subtle' color='cyan' onClick={logOutUser} >
              Logout
            </Button>

          </>
        )
        }
      </Box>
    </>
  )
}

export default NavBar