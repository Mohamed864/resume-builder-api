import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
    const { user } = useAuth();
    return (
        <div className="min-h-screen bg-gradient-to-br from-ocean-blue via-ocean-turquoise to-ocean-sand flex flex-col">
            {/* Navbar */}
            <nav className="w-full px-8 py-6 flex items-center justify-between">
                <div className="text-3xl font-bold text-ocean-blue">
                    ResumeBuilder
                </div>
                <div>
                    {user ? (
                        <div></div>
                    ) : (
                        <Link
                            to="/login"
                            className="text-ocean-blue font-semibold hover:text-ocean-turquoise transition-colors px-4"
                        >
                            Login
                        </Link>
                    )}
                    <Link
                        to="/resume"
                        className="bg-ocean-blue text-black font-bold px-6 py-2 rounded-lg shadow hover:bg-ocean-turquoise transition-colors ml-2"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>
            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-ocean-blue mb-4 drop-shadow">
                    Build Your Professional Resume Effortlessly
                </h1>
                <p className="text-xl md:text-2xl text-ocean-blue/80 mb-8 max-w-2xl mx-auto">
                    Create, customize, and download beautiful resumes in
                    minutes. Stand out to employers with our easy-to-use builder
                    and modern templates.
                </p>
                <a
                    href="#"
                    className="inline-block bg-ocean-turquoise text-white font-bold px-8 py-4 rounded-lg shadow-lg text-lg hover:bg-ocean-blue transition-colors"
                >
                    Start Building Now
                </a>
            </main>
            {/* Features Section */}
            <section className="py-16 bg-white/80">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
                        <span className="text-4xl mb-4">📝</span>
                        <h3 className="text-xl font-bold text-ocean-blue mb-2">
                            Easy Resume Creation
                        </h3>
                        <p className="text-gray-600">
                            Intuitive editor lets you build and edit resumes
                            with no hassle.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
                        <span className="text-4xl mb-4">🎨</span>
                        <h3 className="text-xl font-bold text-ocean-blue mb-2">
                            Professional Templates
                        </h3>
                        <p className="text-gray-600">
                            Choose from modern, recruiter-approved templates to
                            impress employers.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
                        <span className="text-4xl mb-4">⬇️</span>
                        <h3 className="text-xl font-bold text-ocean-blue mb-2">
                            One-Click Download
                        </h3>
                        <p className="text-gray-600">
                            Export your resume as PDF instantly and apply for
                            jobs with confidence.
                        </p>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="text-center py-6 text-ocean-blue/70 text-sm">
                © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;
