import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Resume from "./pages/resume/Resume";
import Nav from "./components/navigation.component";
import Home from "./pages/home";
import PrivateRoute from "./components/privateRoute.component";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Nav />}>
                    <Route index element={<Home />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/resume"
                        element={
                            <PrivateRoute>
                                <Resume />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/resume/:id/edit"
                        element={
                            <PrivateRoute>
                                <Resume />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default App;
