import { useState } from "react";
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
        tags: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            createdBy: user.email,
            tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        };
        await conversationsAPI.create(payload, token);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto p-6">
                <h2 className="text-xl font-semibold mb-4">New Conversation</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <input name="email" placeholder="Email" onChange={handleChange} className="border px-2 py-1 rounded" />
                        <input name="subject" placeholder="Subject" onChange={handleChange} className="border px-2 py-1 rounded" />
                    </div>
                    <textarea
                        name="message"
                        rows={4}
                        placeholder="Message..."
                        onChange={handleChange}
                        className="border px-2 py-1 rounded w-full"
                    />
                    <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewConversationModal;
