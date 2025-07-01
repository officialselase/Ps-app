import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import WhatWeDo from "./pages/WhatWeDo";
import Impact from "./pages/Impact";
import News from "./pages/News";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <PageHeader />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />{" "}
            {/* Catch-all redirect */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
