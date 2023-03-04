import React, { useContext } from 'react'
import {  useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'

const TripUpdateForm= ({tripName, image, description, budget, location, attendees}) => {

    console.log(tripName)
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
//   const [tripAttendees, setTripAttendees] = useState([attendees])

  console.log("this is the userid:", userId)

   const handleSubmit = async event => {
        event.preventDefault()
        try {
            const response = await fetch(
                `http://localhost:5005/trip/trips/${tripId}`,
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
                        // attendees: tripAttendees,
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
    <div>
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>

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
            <select value={budg} onChange={(e) => setBudg(e.target.value)}>
                <option value="budget">Budget</option>
                <option value="moderate">Moderate</option>
                <option value="luxury">Luxury</option>
            </select>
            </label>

        <label> Location:
            <input type="text" value={loc} onChange={event => setLoc(event.target.value)}/>
        </label>

        <label> Attendees:
            {/* <input type="text" value={tripAttendees} onChange={event => setTripAttendees(event.target.value)}/> */}
        </label>
<button type="submit">{ "Update your trip"}</button>

    </form>


    </div>
  )
}

export default TripUpdateForm