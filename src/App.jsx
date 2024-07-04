// import WeeklySchedule from "./components/WeeklySchedule";
// import routineData from "./Data/routineData.js"; // Import your JSON data
// import AdHocTable from "./components/AdhocTable";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Facility from "./Pages/Facility";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <div className="sm:flex relative sm:static">
        <Sidebar />
        <div className="flex-1 absolute sm:static  sm:mt-0 p-4 ">
          <Routes>
            {/* <Route path="/overview" element={<Overview />} /> */}
            {/* <Route path="/user-management" element={<UserManagement />} /> */}
            {/* <Route path="/supervisor" element={<Supervisor />} /> */}
            <Route path="/facility-schedule" element={<Facility />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/settings" element={<Settings />} /> */}
            {/* Define other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
