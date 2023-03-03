// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { SessionContext } from '../contexts/SessionContext';

// function MyTrips() {
//   const { token, userId } = useContext(SessionContext);
//   const [trips, setTrips] = useState([]);

//   useEffect(() => {
//     const fetchTrips = async () => {
//       const response = await fetch(`http://localhost:5005/trips/my-trips`, {
//         method: 'GET',
//         headers: {
//           authorization: `Hopper ${token}`
//         },
//       });
//       const parsed = await response.json();
//       setTrips(parsed);
//     };
//     fetchTrips();
//   }, [token]);

//   return (
//     <div>
//       <h1>My Trips</h1>
//       {trips.length > 0 ? (
//         <>
//           <h2>You have {trips.length} trips created</h2>
//           <ul>
//             {trips.map((trip) => (
//               <li key={trip._id}>
//                 <Link to={`/trips/${trip._id}`}>{trip.tripName}</Link>
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <div>
//           <p>You don't have any trips created.</p>
//           <Link to="/trips/new">
//             <button>Create one</button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyTrips;

