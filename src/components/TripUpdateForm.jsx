import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import { Box, Flex, Button, PasswordInput, Text, TextInput, Image, Paper } from '@mantine/core'

const TripUpdateForm = ({ tripName, image, description, budget, location, currentAttendees, allUsers }) => {

  //console.log(tripName)
  const { tripId } = useParams()
  const navigate = useNavigate()
  const { userId } = useContext(SessionContext);
  // const [trip, setTrip] = useState()
  // const [isLoading, setIsLoading] = useState(true)


  const [name, setName] = useState(tripName)
  const [desc, setDesc] = useState(description)
  const [img, setImg] = useState(image)
  const [budg, setBudg] = useState(budget)
  const [loc, setLoc] = useState(location)

  const [attendees, setAttendees] = useState(currentAttendees)
  const [updatedAttendees, setUpdatedAttendees] = useState()
  const [attendeesId, setAttendeesId] = useState(attendees.map(attendee => attendee._id))
  //if don't change attendees, manipulate so doesn't crash
  const currenAttendeesIds = currentAttendees.map(attendee => attendee._id)
  const regex = /['"]/g
  const stringifiedAttendees = JSON.stringify(currenAttendeesIds.join(",")).replace(regex, ``)
  const [attendeesString, setAttendeesString] = useState(stringifiedAttendees)




  const handleAttendeesChange = (e) => {
    //console.log("HELLO")
    let options = e.target.options;
    let attendeesArr = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        attendeesArr.push(options[i].value);
      }
    }

    console.log("attendeesArr: ", attendeesArr)

    //set attendees as array
    setUpdatedAttendees(attendeesArr)
    //console.log("updatedAttendees", updatedAttendees)
    //stringify the attendees array because form takes string
    const regex = /['"]/g
    const stringifiedAttendees = JSON.stringify(attendeesArr.join(",")).replace(regex, ``)
    console.log("stringifiedAttendees", stringifiedAttendees)


    setAttendeesString(stringifiedAttendees)

  }

  //console.log("this is the userid:", userId)

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST}/trip/trips/${tripId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tripName: name,
            image: img,
            description: desc,
            budget: budg,
            location: loc,
            attendees: attendeesString,
            createdBy: userId,
          }),
        }
      );

      if (response.status === 201) {
        const parsed = await response.json()
        navigate(`/trips/${parsed._id}`)
      }
      if (response.status === 200) {
        navigate(`/trips/${tripId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Box mt={30} mb={50}>
        <Flex justify="center" align="center">
            <h1> Udpate your trip</h1>
        </Flex>
      </Box>

      <Flex direction="row" justify="center" align="center">
      
        <Box  mr={20} >
          <Image radius="md" src={image} width={800} height={700}>
          </Image>
        </Box>

        <Box>
      
          <Flex justify="center" align="center" width={800} height={20}>
          
            <Paper radius="md" p={100} width={800} pt={20} shadow="xl">

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>

                <label><Text color="black" mb={-20}><h3>Trip Name:</h3></Text>
                  <input style={{ width: 700 }} type="text" value={name} onChange={event => setName(event.target.value)} />
                </label>

                <label><Text color="black" mb={-20}><h3>Image:</h3></Text>
                  <input style={{ width: 700 }} type="text" value={img} onChange={event => setImg(event.target.value)} />
                </label>

                <label><Text color="black" mb={-20}><h3>Description:</h3></Text>
                  <input style={{ width: 700 }} type="text" value={desc} onChange={event => setDesc(event.target.value)} />
                </label>

                <label><Text color="black" mb={-20}><h3>Budget:</h3></Text>
                  <select value={budg} onChange={(e) => setBudg(e.target.value)}>
                    <option value="budget">Budget</option>
                    <option value="moderate">Moderate</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </label>

                <label><Text color="black" mb={-20}><h3>Location:</h3></Text>
                  <input style={{ width: 700 }} type="text" value={loc} onChange={event => setLoc(event.target.value)} />
                </label>


                <label><Text color="black" mb={-20}><h3>Attendees:</h3></Text>

                  <select  name="attendees" id="attendees-select" multiple value={updatedAttendees} onChange={(e) => handleAttendeesChange(e)}>
                    <option  value="" disabled>--Please choose an option--</option>
                    {attendees.map(user => {

                      return <option value={user._id} key={user._id} selected>{user.username}</option>

                    })}



                    {allUsers ? allUsers
                      .filter((el) => !attendeesId.includes(el._id))
                      .map(user => {

                        return <option value={user._id} key={user._id}>{user.username}</option>

                      }) : "Loading"}


                  </select>

                </label>
                <Box mt={50}>
                <Button variant="outline" color="cyan" type="submit">{"Update your trip"}</Button>
                </Box>
              </form>
            </Paper>
          </Flex>
        </Box>
      </Flex>

    </>
  )
}

export default TripUpdateForm