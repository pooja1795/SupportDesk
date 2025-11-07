import { useState, useEffect } from "react";
import { conversationsAPI } from "../api/conversationsAPI";
import { useAuth } from "../context/useAuth";

const NewConversationModal = ({ onClose }) => {
    const { token, user } = useAuth();
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        subject: "",
        inboxId: "",
        assignedTeam: "",
        assignedAgent: "",
        message: "",
    });

    const [inboxes, setInboxes] = useState([]);
    const [teams, setTeams] = useState([]);
    const [agents, setAgents] = useState([]);

    // 🔹 Fetch dropdown data
    useEffect(() => {
        // you can replace with API calls to inbox-service & user-service later
        setInboxes([
            { id: "support", name: "Support" },
            { id: "sales", name: "Sales" },
            { id: "engineering", name: "Engineering" },
        ]);
        setTeams([
            { id: "tier1", name: "Tier 1" },
            { id: "escalation", name: "Escalation" },
        ]);
        setAgents([
            { id: "agent1", name: "John Doe" },
            { id: "agent2", name: "Jane Smith" },
        ]);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            createdBy: user.email,
            tags: [],
        };
        await conversationsAPI.create(payload, token);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[700px] max-h-[90vh] overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">New Conversation</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-lg"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="Search contact by email or type new email"
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* First & Last Name */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                First name
                            </label>
                            <input
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Last name
                            </label>
                            <input
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    {/* Subject & Inbox */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Subject</label>
                            <input
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Inbox</label>
                            <select
                                name="inboxId"
                                value={form.inboxId}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Inbox</option>
                                {inboxes.map((i) => (
                                    <option key={i.id} value={i.id}>
                                        {i.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Assign team & agent */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Assign team (optional)
                            </label>
                            <select
                                name="assignedTeam"
                                value={form.assignedTeam}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Team</option>
                                {teams.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Assign agent (optional)
                            </label>
                            <select
                                name="assignedAgent"
                                value={form.assignedAgent}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Agent</option>
                                {agents.map((a) => (
                                    <option key={a.id} value={a.id}>
                                        {a.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Message</label>
                        <textarea
                            name="message"
                            rows={4}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Shift + Enter to add a new line"
                            className="w-full border rounded px-3 py-2"
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewConversationModal;
