
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WotSABot from "./modules/wotsabot";
import HomePage from "./pages/HomePage";
import ProjectManagementTool from "./modules/project-management-tool";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wotsabot/*" element={<WotSABot />} />
        <Route path="/project-management-tool/*" element={<ProjectManagementTool />} />
      </Routes>
    </Router>
  );
}

export default App;
