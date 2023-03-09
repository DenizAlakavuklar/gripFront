import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import placeholderImage1 from "../images/placeholder-image1.jpg"
import placeholderImage2 from "../images/placeholder-image2.jpg"
import placeholderImage3 from "../images/placeholder-image3.jpg"
import placeholderImage4 from "../images/placeholder-image4.jpg"
import placeholderImage5 from "../images/placeholder-image5.jpg"
import placeholderImage6 from "../images/placeholder-image6.jpg"
import { Box, Flex, Button, PasswordInput, Text, TextInput, Image, Paper } from '@mantine/core'

function ProposalForm() {
    const navigate = useNavigate()
    const { tripId } = useParams()
    const [errorMessage, setErrorMessage] = useState(undefined);

    const { userId } = useContext(SessionContext);
    const [trip, setTrip] = useState()
    const [title, setTitle] = useState("")
    const imgArray = [/* placeholderImage,  */placeholderImage1, placeholderImage2, placeholderImage3, placeholderImage4, placeholderImage5, placeholderImage6]
    const [image, setImage] = useState(imgArray[Math.floor(Math.random() * imgArray.length)])
    const [location, setLocation] = useState("")
    const [type, setType] = useState("AirBnB")
    const [totalPrice, setTotalPrice] = useState(0)
    const [nights, setNights] = useState(0)
    const [link, setLink] = useState("")
    const [link2, setLink2] = useState("")
    console.log(userId)

    const fetchTrip = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_HOST}/trip/trips/${tripId}`)
            const parsed = await response.json()
            console.log("parsed", parsed)
            setTrip(parsed)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchTrip()
    }, [])


    const handleSubmit = async event => {
        event.preventDefault()
        try {


            if (title == "" || image == "" || location == "" || type == "" || link == "") {
                setErrorMessage("You must fill out all fields before you can submit");

            }

            else {
                const response = await fetch(
                    `${import.meta.env.VITE_HOST}/proposals/${tripId}/add`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: title,
                            image: image,
                            location: location,
                            type: type,
                            totalPrice: totalPrice,
                            nights: nights,
                            link: link,
                            link2: link2,
                            trip: tripId,
                            createdBy: userId
                        }),
                    }
                )
                console.log("response", response)

                if (response.status === 201) {
                    const parsed = await response.json()
                    console.log("parsed", parsed)
                    navigate(`/trips/${tripId}/`)
                }
                if (response.status === 200) {
                    navigate(`/trips/${tripId}`)
                }

            }

        } catch (error) {
            console.log(error)
        }
    }





    return (
        <>
            <Flex direction="row" >

                <Box ml={20} mr={20}>
                    <Image width={800} height={980} radius="md" src="https://images.unsplash.com/photo-1536745287225-21d689278fd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80">

                    </Image>
                </Box>

                <Box>
                    <Flex justify="center" align="center" w={800} height={20}>
                        <Paper mr={50} ml={20} shadow="xl" radius="md" p={100} width={900} pt={30}>
                            <Text mb={60}> <h1>Create a new proposal for the trip:</h1></Text>
                            <Text mb={60}><h2>{trip ? trip.tripName : "Loading"} </h2></Text>

                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                                <label> <Text color="black" mb={-20}><h3>Proposal title:</h3></Text>
                                    <input style={{ width: 500 }} type="text" value={title} onChange={event => setTitle(event.target.value)} />
                                </label>
                                <label> <Text color="black" mb={-20}><h3>Image:</h3></Text>
                                    <input style={{ width: 500 }} type="text" value={image} onChange={event => setImage(event.target.value)} />
                                </label>
                                <label> <Text color="black" mb={-20}><h3>Location:</h3></Text>
                                    <input style={{ width: 500 }} type="text" value={location} onChange={event => setLocation(event.target.value)} />
                                </label>

                                <label> <Text color="black" mb={-20}><h3>Type:</h3></Text>
                                    <select value={type} onChange={(e) => setType(e.target.value)}>
                                        <option value="AirBnB">AirBnB</option>
                                        <option value="Camping">Camping</option>
                                        <option value="Crash at a friends">Crash at a friends</option>
                                        <option value="Hotel">Hotel</option>
                                        <option value="Serviced Apartment">Serviced Apartment</option>
                                    </select>
                                </label>
                                <label> <Text color="black" mb={-20}><h3>Total price:</h3></Text>
                                    <input type="number" value={totalPrice} onChange={event => setTotalPrice(event.target.value)} />
                                </label>
                                <label> <Text color="black" mb={-20}><h3># of nights:</h3></Text>
                                    <input type="number" value={nights} onChange={event => setNights(event.target.value)} />
                                </label>

                                <label><Text color="black" mb={-20}><h3>Link #1:</h3></Text>
                                    <input style={{ width: 500 }} type="text" value={link} onChange={event => setLink(event.target.value)} />
                                </label>

                                <label> <Text color="black" mb={-20}><h3>Link #2:</h3></Text>
                                    <input style={{ width: 500 }} type="text" value={link2} onChange={event => setLink2(event.target.value)} />
                                </label>

                                <Box mt={50} mb={-35}>
                                    <button type="submit" style={{ backgroundColor: '#4ECAC8', fontSize: '20px', color: 'white' }}>{"Create your proposal"}</button>

                                    {errorMessage && <p className="error-message" style={{ color: "red" }}>{errorMessage}</p>}
                                </Box>

                            </form>




                        </Paper>




                    </Flex>
                </Box>

            </Flex>



        </>
    )
}

export default ProposalForm