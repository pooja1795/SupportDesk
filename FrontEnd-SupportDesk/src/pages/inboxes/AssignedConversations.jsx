import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import InboxList from "../../components/InboxList";
import ConversationView from "../../components/ConversationView";

const AssignedConversations = () => {
    const [selectedConversationId, setSelectedConversationId] = useState(null);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-1">
                <InboxList onSelectConversation={setSelectedConversationId} />
                <ConversationView conversationId={selectedConversationId} />
            </div>
        </div>
    );
};

export default AssignedConversations;
