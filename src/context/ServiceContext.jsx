import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { server } from '../constants/api';
import { initialServicesData } from '../constants/initialServices';

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
    const [servicesData, setServicesData] = useState(initialServicesData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${server}/course/getCourses`, { withCredentials: true });
                if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
                    setServicesData(response.data);
                } else {
                    setServicesData(initialServicesData);
                }
            } catch (error) {
                console.log("Error fetching courses from server, using default services:", error);
                setServicesData(initialServicesData);
            }
        };

        fetchData();
    }, []);

     const [authToken, setAuthToken] = useState(null);
    const [userRole, setUserRole] = useState(null);

    // 🔁 On App Load: Get Auth from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        if (storedToken && storedRole) {
            setAuthToken(storedToken);
            setUserRole(storedRole);
        }
    }, []);

    // ✅ Login Function
    const login = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setAuthToken(token);
        setUserRole(role);
    };

    // 🚪 Logout Function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setAuthToken(null);
        setUserRole(null);
    };

    return (
        <ServicesContext.Provider
            value={{
                servicesData,
                setServicesData,
                authToken,
                userRole,
                login,
                logout,
            }}
        >
            {children}
        </ServicesContext.Provider>
    );
};

export const useServices = () => useContext(ServicesContext);