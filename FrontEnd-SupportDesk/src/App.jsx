import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AssignedConversations from "./pages/inboxes/AssignedConversations";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/inboxes/assigned"
                        element={
                            <ProtectedRoute>
                                <AssignedConversations />
                            </ProtectedRoute>
                        }
                    />

                    {/* Future: Team Inboxes */}
                    <Route
                        path="/inboxes/unassigned"
                        element={
                            <ProtectedRoute>
                                <AssignedConversations filter="unassigned" />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/inboxes/all"
                        element={
                            <ProtectedRoute>
                                <AssignedConversations filter="all" />
                            </ProtectedRoute>
                        }
                    />

                    {/* Default redirect */}
                    <Route path="*" element={<Navigate to="/inboxes/assigned" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
