import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const SessionContext = createContext(); 

const SessionContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    
    const verifyToken = async (jwt) => {
        console.log("JWT: ", jwt);
        try {
            await axios.post("http://localhost:5005/auth/verify", undefined, {
                headers: {
                    authorization: `Hopper ${jwt}`
                },
            })
            setToken(jwt);
            setIsAuthenticated(true);
            setIsLoading(false);
        } catch (error) {
            console.log("Error authenticating Hopper: ", error);
            window.localStorage.removeItem("hopper");
        }
    }

    useEffect(() => {
        const localToken = window.localStorage.getItem("hopper");
        console.log("LOCAL TOKEN: ", localToken)
        verifyToken(localToken);
    }, [])

    useEffect(() => {
        if (token) {
            window.localStorage.setItem("hopper", token);
            if (!isAuthenticated) {
                setIsAuthenticated(true);
            }
        }
    }, [token])

    const removeToken = () => {                    // <== ADD
        // Upon logout, remove the token from the localStorage
        localStorage.removeItem("hopper");
      }
     
     
      const logOutUser = () => {                   // <== ADD    
        // To log out the user, remove the token
        removeToken();
        // and update the state variables    
        setIsAuthenticated(false);
      }  
    



    return (
        <SessionContext.Provider value={{setToken, isAuthenticated, isLoading, token, logOutUser}} >{children}</SessionContext.Provider>
    )
}

export default SessionContextProvider;