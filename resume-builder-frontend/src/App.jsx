import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Resume from "./pages/resume/Resume";
import Nav from "./components/navigation.component";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Nav />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/resume" element={<Resume />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default App;
