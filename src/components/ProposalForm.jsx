import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import placeholderImage from "../images/placeholder-image.jpg"
import { Box, Flex, Button, PasswordInput, Text, TextInput, BackgroundImage } from '@mantine/core'

function ProposalForm() {
    const navigate = useNavigate()
    const { tripId } = useParams()

    const { userId } = useContext(SessionContext);

    const [title, setTitle] = useState("")
    const [image, setImage] = useState(placeholderImage)
    const [location, setLocation] = useState("")
    const [type, setType] = useState("AirBnB")
    const [totalPrice, setTotalPrice] = useState(0)
    const [nights, setNights] = useState(0)
    const [link, setLink] = useState("")
    const [link2, setLink2] = useState("")
    console.log(userId)

    const handleSubmit = async event => {
      event.preventDefault()
      try {
          const response = await fetch(
              `http://localhost:5005/proposals/${tripId}/add`,
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
      } catch (error) {
          console.log(error)
      }
  }





  return (
    <div>
      <h1>Create New Proposal</h1>
      <h2>for: {tripId}</h2>

      <div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <label> Proposal Title:
                    <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
                </label>
                <label> Image:
                    <input type="text" value={image} onChange={event => setImage(event.target.value)} />
                </label>
                <label> Location:
                    <input type="text" value={location} onChange={event => setLocation(event.target.value)} />
                </label>

                <label>
                    Type:
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="AirBnB">AirBnB</option>
                        <option value="Camping">Camping</option>
                        <option value="Crash at a friends">Crash at a friends</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Serviced Apartment">Serviced Apartment</option>
                    </select>
                </label>
                <label> Total Price:
                    <input type="number" value={totalPrice} onChange={event => setTotalPrice(event.target.value)} />
                </label>
                <label> Number of Nights:
                    <input type="number" value={nights} onChange={event => setNights(event.target.value)} />
                </label>

                <label> Link:
                    <input type="text" value={link} onChange={event => setLink(event.target.value)} />
                </label>

                <label> Another Link:
                    <input type="text" value={link2} onChange={event => setLink2(event.target.value)} />
                </label>
    

                <button type="submit">{"Create your proposal"}</button>

            </form>


        </div>



    </div>
  )
}

export default ProposalForm