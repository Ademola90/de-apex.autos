import React, { createContext, useState, useEffect } from 'react';
import { getUserFromToken } from '../utils/jwt';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userFromToken = getUserFromToken();
        setUser(userFromToken);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => React.useContext(UserContext);
