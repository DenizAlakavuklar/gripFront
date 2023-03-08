import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import placeholderImage1 from "../images/placeholder-image1.jpg"
import placeholderImage2 from "../images/placeholder-image2.jpg"
import placeholderImage3 from "../images/placeholder-image3.jpg"
import placeholderImage4 from "../images/placeholder-image4.jpg"
import placeholderImage5 from "../images/placeholder-image5.jpg"
import placeholderImage6 from "../images/placeholder-image6.jpg"
import axios from 'axios'
import { Box, Flex, Button, PasswordInput, Text, TextInput, Image, Paper } from '@mantine/core'

const TripForm= ({allUsers}) => {
    const navigate = useNavigate()
    const { tripId } = useParams()
    const [errorMessage, setErrorMessage] = useState(undefined);

    const { userId } = useContext(SessionContext);
    const [attendees, setAttendees] = useState([])
    const [attendeesString, setAttendeesString] = useState('')

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const imgArray = [/* placeholderImage,  */placeholderImage1, placeholderImage2, placeholderImage3, placeholderImage4, placeholderImage5, placeholderImage6]
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

            if(name == "" || img == "" || desc == "" || loc == "" || attendeesString == ""){
            setErrorMessage("You must fill out all fields before you can submit");

            }

            else{

            const response = await fetch(
                `${import.meta.env.VITE_HOST}/trip/trips`,
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


            if (response.status === 201) {
                const parsed = await response.json()
                navigate(`/trips/${parsed._id}`)
            }
            if (response.status === 200) {
                navigate(`/trips/${tripId}`)
            }

            }
 
        } catch (error) {
            console.log(error);      
        }
    }



    return (
        <>

<Flex direction="row" >

    <Box ml={20} mr={20}>
        <Image width={800} height={900} radius="md" src="https://images.unsplash.com/photo-1616767640558-be39eb203507?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxpZ2h0JTIwdHVycXVvaXNlJTIwc2VhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60">
       
        </Image>
    </Box>

    <Box>
        <Flex justify="center" align="center" w={800} height={20}>
             <Paper mr={50} ml={20}  shadow="xl" radius="md" p={100} width={900} pt={80}>     
             <Text mb={60}> <h1>Create a new trip</h1></Text>     
               <form onSubmit={handleSubmit}  style={{ display: "flex", flexDirection: "column" }}>
            <label> <Text color="black" mb={-20}><h3>Trip Name:</h3></Text>
                    <input style={{ width: 500 }} type="text" value={name} onChange={event => setName(event.target.value)} />
                </label>

                <label> <Text color="black" mb={-20}><h3>Image:</h3></Text>
                    <input  style={{ width: 500 }} type="text" value={img} onChange={event => setImg(event.target.value)} />
                </label>
                <label> <Text color="black" mb={-20}><h3>Description:</h3></Text>
                    <input  style={{ width: 500 }} type="text" value={desc} onChange={event => setDesc(event.target.value)} />
                </label>

                <label> <Text color="black" mb={-20}><h3>Budget:</h3></Text>
                    <select value={budg} onChange={(e) => setBudg(e.target.value)}>
                        <option value="budget">Budget</option>
                        <option value="moderate">Moderate</option>
                        <option value="luxury">Luxury</option>
                    </select>
                </label>
                <label> <Text color="black" mb={-20}><h3>Location:</h3></Text>
                    <input  style={{ width: 500 }} type="text" value={loc} onChange={event => setLoc(event.target.value)} />
                </label>
                {/* <label> Attendees:
                    <input type="text" value={tripAttendees} onChange={event => setTripAttendees(event.target.value)} />
                </label> */}
       {/*  {console.log({allUsers})} */}
                <label> <Text color="black" mb={-20}><h3>Attendees:</h3></Text>
                <select name="attendees" id="attendees-select" multiple value={attendees} onChange={(e)=>handleAttendeesChange(e)}>
                    <option value="" disabled>--Please choose an option--</option>
                    {allUsers ? allUsers.map(user=>{
                        if(userId !== user._id){
                            return <option  value={user._id} key={user._id}>{user.username}</option>
                        }
                    }) : "Loading"}
                    
                </select>
                </label>

                <Box mt={50}>
                    <button type="submit" style={{ backgroundColor: '#4ECAC8', fontSize: '20px', color:'white' }}>{"Create your trip"}</button>

                    { errorMessage && <p className="error-message" style={{color: "red"}}>{errorMessage}</p> }
                </Box>

            </form>
            </Paper>
         </Flex>
         </Box>

         

        


      

</Flex>



        
            



</>
    )
}
export default TripForm
