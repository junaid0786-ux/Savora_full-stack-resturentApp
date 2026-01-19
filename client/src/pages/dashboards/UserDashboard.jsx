import React, { useState } from "react";
import UserSidebar from "../../components/userDashboard/UserSidebar";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrders from "../../components/userDashboard/UserOrders";
import UserTransctions from "../../components/userDashboard/UserTransctions";
import UserHelpDesk from "../../components/userDashboard/UserHelpDesk";

const UserDashboard = () => {
  const [active, setActive] = useState("overview");
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-rose-50 relative">
      <div
        className={`fixed left-0 top-20 z-20 h-[calc(100vh-5rem)] shadow-xl bg-white transition-all duration-300 ease-in-out
          ${expanded ? "w-72" : "w-20"}
        `}
      >
        <UserSidebar
          active={active}
          setActive={setActive}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </div>

      <main
        className={`flex-1 p-4 md:p-6 pb-10 transition-all duration-300 ease-in-out
          ${expanded ? "ml-72" : "ml-20"}
        `}
      >
        <div className="max-w-7xl mx-auto w-full">
          {active === "overview" && <UserOverview />}
          {active === "profile" && <UserProfile />}
          {active === "orders" && <UserOrders />}
          {active === "transections" && <UserTransctions />}
          {active === "help" && <UserHelpDesk />}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
