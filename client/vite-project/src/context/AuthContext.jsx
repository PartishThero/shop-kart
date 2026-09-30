import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axiosCalls/axios";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/customers/me')
                setUser(response.data.authenticatedCustomer)
                console.log(user)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    } , [])


    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
          {children}  
        </AuthContext.Provider>
    )

}

export const useAuth = ()=> useContext(AuthContext)