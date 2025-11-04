import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/useAuth";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axiosClient.post("/auth/login", {username, password });
            console.log("Login response:", res.data);
            const token = res.data.accessToken;
            const user = res.data.user || { username };

            if (token) {
                login({ token, user }); // <--- This updates AuthContext + localStorage
                navigate("/inboxes/assigned", { replace: true }); // go to inbox/dashboard
            } else {
                setError("Login failed: token missing from response");
            }

        } catch {
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="bg-gradient-to-r from-[#F28383] from 10% via-[#9D6CD2] via-30% to-[#481EDC] to-90% flex items-center justify-center h-screen">
            <div className ="max-w-[960px] bg-blackDark grid grid-cols-2 items-center p-5 rounded-2xl gap-20">
                <div>
                    <img src="/TeamWork.avif" alt=""/>
                </div>

                <div className="max-w-80 grid gap-10">
                    <h1 className="text-3xl font-bold text-white">Login</h1>
                    {error && <p className="text-red-500 mb-3">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6 text-white">
                        <div className="relative">
                            <div className="absolute top-0.5 left-1 bg-whiteMedium rounded-full p-2 flex items-center justify-center text-blue-300">
                                <i className="fa-solid fa-envelope-open"></i>
                            </div>
                            <input id="email" value={username} onChange={(e) => setUsername(e.target.value)} className="text-dullWhite w-80 bg-whiteLight py-2 px-12 rounded-full focus:bg-blackDark focus:outline-none focus:ring focus:ring-neonBlue focus:drop-shadow-lg" type="text" placeholder="Email Address"/>
                        </div>

                        <div className="relative">
                            <div className="absolute top-0.5 left-1 bg-whiteMedium rounded-full p-2 flex items-center justify-center text-blue-300">
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-dullWhite w-80 bg-whiteLight py-2 px-12 rounded-full focus:bg-blackDark focus:outline-none focus:ring focus:ring-neonBlue focus:drop-shadow-lg" type="Password" placeholder="Password"/>
                        </div>

                        <button type="submit" className="bg-gradient-to-r from-blue-400 to-cyan-200 w-80 font-semibold rounded-full p-2">  {loading ? "Logging in..." : "Sign in"}  </button>
                    </form>
                    <div className="text-dullWhite border-t border-whiteLight pt-2 text-sm">
                        <p>Don't have an account?<a href="/Register" className="text-neonBlue cursor-pointer font-semibold">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
