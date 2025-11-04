import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const InboxLayout = ({ children, onSearch }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header onSearch={onSearch} />
                <main className="p-6 overflow-auto bg-gray-50">{children}</main>
            </div>
        </div>
    );
};

export default InboxLayout;
