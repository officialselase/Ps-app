// src/pages/BlogDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetailPage = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/blogposts/${slug}/`);
        setBlogPost(response.data);
      } catch (err) {
        console.error(`Error fetching blog post with slug ${slug}:`, err);
        if (err.response && err.response.status === 404) {
          setError("Blog post not found.");
        } else {
          setError("Failed to load blog post. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPost();
  }, [slug]); // Re-fetch if slug changes

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50 pt-20">
        <p className="text-teal-800 text-xl">Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-teal-50 pt-20 px-4 text-center">
        <p className="text-red-600 text-xl mb-4">{error}</p>
        <Link to="/news" className="bg-gold-500 text-white px-6 py-2 rounded-full hover:bg-gold-600 transition">
          Back to all Blogs
        </Link>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50 pt-20">
        <p className="text-teal-800 text-xl">No blog post data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800 pt-20"> {/* Added pt-20 for header spacing */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {blogPost.image && (
          <div className="mb-8 overflow-hidden rounded-lg shadow-xl">
            <img
              src={`http://127.0.0.1:8000${blogPost.image}`} // Adjust path to your Django media
              alt={blogPost.title}
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4 leading-tight">
          {blogPost.title}
        </h1>
        <div className="text-sm text-gray-600 mb-8 flex flex-wrap gap-x-4">
          <span>By {blogPost.author}</span>
          <span>•</span>
          <span>Published on {new Date(blogPost.published_date).toLocaleDateString()}</span>
          {blogPost.updated_date && blogPost.published_date !== blogPost.updated_date && (
            <>
              <span>•</span>
              <span>Last updated on {new Date(blogPost.updated_date).toLocaleDateString()}</span>
            </>
          )}
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12">
          {/* Using dangerouslySetInnerHTML for HTML content from backend */}
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </div>

        <div className="mt-12 text-center">
          <Link to="/news" className="bg-gold-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gold-600 transition">
            Back to All Blogs
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;