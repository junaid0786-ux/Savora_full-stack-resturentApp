import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; //
import {
  LayoutDashboard,
  UserRound,
  ArchiveRestore,
  ArrowLeftRight,
  Info,
  Menu,
  LogOut,
} from "lucide-react";

const UserSidebar = ({ active, setActive, expanded, setExpanded }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      toast.success("Logged out successfully!");

      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Something went wrong during logout.");
    }
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "profile", label: "Profile", icon: UserRound },
    { id: "orders", label: "Orders", icon: ArchiveRestore },
    { id: "transections", label: "Transactions", icon: ArrowLeftRight },
    { id: "help", label: "Help Desk", icon: Info },
  ];

  return (
    <aside
      className={`h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out flex flex-col
        ${expanded ? "w-72" : "w-20"}
      `}
    >
      <div className="flex items-center h-20 px-2 border-b border-gray-100 shrink-0">
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-lg hover:bg-rose-50 text-gray-600 hover:text-rose-600 transition-colors bg-white z-10 w-16 flex justify-center items-center cursor-pointer"
        >
          <Menu size={24} />
        </button>

        <div
          className={`font-bold text-xl text-gray-600 overflow-hidden transition-all duration-300 whitespace-nowrap
            ${expanded ? "w-40 ml-2 opacity-100" : "w-0 ml-0 opacity-0"}
          `}
        >
          Dashboard
        </div>
      </div>

      <nav className="flex-1 px-2 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`relative flex items-center w-full py-3 rounded-xl transition-all duration-200 cursor-pointer
              ${
                active === item.id
                  ? "bg-rose-600 text-white shadow-md shadow-rose-200"
                  : "text-gray-600 hover:bg-rose-50 hover:text-rose-600"
              }
            `}
          >
            <div className="min-w-16 flex justify-center items-center">
              <item.icon size={22} />
            </div>

            <span
              className={`overflow-hidden transition-all duration-300 whitespace-nowrap 
                ${expanded ? "w-40 opacity-100" : "w-0 opacity-0"}
              `}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="p-2 border-t border-gray-100 shrink-0 flex flex-col gap-1">
        <button
          onClick={handleLogout}
          className="relative flex items-center w-full py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group cursor-pointer"
        >
          <div className="min-w-16 flex justify-center items-center ">
            <LogOut
              size={22}
              className="group-hover:rotate-180 transition-transform duration-300 text-rose-600"
            />
          </div>
          <span
            className={`overflow-hidden transition-all duration-300 whitespace-nowrap font-medium text-rose-600
              ${expanded ? "w-40 opacity-100" : "w-0 opacity-0"}
            `}
          >
            Log Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;
