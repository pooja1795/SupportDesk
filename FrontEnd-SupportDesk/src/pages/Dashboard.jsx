import { useAuth } from "../context/useAuth";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white shadow rounded p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to SupportDesk</h2>
            <p className="text-gray-700">Logged in as: <b>{user?.email}</b></p>
            <p className="mt-4">This page is protected and only visible if JWT is valid.</p>
        </div>
    );
};

export default Dashboard;
