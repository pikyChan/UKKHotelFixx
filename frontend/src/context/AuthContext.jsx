import { createContext, useEffect, useReducer } from "react";

// Menangani error parsing JSON dari localStorage
const getUserFromLocalStorage = () => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        return null;
    }
};

const INITIAL_STATE = {
    user: getUserFromLocalStorage(),
    loading: false,
    error: null
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            };
        case "LOGIN_FAILURE": // Perbaikan typo
            return {
                user: null,
                loading: false,
                error: action.payload
            };
        case "LOGOUT":
            return { ...INITIAL_STATE, user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        if (state.user !== undefined) {
            try {
                localStorage.setItem("user", JSON.stringify(state.user));
            } catch (error) {
                console.error("Error saving user data to localStorage:", error);
            }
        }
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
