import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import placeholderImage from "../images/placeholder-image.jpg"
import placeholderImage1 from "../images/placeholder-image1.jpg"
import placeholderImage2 from "../images/placeholder-image2.jpg"
import placeholderImage3 from "../images/placeholder-image3.jpg"
import placeholderImage4 from "../images/placeholder-image4.jpg"
import placeholderImage5 from "../images/placeholder-image5.jpg"
import placeholderImage6 from "../images/placeholder-image6.jpg"
import axios from 'axios'
import { Box, Flex, Button, PasswordInput, Text, TextInput, BackgroundImage } from '@mantine/core'

const TripForm= ({allUsers}) => {
    const navigate = useNavigate()
    const { tripId } = useParams()

    const { userId } = useContext(SessionContext);
    const [attendees, setAttendees] = useState([])
    const [attendeesString, setAttendeesString] = useState('')

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const imgArray = [placeholderImage, placeholderImage1, placeholderImage2, placeholderImage3, placeholderImage4, placeholderImage5, placeholderImage6]
    const [img, setImg] = useState(imgArray[Math.floor(Math.random()*imgArray.length)])
    const [budg, setBudg] = useState("")
    const [loc, setLoc] = useState("")
    const [tripAttendees, setTripAttendees] = useState([])

    const handleAttendeesChange = (e) => {
    //console.log("HELLO")
        var options = e.target.options;
        var attendeesArr = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            attendeesArr.push(options[i].value);
            }
        }
        //add yourself to attendees
        attendeesArr.push(userId)
        //set attendees as array
        setAttendees(attendeesArr)
        //stringify the attendees array because form takes string
        const regex = /['"]/g
        const stringifiedAttendees = JSON.stringify(attendeesArr.join(",")).replace(regex, ``)

        
        setAttendeesString(stringifiedAttendees)

      } 
    const handleSubmit = async event => {
        event.preventDefault()
        try {

            /* const tripAttendeesArr = tripAttendees.split(',')
            console.log("tripAttendeesArr:", tripAttendeesArr) */
            const response = await fetch(
                `http://localhost:5005/trip/trips`,
                {
                    method: 'POST',
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

            /* const response = await axios.post("http://localhost:5005/trip/trips", { 
            tripName: name,
            image: img,
            description: desc,
            budget: budg,
            location: loc,
            attendees: tripAttendees,
            createdBy: userId,}) */

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
<Box>
        <BackgroundImage src="https://images.unsplash.com/photo-1617287287784-7e6b90c6cfd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80">
        <Flex justify="center" align="center">
            <Box mt={300} >
            <form onSubmit={handleSubmit}  style={{ display: "flex", flexDirection: "column" }}>
            <label> <Text color="white" mb={-20}><h3>Trip Name:</h3></Text>
                    <input type="text" value={name} onChange={event => setName(event.target.value)} />
                </label>

                <label> <Text color="white" mb={-20}><h3>Image:</h3></Text>
                    <input type="text" value={img} onChange={event => setImg(event.target.value)} />
                </label>
                <label> <Text color="white" mb={-20}><h3>Description:</h3></Text>
                    <input type="text" value={desc} onChange={event => setDesc(event.target.value)} />
                </label>

                <label> <Text color="white" mb={-20}><h3>Budget:</h3></Text>
                    <select value={budg} onChange={(e) => setBudg(e.target.value)}>
                        <option value="budget">Budget</option>
                        <option value="moderate">Moderate</option>
                        <option value="luxury">Luxury</option>
                    </select>
                </label>
                <label> <Text color="white" mb={-20}><h3>Location:</h3></Text>
                    <input type="text" value={loc} onChange={event => setLoc(event.target.value)} />
                </label>
                {/* <label> Attendees:
                    <input type="text" value={tripAttendees} onChange={event => setTripAttendees(event.target.value)} />
                </label> */}
       {/*  {console.log({allUsers})} */}
                <label> <Text color="white" mb={-20}><h3>Attendees:</h3></Text>
                <select name="attendees" id="attendees-select" multiple value={attendees} onChange={(e)=>handleAttendeesChange(e)}>
                    <option value="">--Please choose an option--</option>
                    {allUsers ? allUsers.map(user=>{
                        if(userId !== user._id){
                            return <option value={user._id} key={user._id}>{user.username}</option>
                        }
                    }) : "Loading"}
                    
                </select>
                </label>

                <Box mt={50}>
                    <button type="submit" style={{ backgroundColor: 'white', fontSize: '20px', color:'black' }}>{"Create your trip"}</button>
                </Box>

            </form>

            <Box
            sx={{
              margin: '0 auto',
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 'calc(35vh - 10px)',
            }}
            />
            </Box>
        </Flex>
        
        
        
        </BackgroundImage>

        


      

</Box>



        
            



</>
    )
}
export default TripForm
