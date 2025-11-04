import { Search } from "lucide-react";
import { useAuth } from "../context/useAuth";

const Header = ({ onSearch }) => {
    const { user } = useAuth();

    return (
        <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
            <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded">
                    <Search size={16} />
                    <input
                        onChange={(e) => onSearch && onSearch(e.target.value)}
                        placeholder="Search tickets, messages, IDs..."
                        className="bg-transparent ml-2 outline-none w-72 text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">Signed in as</div>
                <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    {user?.email}
                </div>
            </div>
        </header>
    );
};

export default Header;
