import { AppShell, Box, Button, Header } from '@mantine/core'
import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Profile from "./pages/Profile";
import PrivateRoute from './components/Privateroute'
import AllTripsPage from './pages/AllTripsPage'
import NewTripPage from './pages/NewTripPage'
import TripPage from './pages/TripPage'
import UpdateTripPage from './pages/UpdateTripPage'



function App() {
  return (
    <AppShell
      padding='md'
      header={
        <Header height={60} p='xs' sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button component={Link} to='/' variant='subtle' color='cyan'>
            Home
          </Button>
          <Box>
            <Button component={Link} to='/signup' variant='subtle' color='cyan'>
              Signup
            </Button>
            <Button component={Link} to='/login' variant='subtle' color='cyan'>
              Login
            </Button>
            <Button component={Link} to='/profile' variant='subtle' color='cyan'>
              Profile
            </Button>
          </Box>
        </Header>
      }
    >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        {/* <Route path='/profile/' element={<PrivateRoute><Profile /></PrivateRoute>} /> */}
        <Route path='/profile/:userId' element={<PrivateRoute><Profile /></PrivateRoute>} />
        
        {/* //Trip routes */}
        <Route path='/trip/new' element={<NewTripPage />} />
        <Route path='/trip/:tripId' element={<TripPage />} />
        <Route path='/trip/alltrips' element={<AllTripsPage/>} />
        <Route path='/trip/update/:tripId' element={<UpdateTripPage />} />

      {/* //Adding a page not found: */}
      <Route path='*' element={<h1>404 Not Found</h1>} />
        {/* Add some new route(s) on what you want to work, don't forget to make a PrivateRoute component */}
      </Routes>
    </AppShell>
  )
}

export default App
