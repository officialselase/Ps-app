// src/pages/Gallery.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Lightbox } from 'yet-another-react-lightbox'; // For image modal/lightbox
import 'yet-another-react-lightbox/styles.css'; // Don't forget to import the styles

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/gallery/');
        // Assuming your backend sorts by created_at or a specific order
        setGalleryItems(response.data);
      } catch (err) {
        console.error("Error fetching gallery items:", err);
        setError("Failed to load gallery images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryItems();
  }, []);

  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setOpenLightbox(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50 pt-20">
        <p className="text-teal-800 text-xl">Loading gallery...</p>
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

  // Transform gallery items for the lightbox component
  const slides = galleryItems.map(item => ({
    src: `http://127.0.0.1:8000${item.image}`,
    alt: item.caption,
    title: item.caption,
  }));

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800 pt-20">
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light text-center text-teal-800 mb-12">
            Our Photo Gallery
          </h1>

          {galleryItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  onClick={() => openImageViewer(index)}
                >
                  <div className="w-full h-64 overflow-hidden">
                    <img
                      src={`http://127.0.0.1:8000${item.image}`}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {item.caption && (
                    <div className="p-4">
                      <p className="text-sm text-gray-700 font-medium">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-teal-700">No gallery items to display yet.</p>
          )}
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={slides}
        index={currentImageIndex}
        // You can add more props for customization, e.g., plugins, animation
        // plugins={[Fullscsreen, Slideshow, Thumbnails, Zoom]}
      />
    </div>
  );
};

export default Gallery;