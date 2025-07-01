import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Homepage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = [
    {
      title: "Ghana Health Vision",
      subtitle: "Transforming Lives",
      desc: "Innovative oral health solutions for Ghanaian communities.",
      mission: "Empowering health through accessible care in Ghana.",
      bg: "bg-[url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')]",
    },
    {
      title: "Sustainable Impact",
      subtitle: "Regional Reach",
      desc: "Sustainable care across Ghana’s regions.",
      mission: "Building resilient communities with local solutions.",
      bg: "bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')]",
    },
    {
      title: "Legacy of Excellence",
      subtitle: "Future Generations",
      desc: "A healthier Ghana for tomorrow.",
      mission: "Creating a lasting legacy of health in West Africa.",
      bg: "bg-[url('https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')]",
    },
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setActiveSection((prev) => (prev + 1) % sections.length),
      7000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Enhanced Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          key={activeSection}
          className={`absolute inset-0 ${sections[activeSection].bg} bg-cover bg-center`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-6">
            <div className="text-amber-400 font-medium">
              Ghana Philanthropy Leader
            </div>
            <h1 className="text-5xl md:text-7xl font-light">
              {sections[activeSection].title}
            </h1>
            <h2 className="text-2xl md:text-3xl font-extralight">
              {sections[activeSection].subtitle}
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              {sections[activeSection].desc}
            </p>
            <p className="text-sm text-gray-200 italic">
              {sections[activeSection].mission}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition"
              >
                Join Us
              </Link>
              <Link
                to="/impact"
                className="border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-gray-900 transition"
              >
                Explore Our Impact
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSection(i)}
              className={`w-2 h-2 rounded-full ${
                i === activeSection ? "bg-amber-400" : "bg-white/50"
              } hover:bg-amber-300 transition`}
            />
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Pleroma Springs Foundation transforms oral health in Ghana by
            delivering innovative education, forging local partnerships, and
            ensuring sustainable access for all communities.
          </p>
        </div>
      </section>

      {/* Regional Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Our Regional Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {[
              "50K+ Lives Transformed",
              "5+ Regions Reached",
              "$5M+ Invested",
              "50+ Partners",
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-6 bg-gray-50 rounded-lg shadow hover:bg-amber-50 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-amber-500">
                  {item.split(" ")[0]}
                </div>
                <div className="text-sm text-gray-600">
                  {item.split(" ").slice(1).join(" ")}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Reach Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Transforming Health Across Ghana
          </h2>
          <div className="mt-8">
            <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
              [Placeholder Ghana Map: Highlighted Regions - Accra, Kumasi,
              Tamale]
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">Our Partners</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Collaborating with Ghana Health Service, Local NGOs, and Global
            Health Leaders. United for Ghana’s Health.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Join us for the Ghana Oral Health Forum, July 2025, Accra.{" "}
            <Link to="/news" className="text-amber-500 hover:underline">
              Learn More
            </Link>
          </p>
        </div>
      </section>

      {/* Urgent Call to Action */}
      <section className="py-20 bg-amber-50 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Join the Movement for Ghana’s Health
          </h2>
          <Link
            to="/contact"
            className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
