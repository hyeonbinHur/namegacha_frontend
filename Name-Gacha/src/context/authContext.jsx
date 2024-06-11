/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from 'react';
import * as auth from '../utils/api/local/authData.js';
export const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'SIGN-IN':
            return { ...state, user: action.payload };
        case 'SIGN-OUT':
            return { ...state, user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useEffect(() => {
        const checkAuthStatus = async () => {
            const authCheck = await auth.checkLoginStatus();
            if (typeof authCheck !== 'number') {
                const userResponse = await auth.getUserData(
                    authCheck.data.uuid
                );
                const userObject = {
                    userId: userResponse.userId,
                    projects: userResponse.projects,
                    createdAt: userResponse.createdAt,
                };
                dispatch({ type: 'SIGN-IN', payload: userObject });
            }
        };
        checkAuthStatus();
    }, []);

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
