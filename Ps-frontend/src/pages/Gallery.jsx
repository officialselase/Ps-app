// src/pages/Gallery.jsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Simple Skeleton Loader component
const GalleryItemSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-64 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState("categorized");

  // NEW: State for Filtering and Sorting
  const [selectedCategory, setSelectedCategory] = useState("all"); // 'all' or specific category name
  const [sortOption, setSortOption] = useState("date_desc"); // 'date_desc', 'date_asc', 'title_asc', 'title_desc'

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/gallery-items/"
        );
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

  // NEW: Get all unique categories for the filter dropdown
  const allUniqueCategories = useMemo(() => {
    const categories = new Set();
    if (Array.isArray(galleryItems)) {
      galleryItems.forEach((item) => {
        if (item.category && item.category.name) {
          categories.add(item.category.name);
        }
      });
    }
    return ["all", ...Array.from(categories).sort()];
  }, [galleryItems]);

  // NEW: Filter items based on selectedCategory
  const filteredItems = useMemo(() => {
    if (!Array.isArray(galleryItems)) return [];
    if (selectedCategory === "all") {
      return galleryItems;
    }
    return galleryItems.filter(
      (item) => item.category && item.category.name === selectedCategory
    );
  }, [galleryItems, selectedCategory]);

  // NEW: Sort filtered items based on sortOption
  const sortedFilteredItems = useMemo(() => {
    if (!Array.isArray(filteredItems)) return [];
    const sorted = [...filteredItems]; // Create a shallow copy to avoid mutating state

    sorted.sort((a, b) => {
      if (sortOption === "date_desc") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortOption === "date_asc") {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sortOption === "title_asc") {
        return (a.title || "").localeCompare(b.title || "");
      } else if (sortOption === "title_desc") {
        return (b.title || "").localeCompare(a.title || "");
      }
      return 0; // No sorting applied
    });
    return sorted;
  }, [filteredItems, sortOption]);

  // Group sorted and filtered items for the categorized view
  const groupedGalleryItems = useMemo(() => {
    const groups = {};
    if (!Array.isArray(sortedFilteredItems)) return {};

    sortedFilteredItems.forEach((item) => {
      const categoryName = item.category ? item.category.name : "Uncategorized";
      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }
      groups[categoryName].push(item);
    });
    return groups;
  }, [sortedFilteredItems]);

  // Get sorted category names from the *grouped* items for rendering order
  const categoryNames = Object.keys(groupedGalleryItems).sort();

  // The slides for the lightbox should use the *sortedFilteredItems*
  const slides = sortedFilteredItems.map((item) => ({
    src: `http://127.0.0.1:8000${item.image}`,
    alt: item.title || item.description || "Gallery image", // Add default alt text
    title: item.title,
  }));

  const openImageViewer = (index) => {
    // The index here refers to the index within the 'slides' array (sortedFilteredItems)
    setCurrentImageIndex(index);
    setOpenLightbox(true);
  };

  // Render loading skeletons
  if (loading) {
    return (
      <div className="min-h-screen bg-teal-50 pt-20">
        <section className="relative h-48 md:h-60 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/bg1.jpg')" }}
          ></div>
          <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>
          <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Our Photo Gallery
            </h1>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map(
                (
                  _,
                  i // Render 8 skeleton loaders
                ) => (
                  <GalleryItemSkeleton key={i} />
                )
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Render error message
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50 pt-20">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {/* Gallery Page Hero/Banner Section */}
      <section className="relative h-48 md:h-60 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-2">
            <p className="text-lg md:text-xl font-light text-gold-200 uppercase tracking-wide">
              Visual Story
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Our Photo Gallery
            </h1>
          </div>
        </div>
      </section>

      {/* Main Gallery Content Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls: View Mode, Filter, Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0 md:space-x-4">
            {/* View Mode Toggles */}
            <div className="flex space-x-4">
              <button
                onClick={() => setViewMode("categorized")}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300
                  ${
                    viewMode === "categorized"
                      ? "bg-gold-500 text-white shadow-md"
                      : "bg-white text-teal-800 border border-teal-200 hover:bg-teal-50 hover:border-teal-300"
                  }`}
                aria-label="View gallery by category"
              >
                View by Category
              </button>
              <button
                onClick={() => setViewMode("all")}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300
                  ${
                    viewMode === "all"
                      ? "bg-gold-500 text-white shadow-md"
                      : "bg-white text-teal-800 border border-teal-200 hover:bg-teal-50 hover:border-teal-300"
                  }`}
                aria-label="View all gallery items"
              >
                View All
              </button>
            </div>

            {/* Filter by Category Dropdown */}
            <div className="relative w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-6 py-3 border border-teal-200 rounded-full shadow-sm bg-white text-teal-800 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-lg appearance-none cursor-pointer"
                aria-label="Filter gallery by category"
              >
                {allUniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-teal-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.096 6.924 4.682 8.338z" />
                </svg>
              </div>
            </div>

            {/* Sort by Dropdown */}
            <div className="relative w-full md:w-auto">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="block w-full px-6 py-3 border border-teal-200 rounded-full shadow-sm bg-white text-teal-800 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-lg appearance-none cursor-pointer"
                aria-label="Sort gallery items"
              >
                <option value="date_desc">Newest First</option>
                <option value="date_asc">Oldest First</option>
                <option value="title_asc">Title A-Z</option>
                <option value="title_desc">Title Z-A</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-teal-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.096 6.924 4.682 8.338z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Conditional Rendering based on viewMode */}
          {sortedFilteredItems.length > 0 ? (
            viewMode === "categorized" ? (
              // Categorized View
              <div>
                {categoryNames.map((categoryName) => {
                  const itemsInCategory = groupedGalleryItems[categoryName];
                  if (itemsInCategory.length === 0) {
                    // NEW: Empty state message for categories
                    return (
                      <div key={categoryName} className="mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-light text-teal-700 mb-4">
                          {categoryName}
                        </h2>
                        <p className="text-xl text-gray-600">
                          No items found in this category with current filters.
                        </p>
                      </div>
                    );
                  }
                  return (
                    <div key={categoryName} className="mb-12">
                      <h2 className="text-3xl md:text-4xl font-light text-teal-700 mb-8 text-center">
                        {categoryName}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {itemsInCategory.map((item) => (
                          <div
                            key={item.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                            onClick={() =>
                              openImageViewer(sortedFilteredItems.indexOf(item))
                            }
                          >
                            <div className="w-full h-64 overflow-hidden">
                              {/* NEW: Lazy loading */}
                              <img
                                src={`http://127.0.0.1:8000${item.image}`}
                                alt={
                                  item.title ||
                                  item.description ||
                                  "Gallery image"
                                } // Robust alt text
                                className="w-full h-full object-cover"
                                loading="lazy" // Enable lazy loading
                              />
                            </div>
                            {item.title && (
                              <div className="p-4">
                                <p className="text-sm text-gray-700 font-medium">
                                  {item.title}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // All View (original flat grid with sorting/filtering applied)
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedFilteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                    onClick={() => openImageViewer(index)} // Index directly applies to sortedFilteredItems
                  >
                    <div className="w-full h-64 overflow-hidden">
                      {/* NEW: Lazy loading */}
                      <img
                        src={`http://127.0.0.1:8000${item.image}`}
                        alt={item.title || item.description || "Gallery image"} // Robust alt text
                        className="w-full h-full object-cover"
                        loading="lazy" // Enable lazy loading
                      />
                    </div>
                    {item.title && (
                      <div className="p-4">
                        <p className="text-sm text-gray-700 font-medium">
                          {item.title}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            // NEW: Empty state message for overall gallery
            <p className="text-center text-xl text-teal-700">
              No gallery items found matching your selections.
            </p>
          )}
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={slides}
        index={currentImageIndex}
        // Accessibility considerations for Lightbox:
        // 'yet-another-react-lightbox' is generally well-designed for a11y.
        // It provides keyboard navigation (arrows, esc), focus management.
        // Ensure your image `alt` and `title` props are descriptive.
      />
    </div>
  );
};

export default Gallery;
