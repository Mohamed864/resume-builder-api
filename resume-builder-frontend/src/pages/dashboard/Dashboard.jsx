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
        <div className="dashboard">
            <div className="profile-section">
                <h2>My Profile</h2>
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
            </div>

            <div className="resume-section">
                <h2>Your Resumes</h2>
                <div className="resume-list">
                    {resumes.map((resume) => (
                        <div className="resume-card" key={resume.id}>
                            <h3>{resume.title}</h3>
                            <p>{resume.summary}</p>
                            <button>Download PDF</button>
                        </div>
                    ))}
                </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
