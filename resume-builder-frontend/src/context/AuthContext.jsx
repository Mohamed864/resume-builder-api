import { createContext, useState, useContext } from "react";

const AuthContext = createContext({
    user: null,
    setUser: () => {},
    token: null,
    setToken: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, _setUser] = useState(() => {
        const savedUser = localStorage.getItem("USER");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, _setToken] = useState(() => {
        return localStorage.getItem("ACCESS_TOKEN");
    });

    const setUser = (user) => {
        _setUser(user);
        if (user) {
            localStorage.setItem("USER", JSON.stringify(user));
        } else {
            localStorage.removeItem("USER");
        }
    };

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
            console.log(localStorage.getItem("ACCESS_TOKEN"));
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
