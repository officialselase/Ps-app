// src/pages/Resources.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, FileText } from 'lucide-react'; // For icons

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/resources/');
        // Filter out inactive resources if your API doesn't do it by default
        setResources(response.data.filter(res => res.is_active));
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50 pt-20">
        <p className="text-teal-800 text-xl">Loading resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50 pt-20">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800 pt-20">
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light text-center text-teal-800 mb-12">
            Our Valuable Resources
          </h1>

          {resources.length > 0 ? (
            <div className="space-y-6">
              {resources.map((resource) => (
                <a
                  key={resource.id}
                  href={`http://127.0.0.1:8000${resource.file}`} // Link directly to the file
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-teal-100 group-hover:bg-teal-200 transition-colors">
                      <FileText size={24} className="text-teal-700" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-teal-800 group-hover:text-gold-500 transition-colors">
                        {resource.title}
                      </h2>
                      {resource.description && (
                        <p className="text-gray-600 text-sm mt-1">
                          {resource.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <Download size={24} className="text-gold-500 group-hover:text-gold-600 transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-teal-700">No resources available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Resources;