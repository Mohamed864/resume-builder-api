import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Avatar from "../../assets/avatar.png";
import { FaLinkedin, FaGithub, FaGlobe, FaPhone } from "react-icons/fa";

const Dashboard = () => {
    const { user, token, setUser, setToken } = useAuth();
    const [resumes, setResumes] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true); //Loading option
    const [profileForm, setProfileForm] = useState({
        name: "",
        email: "",
        linkedin: "",
        github: "",
        portfolio: "",
        phone: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;

        axios.get("/user").then(({ data }) => {
            setUser(data);
            setProfileForm({
                name: data.name,
                email: data.email,
                linkedin: data.linkedin,
                github: data.github,
                portfolio: data.portfolio,
                phone: data.phone,
            });
        });

        axios.get("/resumes").then(({ data }) => {
            setResumes(data.data);
            setLoading(false); //Loading option
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
        formData.append("linkedin", profileForm.linkedin);
        formData.append("github", profileForm.github);
        formData.append("portfolio", profileForm.portfolio);
        formData.append("phone", profileForm.phone);

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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this resume?"))
            return;

        try {
            await axios.delete(`/resumes/${id}`);
            setResumes((prev) => prev.filter((resume) => resume.id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete the resume. Please try again.");
        }
    };

    const handleDownload = async (id) => {
        try {
            const response = await axios.get(`/resumes/${id}/download`, {
                responseType: "blob", // important for binary data
            });

            // Create blob link to download
            const blob = new Blob([response.data], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "resume.pdf";
            link.click();
        } catch (error) {
            console.error("Download failed:", error);
            alert("Failed to download the resume.");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <main className="p-6 md:p-12 mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
                <aside className="md:w-1/4 w-full bg-white rounded-xl shadow p-6 flex flex-col items-center mb-8 md:mb-0">
                    {editMode ? (
                        <div className="w-full">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileForm.name}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileForm.email}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaLinkedin className="inline mr-2" />
                                    LinkedIn URL
                                </label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={profileForm.linkedin}
                                    onChange={handleInputChange}
                                    placeholder="https://linkedin.com/in/yourname"
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaGithub className="inline mr-2" />
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    name="github"
                                    value={profileForm.github}
                                    onChange={handleInputChange}
                                    placeholder="https://github.com/yourname"
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaGlobe className="inline mr-2" />
                                    Portfolio URL
                                </label>
                                <input
                                    type="url"
                                    name="portfolio"
                                    value={profileForm.portfolio}
                                    onChange={handleInputChange}
                                    placeholder="https://yourportfolio.com"
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaPhone className="inline mr-2" />
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profileForm.phone}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="flex gap-2 mt-4">
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
                            <img
                                src={Avatar}
                                alt="Avatar"
                                className="w-24 h-24 rounded-full mb-4 object-cover"
                            />
                            <p className="font-bold text-lg text-ocean-blue mb-1">
                                {user.name}
                            </p>
                            <p className="text-gray-600 mb-1">{user.email}</p>
                            <div className="w-full mt-4 space-y-2">
                                {user.linkedin && (
                                    <div className="flex items-center">
                                        <FaLinkedin className="text-blue-600 mr-2" />
                                        <a
                                            href={user.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline truncate"
                                        >
                                            {user.linkedin.replace(
                                                /^https?:\/\//,
                                                ""
                                            )}
                                        </a>
                                    </div>
                                )}

                                {user.github && (
                                    <div className="flex items-center">
                                        <FaGithub className="text-gray-800 mr-2" />
                                        <a
                                            href={user.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-800 hover:underline truncate"
                                        >
                                            {user.github.replace(
                                                /^https?:\/\//,
                                                ""
                                            )}
                                        </a>
                                    </div>
                                )}

                                {user.portfolio && (
                                    <div className="flex items-center">
                                        <FaGlobe className="text-green-600 mr-2" />
                                        <a
                                            href={user.portfolio}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 hover:underline truncate"
                                        >
                                            {user.portfolio.replace(
                                                /^https?:\/\//,
                                                ""
                                            )}
                                        </a>
                                    </div>
                                )}

                                {user.phone && (
                                    <div className="flex items-center">
                                        <FaPhone className="text-gray-600 mr-2" />
                                        <span>{user.phone}</span>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => setEditMode(true)}
                                className="px-4 py-2 bg-ocean-turquoise text-black rounded-lg font-semibold hover:bg-ocean-blue transition-colors w-full"
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </aside>

                <section className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-heading font-bold text-ocean-blue mb-1">
                                Welcome, {user.name}!
                            </h1>
                            <p className="text-gray-500">
                                Here are your resumes. Start a new one or manage
                                existing ones.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/resume")}
                            className="px-6 py-3 bg-ocean-turquoise text-black font-bold rounded-lg shadow hover:bg-ocean-blue transition-colors text-lg w-full md:w-auto"
                        >
                            + Create Resume
                        </button>
                    </div>
                    <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
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
                                        <h3 className="text-lg md:text-xl font-semibold text-ocean-blue mb-2">
                                            {resume.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-1">
                                            {resume.summary}
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/resume/${resume.id}/edit`
                                                )
                                            }
                                            className="w-full sm:w-auto flex-1 px-3 py-2 bg-ocean-blue text-black rounded-lg text-sm font-semibold hover:bg-ocean-turquoise transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDownload(
                                                    resume.id,
                                                    resume.title
                                                )
                                            }
                                            className="w-full sm:w-auto flex-1 px-3 py-2 bg-gray-200 text-ocean-blue rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
                                        >
                                            Download
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(resume.id)
                                            }
                                            className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors w-full sm:w-auto"
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
