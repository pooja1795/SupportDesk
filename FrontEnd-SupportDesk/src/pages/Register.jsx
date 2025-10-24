import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post("/api/auth/register", { email, password,username });
            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch {
            setMessage("Error: user may already exist.");
        }
    };

    return(
        <div className="bg-gradient-to-r from-[#F28383] from 10% via-[#9D6CD2] via-30% to-[#481EDC] to-90% flex items-center justify-center h-screen">
            <div className ="max-w-[960px] bg-blackDark grid grid-cols-2 items-center p-5 rounded-2xl gap-20">
                <div>
                    <img src="/TeamWork.avif" alt=""/>
                </div>

                <div className="max-w-80 grid gap-10">
                    <h1 className="text-3xl font-bold text-white">Register</h1>
                    {message && <p className="text-blue-500 mb-3">{message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6 text-white">
                        <div>
                            <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="text-dullWhite w-80 bg-whiteLight py-2 px-12 focus:bg-blackDark focus:outline-none focus:ring focus:ring-neonBlue focus:drop-shadow-lg" type="text" placeholder="Enter your username"/>
                        </div>
                        <div>
                            <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-dullWhite w-80 bg-whiteLight py-2 px-12 focus:bg-blackDark focus:outline-none focus:ring focus:ring-neonBlue focus:drop-shadow-lg" type="email" placeholder="Enter your Email Address"/>
                        </div>
                        <div>
                            <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-dullWhite w-80 bg-whiteLight py-2 px-12 focus:bg-blackDark focus:outline-none focus:ring focus:ring-neonBlue focus:drop-shadow-lg" type="Password" placeholder="Password"/>
                        </div>

                        <button type="submit" className="bg-gradient-to-r from-blue-400 to-cyan-200 w-80 font-semibold p-2">Register Now</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Register;
