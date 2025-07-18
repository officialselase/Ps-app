// src/pages/Blogs.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewsletterSubscriptionModal from "../components/NewsletterSubscriptionModal"; // Assuming you might want to add this consistent CTA

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false); // For consistent CTA

  useEffect(() => {
    const fetchAllBlogPosts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/blogposts/"
        );
        setBlogPosts(response.data);
      } catch (err) {
        console.error("Error fetching all blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50 pt-20">
        <p className="text-teal-800 text-xl">Loading blog posts...</p>
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
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {" "}
      {/* Removed pt-20 as hero will handle top spacing */}
      {/* Blog Page Hero/Banner Section - Consistent Style */}
      <section className="relative h-72 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }} // Using bg1.jpg as the hero background
        ></div>
        <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>{" "}
        {/* Overlay for text readability */}
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-light">
              Our Latest Insights
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gold-200">
              Stay updated with news, stories, and educational content from
              Pleroma Springs Foundation.
            </p>
          </div>
        </div>
      </section>
      {/* Main Blog Posts Section */}
      {/* RECOMMENDATION: Maintain the white background for the blog post list. */}
      {/* It provides excellent contrast and readability for article cards. */}
      <section className="py-12 md:py-20 bg-white">
        {" "}
        {/* Explicitly setting white background */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light text-center text-teal-800 mb-12">
            Explore All Articles
          </h2>{" "}
          {/* Changed heading to flow better after hero */}
          {blogPosts.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogPosts.map((post) => (
                <Link
                  to={`/news/${post.slug}`}
                  key={post.id}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {post.image && (
                      <div className="h-56 w-full overflow-hidden">
                        <img
                          src={`http://127.0.0.1:8000${post.image}`}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-semibold text-teal-800 mb-3 group-hover:text-gold-500 transition-colors">
                        {" "}
                        {/* Changed to h3 */}
                        {post.title}
                      </h3>
                      <p className="text-gray-700 text-base mb-4 flex-grow">
                        {post.excerpt ||
                          (post.content
                            ? post.content.substring(0, 200) + "..."
                            : "No description available.")}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mt-auto pt-4 border-t border-teal-100">
                        <span>By {post.author}</span>
                        <span>
                          {new Date(post.published_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-teal-700">
              No blog posts to display yet.
            </p>
          )}
        </div>
      </section>
      {/* Consistent Call to Action Section */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/502754517_1639700643404041_4084989612385175876_n.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-teal-800/80 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Join Our Mission: How You Can Help
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Whether through volunteering your time, partnering with us, or
            staying informed, your contribution powers our journey toward global
            oral health equity.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact#volunteer"
              className="bg-gold-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold-600 transition-colors shadow-lg"
            >
              Volunteer With Us
            </Link>
            <Link
              to="/contact#partner"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-colors shadow-lg"
            >
              Partner With Us
            </Link>
            <button
              onClick={() => setIsNewsletterModalOpen(true)}
              className="bg-transparent border-2 border-gold-500 text-gold-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold-500 hover:text-white transition-colors shadow-lg"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>
      <NewsletterSubscriptionModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </div>
  );
};

export default Blogs;
