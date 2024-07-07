import { useState } from "react";
import WeeklySchedule from "./WeeklySchedule";
import routineData from "../Data/routineData";
import Calendar from "./Calendar";
import periodicData from "../Data/periodicData";
import AdHocTable from "./AdhocTable";
import adHocData from "../Data/adHocData";

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState("routine");

  const renderContent = () => {
    switch (activeTab) {
      case "routine":
        return <WeeklySchedule routineData={routineData} />;
      case "periodic":
        return <Calendar periodicTasks={periodicData} />;

      case "adHoc":
        return <AdHocTable data={adHocData} />;

      default:
        return null;
    }
  };

  return (
    <div className="tab-container">
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab("routine")}
          className={`tab-button py-2 sm:py-4 px-[16px] sm:px-[24px] md:px-[48px] ${
            activeTab === "routine" ? "active" : ""
          }`}>
          Routine
        </button>
        <button
          onClick={() => setActiveTab("periodic")}
          className={`tab-button py-2 sm:py-4 px-[16px] sm:px-[24px] md:px-[48px] ${
            activeTab === "periodic" ? "active" : ""
          }`}>
          Periodic
        </button>
        <button
          onClick={() => setActiveTab("adHoc")}
          className={`tab-button py-2 sm:py-4 px-[16px] sm:px-[24px] md:px-[48px] ${
            activeTab === "adHoc" ? "active" : ""
          }`}>
          Ad Hoc
        </button>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};

export default TabContainer;
