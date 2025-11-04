import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    FiInbox,
    FiUsers,
    FiLogOut,
    FiPlusCircle,
    FiSettings,
} from "react-icons/fi";
import { useAuth } from "../context/useAuth";
import NewConversationModal from "./NewConversationModal";

const Sidebar = () => {
    const { logout, user } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const menuItems = [
        { label: "My Inbox", icon: <FiInbox />, to: "/inboxes/assigned" },
        { label: "Unassigned", icon: <FiUsers />, to: "/inboxes/unassigned" },
        { label: "All", icon: <FiUsers />, to: "/inboxes/all" },
    ];

    const teamInboxes = [
        { name: "Support", emoji: "💖" },
        { name: "Sales", emoji: "💼" },
        { name: "Engineering", emoji: "🧑‍💻" },
        { name: "Escalation", emoji: "⚠️" },
        { name: "Tier-1 Support", emoji: "🪄" },
    ];

    return (
        <div className="h-screen w-64 bg-white border-r flex flex-col">
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-lg font-semibold">Inbox</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="text-gray-600 hover:text-black"
                    title="New Conversation"
                >
                    <FiPlusCircle size={20} />
                </button>
            </div>

            {/* Main Menu */}
            <div className="flex-1 overflow-y-auto">
                <nav className="p-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 ${
                                    isActive ? "bg-gray-200 font-semibold" : ""
                                }`
                            }
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Team Inboxes */}
                <div className="mt-4 px-4">
                    <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                        Team Inboxes
                    </h3>
                    {teamInboxes.map((team) => (
                        <div
                            key={team.name}
                            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded cursor-pointer"
                            title={`View ${team.name} Inbox`}
                        >
                            <span>{team.emoji}</span>
                            <span className="text-sm">{team.name}</span>
                        </div>
                    ))}
                </div>

                {/* Views */}
                <div className="mt-4 px-4">
                    <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                        Views
                    </h3>
                    <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded cursor-pointer">
                        <span>⭐</span>
                        <span className="text-sm">High Priority</span>
                    </div>
                </div>

                {/* Settings */}
                <div className="mt-6 px-4">
                    <NavLink
                        to="/settings"
                        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
                    >
                        <FiSettings />
                        Settings
                    </NavLink>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t p-3 text-sm flex justify-between items-center">
                <div>
                    <div className="font-medium">{user?.email || "User"}</div>
                    <button
                        onClick={logout}
                        className="text-gray-500 text-xs hover:text-black flex items-center gap-1"
                    >
                        <FiLogOut size={12} /> Logout
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && <NewConversationModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Sidebar;
