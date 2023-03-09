import { Box, Button, Image } from '@mantine/core'
import { Link } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import { useContext } from 'react'
import grip_logo from "../images/grip_long.png"



const NavBar = () => {

  const { isAuthenticated, logOutUser } = useContext(SessionContext)
  const { userId } = useContext(SessionContext);
  return (
    <>
      <Box ml={20} mb={10}>
      {/* <Button component={Link} to='/' variant='subtle' color='cyan'> */}
        <a href="/">
          <img src={grip_logo} width="120" height="50"/>
        </a>
      </Box>

      {/* </Button> */}
      <Box mt={10}>

      
      {/* <Button component={Link} to='/about' variant='subtle' color='cyan'>
          AboutGRIP
        </Button> */}
        {!isAuthenticated && (
          <>
        <Button component={Link} to='/signup' variant='subtle' color='cyan' size='md'>
          Signup
        </Button>
        <Button component={Link} to='/login' variant='subtle' color='cyan' size='md'>
          Login
        </Button>
        </>
        )}

        {isAuthenticated && (
          <>

            <Button component={Link} to={`/trips/usertrips`}  variant='subtle' color='cyan'>
              My Trips
            </Button>
            <Button component={Link} to={`/trips/alltrips`}  variant='subtle' color='cyan'>
              All Trips
            </Button>
            <Button component={Link} to={`/trips/new`}  variant='subtle' color='cyan'>
              Create A Trip
            </Button>
              <Button component={Link} to={`/profile/${userId}`}  variant='subtle' color='cyan'>
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