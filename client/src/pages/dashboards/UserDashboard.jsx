import React, { useState } from "react";
import UserSidebar from "../../components/userDashboard/UserSidebar";
import UserHeader from "../../components/UserHeader";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrders from "../../components/userDashboard/UserOrders";
import UserTransctions from "../../components/userDashboard/UserTransctions";
import UserHelpDesk from "../../components/userDashboard/UserHelpDesk";

const UserDashboard = () => {
  const [active, setActive] = useState("overview");
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex flex-col w-full h-screen bg-rose-50 overflow-hidden">
      <div className="w-full z-30 shadow-sm">
        <UserHeader setActive={setActive} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-none h-full shadow-xl z-20">
          <UserSidebar
            active={active}
            setActive={setActive}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </div>

        <div className="flex-1 h-full overflow-y-auto p-6 transition-all duration-300">
          <div className="max-w-7xl mx-auto w-full">
            {active === "overview" && <UserOverview />}
            {active === "profile" && <UserProfile />}
            {active === "orders" && <UserOrders />}
            {active === "transections" && <UserTransctions />}
            {active === "help" && <UserHelpDesk />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
