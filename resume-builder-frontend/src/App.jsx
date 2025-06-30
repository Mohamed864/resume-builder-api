import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Resume from "./pages/resume/Resume";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Login />} />
                <Route path="/resume" element={<Resume />} />
            </Routes>
        </div>
    );
};

export default App;
