/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from 'react';
import * as auth from '../utils/api/authData.js';
export const UserContext = createContext();

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
                dispatch({ type: 'SIGN-IN', payload: authCheck });
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
