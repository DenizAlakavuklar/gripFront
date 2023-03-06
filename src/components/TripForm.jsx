import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import placeholderImage from "../images/placeholder-image.jpg"
import axios from 'axios'

const TripForm= () => {
    const navigate = useNavigate()
    const { tripId } = useParams()

    const { userId } = useContext(SessionContext);

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState(placeholderImage)
    const [budg, setBudg] = useState("")
    const [loc, setLoc] = useState("")
    const [tripAttendees, setTripAttendees] = useState([])
    console.log(userId)

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
                        attendees: tripAttendees,
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
        <div>
            <form onSubmit={handleSubmit}  style={{ display: "flex", flexDirection: "column" }}>
                <label> Trip Name:
                    <input type="text" value={name} onChange={event => setName(event.target.value)} />
                </label>
                <label> Image:
                    <input type="text" value={img} onChange={event => setImg(event.target.value)} />
                </label>
                <label> Description:
                    <input type="text" value={desc} onChange={event => setDesc(event.target.value)} />
                </label>

                <label>
                    Budget:
                    <select value={budg} onChange={(e) => setBudg(e.target.value)}>
                        <option value="budget">Budget</option>
                        <option value="moderate">Moderate</option>
                        <option value="luxury">Luxury</option>
                    </select>
                </label>
                <label> Location:
                    <input type="text" value={loc} onChange={event => setLoc(event.target.value)} />
                </label>
                <label> Attendees:
                    <input type="text" value={tripAttendees} onChange={event => setTripAttendees(event.target.value)} />
                </label>

                <button type="submit">{"Create your trip"}</button>

            </form>


        </div>
    )
}
export default TripForm
