import React, { useState } from "react";
import RestaurantSidebar from "../../components/resturentDashboard/RestaurantSidebar";
import RestaurantOverview from "../../components/resturentDashboard/RestaurantOverview";
import RestaurantOrders from "../../components/resturentDashboard/RestaurantOrders";
import RestaurantMenu from "../../components/resturentDashboard/RestaurantMenu";
import RestaurantProfile from "../../components/resturentDashboard/RestaurantProfile";

const ResturentDashboard = () => {
  const [active, setActive] = useState("overview");
  const [expanded, setExpanded] = useState(true);

  const renderContent = () => {
    switch (active) {
      case "overview":
        return <RestaurantOverview />;
      case "orders":
        return <RestaurantOrders />;
      case "menu":
        return <RestaurantMenu />;
      case "profile":
        return <RestaurantProfile />;
      default:
        return <RestaurantOverview />;
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-rose-50 relative font-sans">
      <div
        className={`fixed left-0 top-20 z-20 h-[calc(100vh-5rem)] shadow-xl bg-white transition-all duration-300 ease-in-out ${
          expanded ? "w-72" : "w-20"
        }`}
      >
        <RestaurantSidebar
          active={active}
          setActive={setActive}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </div>

      <main
        className={`flex-1 p-4 md:p-6 pb-10 transition-all duration-300 ease-in-out ${
          expanded ? "ml-72" : "ml-20"
        }`}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default ResturentDashboard;
