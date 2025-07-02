import "./Dashboard.styles.scss";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Avatar from "../../assets/avatar.png";

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
            console.log(data);
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

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", profileForm.name);
        formData.append("email", profileForm.email);

        try {
            const { data } = await axios.put("/user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(data.data.user);
            setUser(data.data.user);
            setEditMode(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="p-6 md:p-12 mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
                <aside className="md:w-1/4 w-full bg-white rounded-xl shadow p-6 flex flex-col items-center mb-8 md:mb-0">
                    {editMode ? (
                        <div className="w-full">
                            <input
                                type="text"
                                name="name"
                                value={profileForm.name}
                                onChange={handleInputChange}
                                className="mb-2 w-full border rounded px-3 py-2"
                            />
                            <input
                                type="email"
                                name="email"
                                value={profileForm.email}
                                onChange={handleInputChange}
                                className="mb-2 w-full border rounded px-3 py-2"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 px-3 py-2 bg-ocean-turquoise text-white rounded-lg text-sm font-semibold hover:bg-ocean-blue transition-colors"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="flex-1 px-3 py-2 bg-gray-200 text-ocean-blue rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center w-full">
                            <img src={Avatar} alt="Avatar" />
                            <p className="font-bold text-lg text-ocean-blue mb-1">
                                {user.name}
                            </p>
                            <p className="text-gray-600 mb-1">{user.email}</p>
                            <p className="text-gray-600 mb-4">{user.phone}</p>
                            <button
                                onClick={() => setEditMode(true)}
                                className="px-4 py-2 bg-ocean-turquoise text-white rounded-lg font-semibold hover:bg-ocean-blue transition-colors w-full"
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </aside>

                <section className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-heading font-bold text-ocean-blue mb-1">
                                Welcome, {user.name}!
                            </h1>
                            <p className="text-gray-500">
                                Here are your resumes. Start a new one or manage
                                existing ones.
                            </p>
                        </div>
                        <button
                            navigate={"/resume"}
                            className="px-6 py-3 bg-ocean-turquoise text-black font-bold rounded-lg shadow hover:bg-ocean-blue transition-colors text-lg w-full md:w-auto"
                        >
                            + Create Resume
                        </button>
                    </div>
                    <div className="grid gap-6 grid-cols-2">
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
                                    <div className="flex gap-2 mt-auto">
                                        <button className="flex-1 px-3 py-2 bg-ocean-blue text-black rounded-lg text-sm font-semibold hover:bg-ocean-turquoise transition-colors">
                                            Edit
                                        </button>
                                        <button className="flex-1 px-3 py-2 bg-gray-200 text-ocean-blue rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors">
                                            Download
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDuplicate(resume.id)
                                            }
                                            className="flex-1 px-3 py-2 bg-gray-100 text-ocean-blue rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                                        >
                                            Duplicate
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(resume.id)
                                            }
                                            className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Dashboard;
