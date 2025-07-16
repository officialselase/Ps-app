// src/pages/Blogs.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import NewsletterSubscriptionModal from "../components/NewsletterSubscriptionModal";

// Placeholder data for blog posts - you'll replace this with real data later
const blogPosts = [
  {
    id: 1,
    title: "The Importance of Early Oral Hygiene Education",
    date: "July 10, 2024",
    excerpt: "Discover why teaching children about dental care from a young age is crucial for lifelong health...",
    image: "/blog-post-1.jpg", // Placeholder image: add to your public folder
    link: "/news/post-1", // Example link to an individual post
  },
  {
    id: 2,
    title: "Bridging the Gap: Oral Health in Rural Communities",
    date: "June 25, 2024",
    excerpt: "Explore the challenges faced by remote areas in accessing dental care and our solutions...",
    image: "/blog-post-2.jpg", // Placeholder image: add to your public folder
    link: "/news/post-2",
  },
  {
    id: 3,
    title: "Community Outreach: Our Latest Dental Mission",
    date: "June 1, 2024",
    excerpt: "A recap of our recent mission trip, the lives touched, and the impact made...",
    image: "/blog-post-3.jpg", // Placeholder image: add to your public folder
    link: "/news/post-3",
  },
  {
    id: 4,
    title: "Understanding Periodontal Disease: Prevention and Treatment",
    date: "May 15, 2024",
    excerpt: "An in-depth look at gum disease, its symptoms, and how you can protect your oral health...",
    image: "/blog-post-4.jpg", // Placeholder image: add to your public folder
    link: "/news/post-4",
  },
  {
    id: 5,
    title: "The Role of Nutrition in Oral Health",
    date: "April 28, 2024",
    excerpt: "Learn how your diet directly influences the health of your teeth and gums...",
    image: "/blog-post-5.jpg", // Placeholder image: add to your public folder
    link: "/news/post-5",
  },
  {
    id: 6,
    title: "Volunteer Spotlight: Making a Difference with Pleroma Springs",
    date: "April 1, 2024",
    excerpt: "Meet some of our incredible volunteers and hear about their experiences on the front lines...",
    image: "/blog-post-6.jpg", // Placeholder image: add to your public folder
    link: "/news/post-6",
  },
];

const Blogs = () => {
  const location = useLocation();
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  // Effect to handle scrolling to sections based on URL hash (if any are added later)
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        const headerOffset = 100; // Approximate height of your fixed header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {/* Blogs Page Hero/Banner Section */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg4.jpg')" }} // Placeholder: Use a relevant image for Blogs hero
        ></div>
        <div className="absolute inset-0 bg-teal-900/60"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-light">Our Blogs</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gold-200">
              Insights, Stories, and Updates from Pleroma Springs Foundation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Post Listing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-light text-teal-800 text-center mb-12">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-teal-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={post.link} className="block">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover"
                  />
                </Link>
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-sm text-teal-600 mb-2">{post.date}</p>
                  <h3 className="text-2xl font-semibold text-teal-800 mb-3 leading-tight">
                    <Link to={post.link} className="hover:text-gold-500 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-teal-700 leading-relaxed mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link
                    to={post.link}
                    className="mt-auto inline-block text-gold-500 font-semibold hover:text-gold-600 transition-colors"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section - Consistent with other pages */}
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