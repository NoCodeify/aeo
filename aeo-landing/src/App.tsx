import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { FuegenixReport } from "./pages/FuegenixReport";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/report/fuegenix" element={<FuegenixReport />} />
    </Routes>
  );
}

export default App;
