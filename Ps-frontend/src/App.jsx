// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// --- Components (Keep these essential layout components) ---
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";
import NewsletterSubscriptionModal from "./components/NewsletterSubscriptionModal"; // If you use this globally, keep it here or manage state lower down

// --- Pages (Import all your page components) ---
import Homepage from "./pages/Homepage"; // Your main landing page
import AboutUs from "./pages/AboutUs"; // The About Us page
import Programs from "./pages/Programs"; // The Programs page
import Impact from "./pages/Impact";     // The Impact page (recently created)
import Blogs from "./pages/Blogs";       // The Blogs listing page (recently created/renamed)
import Contact from "./pages/Contact";   // The Contact page

// --- Placeholder Imports for Future Pages (Uncomment and create these files when ready) ---
// import EventsListing from "./pages/EventsListing"; // For the /events route
// import Gallery from "./pages/Gallery";             // For the /gallery route
// import BlogDetailPage from "./pages/BlogDetailPage"; // For individual blog posts (e.g., /news/post-1)
// import Resources from "./pages/Resources";         // If you add a top-level Resources page back


const App = () => {
  return (
    <Router>
      {/* Container for consistent background and text color across the app */}
      <div className="min-h-screen bg-teal-50 text-teal-800">
        <PageHeader /> {/* Header is global, so outside Routes */}

        <main> {/* Use <main> for semantic content area */}
          <Routes>
            {/* --- Core Pages --- */}
            <Route path="/" element={<Homepage />} />
            <Route path="/about-us" element={<AboutUs />} /> {/* About Us page */}
            <Route path="/programs" element={<Programs />} /> {/* Programs page */}
            <Route path="/impact" element={<Impact />} />     {/* Impact page */}
            <Route path="/news" element={<Blogs />} />       {/* Blogs listing page */}
            <Route path="/contact" element={<Contact />} />   {/* Contact page */}

            {/* --- Future Pages (Uncomment and create the respective .jsx files as you build them) --- */}
            {/* <Route path="/events" element={<EventsListing />} /> */}
            {/* <Route path="/gallery" element={<Gallery />} /> */}
            {/* <Route path="/news/:slug" element={<BlogDetailPage />} /> {/* Example for individual blog post */}
            {/* <Route path="/resources" element={<Resources />} /> */}

            {/* --- Fallback Route: Redirects any unknown paths back to the homepage --- */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer /> {/* Footer is global, so outside Routes */}

        {/* You might want to manage the NewsletterSubscriptionModal state higher up if it's used globally
            or integrate it directly into components where it's triggered (like the CTA sections) */}
        {/* <NewsletterSubscriptionModal /> */}
      </div>
    </Router>
  );
};

export default App;