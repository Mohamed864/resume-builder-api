import React, { useState } from "react";
import axios from "../../api/axios"; // Your axios instance
import { useNavigate } from "react-router-dom";
import "./resume.styles.scss";

const Resume = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        summary: "",
        skills: "",
        education: "",
        experience: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...form,
                skills: form.skills.split(",").map((s) => s.trim()),
                education: JSON.parse(form.education),
                experience: JSON.parse(form.experience),
            };

            await axios.post("/resumes", payload);
            alert("Resume created!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating resume", error);
            alert("Error creating resume");
        }
    };

    return (
        <div className="create-resume">
            <h2>Create Resume</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="summary"
                    placeholder="Summary"
                    value={form.summary}
                    onChange={handleChange}
                />
                <input
                    name="skills"
                    placeholder="Skills (comma-separated)"
                    value={form.skills}
                    onChange={handleChange}
                />
                <textarea
                    name="education"
                    placeholder='Education (as JSON) e.g. [{"school":"ABC","degree":"BSc"}]'
                    value={form.education}
                    onChange={handleChange}
                />
                <textarea
                    name="experience"
                    placeholder='Experience (as JSON) e.g. [{"company":"XYZ","role":"Dev"}]'
                    value={form.experience}
                    onChange={handleChange}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default Resume;
