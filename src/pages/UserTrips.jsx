import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext';
function UserTrips() {
    const [userTrips, setUserTrips] = useState([]);
    const [attendeesTrips, setAttendeesTrips] = useState([]);
    const { userId } = useContext(SessionContext);
    console.log("This is the user", userId)
    const fetchUserTrips = async () => {
      try {
        // with query:
        // const response = await fetch(`http://localhost:5005/trip/trips/usertrips/?user=${userId}`);
        // with params (I'd need to update the backedn routes): 
        //usertrips
        const response = await fetch(`http://localhost:5005/trip/trips/usertrips/${userId}`);
        const parsed = await response.json();
        setUserTrips(parsed);
        console.log('Parsed is :', parsed);


        //trips where user is an attendee
        const response2 = await fetch(`http://localhost:5005/trip/trips/usertrips/${userId}/attendees`);
        const parsed2 = await response2.json();
        setAttendeesTrips(parsed2);
        console.log('Parsed2 is :', parsed2);

      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
        if (userId){
            fetchUserTrips();
        }
    }, [userId]);
  
    console.log('These are the user trips', userTrips);

    if (userTrips.length===0){
        return(<p>You don't have any trips yet!</p>)
    } 
    //return (
        //       <>
        //         <h1>Explore your next trips:</h1>
        //         <ul>
        //             {userTrips.map((userTrip) => {
        //                 return(
        //             <li key={userTrip._id}>
        //                 <div>
        //                     <Link to={`/trips/${userTrip._id}`}>{userTrip.tripName}</Link>
        //                 </div>
        //             </li>
        //             )})}
        
        //         </ul>
        //       </>
        //     );
        //   }
       
        return (
            <>
            <h1>Explore your next trips</h1>

            <h2>Trips you made</h2>
            <div>
                     {userTrips.map((userTrip) => {
                  return(
            <div key={userTrip._id} style={{ justifyContent:"center", alignItems:"center", border: "1px solid black", padding: "20px", margin: "20px" }}>

<Link to={`/trips/${userTrip._id}/`}>
    <h2>{userTrip.tripName}</h2>
    </Link>
                <img src={userTrip.image} alt="Trip" width="300" />
                <p>Description: {userTrip.description}</p>
                <Link to={`/trips/${userTrip._id}`}>
                    <button type='button'>Details</button>
                </Link>
        
              </div>
                    )})}
            </div>






            <h2>Trips you are attending</h2>
            <div>
                     {attendeesTrips.map((userTrip) => {
                  return(
            <div key={userTrip._id} style={{ justifyContent:"center", alignItems:"center", border: "1px solid black", padding: "20px", margin: "20px" }}>

<Link to={`/trips/${userTrip._id}/`}>
    <h2>{userTrip.tripName}</h2>
    </Link>
                <img src={userTrip.image} alt="Trip" width="300" />
                <p>Description: {userTrip.description}</p>
                <Link to={`/trips/${userTrip._id}`}>
                    <button type='button'>Details</button>
                </Link>
        
              </div>
                    )
                    
                    
                    })}
            </div>
            </>
          )
        }
        export default UserTrips