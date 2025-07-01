import "./Dashboard.styles.scss";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const Dashboard = () => {
    const { user, token, setUser, setToken } = useAuth();
    const [resumes, setResumes] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [profileForm, setProfileForm] = useState({
        name: "",
        email: "",
        image: null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;

        axios.get("/user").then(({ data }) => {
            setUser(data);
            setProfileForm({ name: data.name, email: data.email, image: null });
        });

        axios.get("/resumes").then(({ data }) => {
            console.log(data);
            setResumes(data.data);
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setProfileForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleLogout = () => {
        axios.post("/logout").then(() => {
            setUser(null);
            setToken(null);
        });
    };

    return (
        <div>
            <div className="flex-1 p-6 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-ocean-blue mb-1">
                            Welcome, {user?.name}!
                        </h2>
                        <p className="text-gray-500">
                            Here are your resumes. Start a new one or manage
                            existing ones.
                        </p>
                    </div>
                </div>
                {editMode ? (
                    <div className="edit-profile">
                        <input
                            type="text"
                            name="name"
                            value={profileForm.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            value={profileForm.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={handleInputChange}
                        />
                        <button>Save</button>
                        <button onClick={() => setEditMode(false)}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="profile-display">
                        <img
                            src={
                                user?.image || "https://via.placeholder.com/100"
                            }
                            alt="User"
                            className="profile-img"
                        />
                        <p>Name: {user?.name}</p>
                        <p>Email: {user?.email}</p>
                        <button onClick={() => setEditMode(true)}>
                            Edit Profile
                        </button>
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
                    {resumes.length === 0 ? (
                        <div className="col-span-full text-center text-gray-400 text-lg">
                            No resumes yet. Click 'Create Resume' to get
                            started!
                        </div>
                    ) : (
                        resumes.map((resume) => (
                            <div
                                className="bg-white rounded-xl shadow-md p-6 flex flex-col"
                                key={resume.id}
                            >
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-ocean-blue mb-2">
                                        {resume.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-1">
                                        {resume.summary}
                                    </p>
                                </div>
                                <button className="flex-1 px-3 py-2 bg-gray-200 text-ocean-blue rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors">
                                    Download
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
