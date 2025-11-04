import { useEffect, useState } from "react";
import { conversationsAPI } from "../api/conversationsAPI";
import { useAuth } from "../context/useAuth";

const ConversationView = ({ conversationId }) => {
    const { token, user } = useAuth();
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (!conversationId) return;

        const fetchConversation = async () => {
            const res = await conversationsAPI.get(conversationId, token);
            setConversation(res.data);
        };

        const fetchMessages = async () => {
            const res = await conversationsAPI.messages.list(conversationId, token);
            setMessages(res.data || []);
        };

        fetchConversation();
        fetchMessages();
    }, [conversationId, token]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        await conversationsAPI.messages.add(conversationId, {
            sender: user?.email,
            body: newMessage,
            type: "public",
            direction: "outbound",
        }, token);
        setNewMessage("");
        const updated = await conversationsAPI.messages.list(conversationId, token);
        setMessages(updated.data || []);
    };

    if (!conversationId)
        return <div className="flex-1 flex items-center justify-center text-gray-400">Select a conversation</div>;

    return (
        <div className="flex-1 bg-white flex flex-col">
            <div className="border-b p-4 flex justify-between items-center">
                <h2 className="font-semibold">{conversation.subject}</h2>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">{conversation.status}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m) => (
                    <div key={m.id} className="bg-gray-50 p-3 rounded shadow-sm max-w-lg">
                        <div className="text-sm font-medium">{m.sender}</div>
                        <div>{m.body}</div>
                        <div className="text-xs text-gray-400 mt-1">
                            {new Date(m.createdAt).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t p-3 flex gap-2">
        <textarea
            rows={2}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 border rounded px-3 py-2 text-sm resize-none"
        />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ConversationView;
