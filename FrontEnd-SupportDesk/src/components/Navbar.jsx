import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
            <h1 className="font-bold text-xl">SupportDesk</h1>
            <div className="space-x-4">
                {!user ? (
                    <>
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                        <Link to="/tickets" className="hover:underline">Tickets</Link>
                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
