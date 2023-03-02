import React from 'react'
import {  useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TripForm= ({
    tripName="",
    image="",
    description="",
    budget,
    location="",
    attendees,
    isUpdating = false,
}) => {

    const navigate = useNavigate()
    const { tripId } = useParams()

  const [name, setName] = useState(tripName)
  const [desc, setDesc] = useState(description)
  const [img, setImg] = useState(image)
  const [budg, setBudg] = useState(budget)
  const [loc, setLoc] = useState(location)
  const [tripAttendees, setTripAttendees] = useState(attendees)


    const handleSubmit = async event => {
        event.preventDefault()
        try {
            const response = await fetch(
                `http://localhost:5005/trip/trips${isUpdating ? `/${tripId}` : ''}`,
                {
                    method: isUpdating ? 'PUT' : 'POST',
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
    <form onSubmit={handleSubmit}>

        <label> Trip Name:
            <input type="text" value={name} onChange={event => setName(event.target.value)}/>
        </label>

        <label> Image:
            <input type="text" value={img} onChange={event => setImg(event.target.value)} />
        </label>

        <label> Description:
            <input type="text" value={desc} onChange={event => setDesc(event.target.value)}/>
        </label>

        <label>
            Budget:
            <select value={budg} onChange={(e) => setBu(e.target.value)}>
                <option value="budget">Budget</option>
                <option value="moderate">Moderate</option>
                <option value="luxury">Luxury</option>
            </select>
            </label>

        <label> Location:
            <input type="text" value={loc} onChange={event => setLoc(event.target.value)}/>
        </label>

        <label> Attendees:
            <input type="text" value={tripAttendees} onChange={event => setTripAttendees(event.target.value)}/>
        </label>
<button type="submit">{isUpdating? "Update your trip" : "Create your trip"}</button>

    </form>
    
    
    </div>
  )
}

export default TripForm