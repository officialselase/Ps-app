// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PageHeader from "./components/PageHeader"; // Keep: Essential for overall layout
import Footer from "./components/Footer"; // Keep: Essential for overall layout
import Homepage from "./pages/Homepage";
import AboutUs from "./pages/AboutUs";
import Programs from "./pages/Programs";
// Removed: Impact and News as we haven't built these pages yet.
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Router>
      {/* Updated background and text color to match our theme */}
      <div className="min-h-screen bg-teal-50 text-teal-800">
        <PageHeader />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/programs" element={<Programs />} />
            {/* Removed routes for Impact and News */}
            <Route path="/contact" element={<Contact />} />
            {/* Redirects any unknown paths back to the homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
