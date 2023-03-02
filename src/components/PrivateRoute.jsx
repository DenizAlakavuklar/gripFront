import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'

function PrivateRoute({children}) {
  const { isLoading, isAuthenticated } = useContext(SessionContext);

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <>
      { children }
    </>
  )
}

export default PrivateRoute








// Updated code to be able to use the userId:
// import React, { useContext } from 'react';
// import { Navigate, Route } from 'react-router-dom';
// import { SessionContext } from '../contexts/SessionContext';
// import Profile from '../pages/Profile';

// function PrivateRoute({ path, ...props }) {
//   const { isLoading, isAuthenticated } = useContext(SessionContext);

//   if (isLoading) {
//     return null; // You can render a spinner or loading indicator here
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   const userId = props.params?.userId;

//   return (
//     <Route {...props}>
//       <Profile userId={userId} />
//     </Route>
//   );
// }

// export default PrivateRoute;