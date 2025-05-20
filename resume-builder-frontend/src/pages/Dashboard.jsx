import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const { user, setUser, setToken } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        setLoading(true);
        await axios
            .get("/user")
            .then(({ data }) => {
                setUser(data.data.user);
                setToken(data.data.token);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>Welcome, {user?.name}</h1>
            <button>Logout</button>
        </div>
    );
};

export default Dashboard;

//
