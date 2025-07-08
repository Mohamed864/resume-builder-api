import React, { useState } from "react";
import axios from "../../api/axios"; // Your axios instance
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./resume.styles.scss";

const Resume = () => {
    const navigate = useNavigate();
    const { id } = useParams();

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

    useEffect(() => {
        if (id) {
            axios
                .get(`/resumes/${id}`)
                .then(({ data }) => {
                    console.log("data", data);
                    setForm({
                        title: data.data.title || "",
                        summary: data.data.summary || "",
                        skills: (data.data.skills || []).join(", "),
                        education: JSON.stringify(data.data.education || []),
                        experience: JSON.stringify(data.data.experience || []),
                    });
                })
                .catch((err) => {
                    console.error("Error loading resume", err);
                    alert("Failed to load resume for editing.");
                    navigate("/dashboard");
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...form,
                skills: form.skills.split(",").map((s) => s.trim()),
                education: JSON.parse(form.education),
                experience: JSON.parse(form.experience),
            };

            if (id) {
                await axios.put(`/resumes/${id}`, payload);
                alert("Resume updated!");
                navigate("/dashboard");
            } else {
                await axios.post("/resumes", payload);
                alert("Resume created!");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error creating resume", error);
            alert("Error creating resume");
        }
    };

    return (
        <div className="create-resume">
            <h2>{id ? "Edit Resume" : "Create Resume"}</h2>
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
