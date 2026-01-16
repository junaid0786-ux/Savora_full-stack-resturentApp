import React from "react";
import {
  FileSearchCorner,
  UserRound,
  ArchiveRestore,
  ArrowLeftRight,
  Info,
  Menu,
} from "lucide-react";

const UserSidebar = ({ active, setActive }) => {
  return (
    <>
      <div className="p-3 ">
        <div className="text-xl font-medium flex gap-8">
          <Menu /> User Dashboard
        </div>
        <hr />

        <div className="grid  gap-3 mt-10">
          <button
            className={`flex gap-2 p-3  rounded-xl 
            ${
              active === "overview"
                ? "bg-rose-600 text-white"
                : "hover:bg-rose-300"
            }
            `}
            onClick={() => setActive("overview")}
          >
            <FileSearchCorner />
            Overview
          </button>
          <button
            className={`flex gap-2 p-3 rounded-xl 
            ${
              active === "profile"
                ? "bg-rose-600 text-white"
                : "hover:bg-rose-300"
            }
            `}
            onClick={() => setActive("profile")}
          >
            <UserRound /> Profile
          </button>
          <button
            className={`flex gap-2 p-3 rounded-xl 
            ${
              active === "orders"
                ? "bg-rose-600 text-white"
                : "hover:bg-rose-300"
            }
            `}
            onClick={() => setActive("orders")}
          >
            <ArchiveRestore />
            Orders
          </button>
          <button
            className={`flex gap-2 p-3 rounded-xl 
            ${
              active === "transections"
                ? "bg-rose-600 text-white"
                : "hover:bg-rose-300"
            }
            `}
            onClick={() => setActive("transections")}
          >
            <ArrowLeftRight />
            Transactions
          </button>
          <button
            className={`flex gap-2 p-3 rounded-xl 
            ${
              active === "help" ? "bg-rose-600 text-white" : "hover:bg-rose-300"
            }
            `}
            onClick={() => setActive("help")}
          >
            <Info />
            Help Desk
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
