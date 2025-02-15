import React from 'react';
import { Navigate } from 'react-router-dom';
import useStore from '../../data/store/store';


const PrivateRoute = ({ children }) => {
    const { user } = useStore();  // Get the user state (whether they are logged in or not)

    if (!user) {
        // If no user is logged in, redirect to login
        return <Navigate to="/login" />;
    }

    return children;  // If user is logged in, render the children
};

export default PrivateRoute;
