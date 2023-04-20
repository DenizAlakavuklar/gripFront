import { AppShell, Box, Button, Header } from '@mantine/core'
import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Profile from "./pages/Profile";
import PrivateRoute from './components/PrivateRoute'
import AllTripsPage from './pages/AllTripsPage'
import NotFound404 from './pages/NotFound404'
import NewTripPage from './pages/NewTripPage'
import TripPage from './pages/TripPage'
import UpdateTripPage from './pages/UpdateTripPage'
import ProposalDetailsPage from './pages/ProposalDetailsPage'
import NewProposalPage from './pages/NewProposalPage'
import NavBar from './components/NavBar'
import UserTrips from './pages/UserTrips'
import { useContext } from 'react'
import { SessionContext } from './contexts/SessionContext'
import Footer from './components/Footer'



function App() {
  const { userId } = useContext(SessionContext);
 return (

    <AppShell
      padding='md'
      header={
        <Header height={70} p='xs' shadow="xl" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <NavBar />
        </Header>
      }
      
      footer={<Footer>

      </Footer>}
    >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
       {/* <Route path='/profile/' element={<PrivateRoute><Profile /></PrivateRoute>} /> */}
        <Route path='/profile/:userId' element={<PrivateRoute><Profile /></PrivateRoute>} />
       
        
        {/* //Trip routes */}
        <Route path='/trips/new' element={<NewTripPage />} />
        <Route path='/trips/:tripId' element={<TripPage />} />
        <Route path='/trips/alltrips' element={<AllTripsPage/>} />
        <Route path='/trips/usertrips' element={<UserTrips/>} />
        <Route path='/trips/update/:tripId' element={<UpdateTripPage />} />

        {/* //Proposal routes */}
        <Route path='/proposals/:tripId/add' element={<NewProposalPage />} />
        <Route path='/proposals/:tripId/:proposalId' element={<ProposalDetailsPage />} />

      {/* //Adding a page not found: */}
      <Route path='*' element={<NotFound404 />} />
        {/* Add some new route(s) on what you want to work, don't forget to make a PrivateRoute component */}
      </Routes>
    </AppShell>
  )
}

export default App
