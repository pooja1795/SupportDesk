import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
