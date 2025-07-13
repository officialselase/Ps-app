// src/pages/Contact.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react"; // Icons for contact details

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic client-side validation (for demonstration)
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill in all fields.");
      return;
    }
    // In a real application, you would send this data to a backend server.
    // For now, we'll just log it to the console.
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    // Optionally clear the form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {/* Contact Page Hero/Banner Section - Consistent Style (unchanged) */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }} // Placeholder: Add a relevant image for Contact hero
        ></div>
        <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-light">Get In Touch</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gold-200">
              We'd love to hear from you. Reach out with your inquiries,
              partnership proposals, or feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction and Contact Details Section (unchanged) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-8">
            Contact Information
          </h2>
          <p className="text-lg text-teal-700 leading-relaxed mb-12 max-w-3xl mx-auto">
            Our team is here to assist you. Feel free to contact us through any
            of the channels below or use the form to send us a direct message.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address */}
            <div className="flex flex-col items-center bg-teal-50 p-6 rounded-lg shadow-md border-t-4 border-gold-500">
              <MapPin size={48} className="text-gold-500 mb-4" />
              <h3 className="text-xl font-semibold text-teal-800 mb-2">
                Our Location
              </h3>
              <p className="text-teal-700 text-center">
                Pleroma Springs Foundation
                <br />
                P.O. Box AN 12345
                <br />
                Accra, Greater Accra Region
                <br />
                Ghana
              </p>
            </div>
            {/* Phone */}
            <div className="flex flex-col items-center bg-teal-50 p-6 rounded-lg shadow-md border-t-4 border-gold-500">
              <Phone size={48} className="text-gold-500 mb-4" />
              <h3 className="text-xl font-semibold text-teal-800 mb-2">
                Phone
              </h3>
              <p className="text-teal-700">+233 (0)24 123 4567</p>
              <p className="text-teal-700">+233 (0)30 123 4567</p>
            </div>
            {/* Email */}
            <div className="flex flex-col items-center bg-teal-50 p-6 rounded-lg shadow-md border-t-4 border-gold-500">
              <Mail size={48} className="text-gold-500 mb-4" />
              <h3 className="text-xl font-semibold text-teal-800 mb-2">
                Email
              </h3>
              <p className="text-teal-700 break-words">
                info@pleromasprings.org
              </p>
              <p className="text-teal-700 break-words">
                partnerships@pleromasprings.org
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section - WITH BLURRED IMAGE BACKGROUND */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/bg2.jpg')",
        }} // Background image added
      >
        <div className="absolute inset-0 bg-teal-800/80 backdrop-blur-sm"></div>{" "}
        {/* Dark teal overlay with blur */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light text-white text-center mb-12">
            {" "}
            {/* Changed text color to white */}
            Send Us a Message
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-gold-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-teal-800 text-lg font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-teal-800"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-teal-800 text-lg font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-teal-800"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-teal-800 text-lg font-medium mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-teal-800"
                placeholder="Topic of your message"
                required
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-teal-800 text-lg font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-teal-800"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gold-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-gold-600 transition-colors shadow-lg"
              >
                Send Message{" "}
                <span className="ml-1 text-xl leading-none">→</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Interactive Map Section (unchanged) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-8">
            Find Us On The Map
          </h2>
          <p className="text-lg text-teal-700 leading-relaxed mb-12 max-w-3xl mx-auto">
            Our office is located in the vibrant city of Accra. Visit us or use
            the map to get directions.
          </p>
          <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg shadow-xl border-2 border-teal-200">
            {/* Placeholder for Google Maps Embed. Replace 'YOUR_EMBED_MAP_URL_HERE' with your actual embed code from Google Maps */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.610574163984!2d-0.1983058860269382!3d6.680679095166444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9119c4c7c8c3%3A0x6b8b8b8b8b8b8b8b!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1678886400000!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pleroma Springs Foundation Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Consistent with other pages (unchanged) */}
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
              to="/contact"
              className="bg-gold-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold-600 transition-colors shadow-lg"
            >
              Volunteer With Us
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-colors shadow-lg"
            >
              Partner With Us
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-gold-500 text-gold-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold-500 hover:text-white transition-colors shadow-lg"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
