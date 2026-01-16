import React from "react";
import UserSidebar from "../../components/userDashboard/userSidebar";
import UserOverview from "../../components/userDashboard/userOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrders from "../../components/userDashboard/UserOrders";
import UserTransctions from "../../components/userDashboard/UserTransctions";
import UserHelpDesk from "../../components/userDashboard/UserHelpDesk";
import { useState } from "react";

const UserDashboard = () => {
  const [active, setActive] = useState("overview");
  return (
    <>
      <div className="flex w-full h-[88.8vh]">
        <div className=" w-2/10 bg-rose-50 shadow-xl">
          <UserSidebar active={active} setActive={setActive} />
        </div>
        <div className=" w-6/7">
          {active === "overview" && <UserOverview />}
          {active === "profile" && <UserProfile />}
          {active === "orders" && <UserOrders />}
          {active === "transections" && <UserTransctions />}
          {active === "help" && <UserHelpDesk />}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
