import { useEffect, useState } from "react";
import { conversationsAPI } from "../api/conversationsAPI";
import { useAuth } from "../context/useAuth";

const InboxList = ({ onSelectConversation }) => {
    const { token, user } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await conversationsAPI.list(
                    { assignee: user?.email, status: "OPEN" },
                    token
                );
                const data = res.data;
                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.content)
                        ? data.content
                        : Array.isArray(data?.conversations)
                            ? data.conversations
                            : [];
                setConversations(list);
            } catch (err) {
                console.error("Error fetching conversations:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchConversations();
    }, [token, user]);

    if (loading) return <div className="p-4 text-sm text-gray-500">Loading...</div>;

    return (
        <div className="flex-1 border-r bg-gray-50 overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold">My Inbox</h2>
            </div>

            <div className="p-3 space-y-2">
                {conversations.length === 0 ? (
                    <div className="text-sm text-gray-500">No conversations assigned</div>
                ) : (
                    conversations.map((c) => (
                        <div
                            key={c.id}
                            onClick={() => onSelectConversation(c.id)}
                            className="p-3 bg-white rounded shadow-sm hover:shadow cursor-pointer"
                        >
                            <div className="font-semibold">{c.subject || "Untitled"}</div>
                            <div className="text-xs text-gray-500">{c.status}</div>
                            <div className="text-xs text-gray-400">{c.priority}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default InboxList;
