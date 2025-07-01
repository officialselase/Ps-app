import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";

const Homepage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = [
    {
      title: "Global Health Vision",
      subtitle: "Transforming Lives",
      desc: "Innovative oral health solutions for a billion people.",
      bg: "bg-[url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')]",
    },
    {
      title: "Sustainable Impact",
      subtitle: "Worldwide Reach",
      desc: "Sustainable care across 75+ countries.",
      bg: "bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')]",
    },
    {
      title: "Legacy of Excellence",
      subtitle: "Future Generations",
      desc: "Building a healthier world for all.",
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
      <PageHeader />
      <section className="relative h-screen overflow-hidden">
        <div
          className={`absolute inset-0 ${sections[activeSection].bg} bg-cover bg-center transition-opacity duration-1000`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl">
            <div className="mb-6 text-amber-400 font-medium">
              Global Philanthropy Leader
            </div>
            <h1 className="text-5xl md:text-7xl font-light mb-4">
              {sections[activeSection].title}
            </h1>
            <h2 className="text-2xl md:text-3xl font-extralight mb-6">
              {sections[activeSection].subtitle}
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              {sections[activeSection].desc}
            </p>
            <button className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition">
              Join Us
            </button>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Our Global Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {["500K+", "75+", "$50M+", "1K+"].map((num, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg shadow">
                <div className="text-3xl font-bold text-amber-500">{num}</div>
                <div className="text-sm text-gray-600">
                  {["Lives", "Countries", "Invested", "Partners"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
