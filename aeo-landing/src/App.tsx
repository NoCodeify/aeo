import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { FuegenixReport } from "./pages/FuegenixReport";
import { LinkedInBanner } from "./pages/LinkedInBanner";
import { ChecklistPage } from "./pages/ChecklistPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/checklist" element={<ChecklistPage />} />
      <Route path="/report/fuegenix" element={<FuegenixReport />} />
      <Route path="/banner" element={<LinkedInBanner />} />
    </Routes>
  );
}

export default App;
