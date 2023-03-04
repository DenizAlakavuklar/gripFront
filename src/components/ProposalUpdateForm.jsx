import React, { useContext } from 'react'
import {  useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'

function ProposalUpdateForm({currentTitle,
    currentImage,
    currentLocation,
    currentType,
    currentTotalPrice,
    currentNights,
    currentLink,
    currentLink2}) {

    const { tripId, proposalId } = useParams()
    const navigate = useNavigate()
    const { userId } = useContext(SessionContext);

    const [title, setTitle] = useState(currentTitle)
    const [image, setImage] = useState(currentImage)
    const [location, setLocation] = useState(currentLocation)
    const [type, setType] = useState(currentType)
    const [totalPrice, setTotalPrice] = useState(currentTotalPrice)
    const [nights, setNights] = useState(currentNights)
    const [link, setLink] = useState(currentLink)
    const [link2, setLink2] = useState(currentLink2)

    //console.log(title, image)

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            const response = await fetch(
                `http://localhost:5005/proposals/${tripId}/update`,
                {
                    method: 'PUT',
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
    
    <div>

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
    

                <button type="submit">{"Update your proposal"}</button>

            </form>


        </div>



    </div>
  )
}

export default ProposalUpdateForm