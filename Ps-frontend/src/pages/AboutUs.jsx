// src/pages/AboutUs.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AboutUs = () => {
  // Placeholder data for team members (unchanged)
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Evelyn Mensah",
      title: "Founder & CEO",
      image: "/team-evelyn.jpg", // Placeholder: Replace with actual image
      bioSnippet: "A visionary leader with over 20 years in public health...",
    },
    {
      id: 2,
      name: "Mr. Kofi Boakye",
      title: "Program Director",
      image: "/team-kofi.jpg", // Placeholder: Replace with actual image
      bioSnippet: "Manages all ground operations and community engagements...",
    },
    {
      id: 3,
      name: "Ms. Adwoa Ansah",
      title: "Head of Partnerships",
      image: "/team-adwoa.jpg", // Placeholder: Replace with actual image
      bioSnippet: "Drives strategic collaborations for sustainable impact...",
    },
    {
      id: 4,
      name: "Dr. Nana Yaw",
      title: "Chief Medical Advisor",
      image: "/team-nana.jpg", // Placeholder: Replace with actual image
      bioSnippet: "Provides expert guidance on all oral health initiatives...",
    },
  ];

  return (
    <div className="min-h-screen bg-teal-50 text-teal-800">
      {/* About Us Page Hero/Banner Section - Shorter Version */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg1.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-teal-900/60 via-teal-800/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-light">
              About Pleroma Springs Foundation
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gold-200">
              Our Story, Our Mission, Our Impact.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story / History Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="/about.jpg"
                alt="Pleroma Springs Foundation Story"
                className="rounded-3xl shadow-xl w-full h-auto object-cover max-h-[500px]"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h3 className="text-gold-500 font-medium text-lg mb-2 uppercase tracking-wider">
                Our Roots
              </h3>
              <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-6">
                The Story Behind Our Mission
              </h2>
              <p className="text-lg text-teal-700 leading-relaxed mb-6">
                Pleroma Springs Foundation was born from a deep-seated belief
                that everyone deserves access to quality oral healthcare,
                regardless of their location or economic status. Our journey
                began with a small team driven by a singular vision: to bridge
                the gap in oral health disparities globally.
              </p>
              <p className="text-lg text-teal-700 leading-relaxed mb-8">
                From humble beginnings, providing basic dental education and
                supplies in local communities, we have grown into an
                international organization. Our growth is fueled by unwavering
                dedication, the support of our incredible partners, and the
                tangible positive impact we see in the lives of those we serve.
              </p>
              <Link
                to="/impact"
                className="inline-flex items-center text-gold-500 hover:text-gold-600 hover:underline transition font-semibold"
              >
                See Our Impact{" "}
                <span className="ml-1 text-xl leading-none">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission, Vision, and Values Section - With Blurred Background Image */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg4.jpg')",
        }} // Background image added
      >
        <div className="absolute inset-0 bg-teal-800/80 backdrop-blur-sm"></div>{" "}
        {/* Dark teal overlay with blur */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-12">
            {" "}
            {/* Changed text color to white */}
            Our Guiding Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission Card */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border-t-4 border-gold-500"
              whileHover={{ y: -5 }}
            >
              <div className="text-gold-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-teal-800 mb-3">
                Our Mission
              </h3>
              <p className="text-teal-700 leading-relaxed">
                To transform global oral health by fostering innovative
                education, establishing strategic partnerships, and ensuring
                sustainable access to care for all, with a special focus on
                underserved regions.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border-t-4 border-gold-500"
              whileHover={{ y: -5 }}
            >
              <div className="text-gold-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.92 12c0 3.072 1.15 5.966 3.173 8.164a13.003 13.003 0 005.803 2.073c.112-.036.223-.075.33-.112a13.004 13.004 0 005.679-2.036C20.912 17.034 22 14.14 22 12A12.001 12.001 0 0017.618 7.984z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-teal-800 mb-3">
                Our Vision
              </h3>
              <p className="text-teal-700 leading-relaxed">
                A world where every individual, especially those in underserved
                communities, enjoys optimal oral health, contributing to overall
                well-being and improved quality of life.
              </p>
            </motion.div>

            {/* Values Card */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border-t-4 border-gold-500"
              whileHover={{ y: -5 }}
            >
              <div className="text-gold-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4m0-10l-8-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-teal-800 mb-3">
                Our Values
              </h3>
              <p className="text-teal-700 leading-relaxed">
                Compassion, Innovation, Collaboration, Sustainability, and
                Equity. These values guide every initiative and interaction as
                we strive for excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team / Leadership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-teal-800 mb-12">
            Meet Our Dedicated Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="bg-teal-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border-b-4 border-gold-500"
                whileHover={{ y: -5 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                />
                <h3 className="text-xl font-semibold text-teal-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-gold-600 font-medium text-sm mb-3">
                  {member.title}
                </p>
                <p className="text-teal-700 text-sm leading-relaxed">
                  {member.bioSnippet}
                </p>
                <Link
                  to={`/team/${member.id}`}
                  className="mt-4 text-gold-500 hover:text-gold-600 hover:underline font-medium text-sm flex items-center"
                >
                  Read Bio{" "}
                  <span className="ml-1 text-base leading-none">&rarr;</span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/team"
              className="bg-yellow-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold-600 transition-colors shadow-lg"
            >
              View All Team
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Consistent with Homepage */}
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

export default AboutUs;
