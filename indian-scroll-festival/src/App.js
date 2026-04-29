import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FileProvider } from "./context/FileContext";
import LandingPage from "./components/LandingPage";
import SubmissionForm from "./components/SubmissionForm";
import PaymentPage from "./components/PaymentPage";
import ConfirmationPage from "./components/ConfirmationPage";

function App() {
  return (
    <FileProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/submission" element={<SubmissionForm />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
    </FileProvider>
  );
}

export default App;
