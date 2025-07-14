import React from "react";
import { Link } from "react-router-dom";

export default function Home({ user }) {
  const features = [
    {
      title: "Browse Questions",
      description:
        "Explore thousands of real interview questions shared by NIT Silchar alumni across various companies and roles.",
      icon: "🔍",
      linkTo: "/questions",
      buttonText: "View Questions",
    },
    {
      title: "Submit Your Experience",
      description:
        "Share your interview questions and help future students prepare for their dream jobs.",
      icon: "📝",
      linkTo: "/submit",
      buttonText: "Submit Question",
      requiresAuth: true,
    },
    {
      title: "Company Insights",
      description:
        "Get company-specific interview insights and understand what each employer is looking for.",
      icon: "🏢",
      linkTo: "/questions",
      buttonText: "Explore Companies",
    },
    {
      title: "AI Assistant",
      description:
        "Get instant help with our intelligent chatbot that can answer your interview preparation questions.",
      icon: "🤖",
      linkTo: "#",
      buttonText: "Chat Now",
      isSpecial: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-blue-600">NIT Silchar</span>
            <br />
            Interview Discussions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your comprehensive resource for interview preparation. Access real
            interview questions, share your experiences, and help fellow
            students succeed in their career journey.
          </p>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1000+</div>
              <div className="text-gray-600">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">200+</div>
              <div className="text-gray-600">Contributors</div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col h-full"
            >
              <div className="text-4xl mb-4 text-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 text-center text-sm leading-relaxed flex-grow">
                {feature.description}
              </p>
              <div className="text-center mt-auto">
                {feature.requiresAuth && !user ? (
                  <div className="w-full">
                    <button
                      disabled
                      className="btn btn-sm btn-warning w-full text-white font-semibold"
                      title="Login required to submit questions"
                    >
                      🔒 Login Required
                    </button>
                    <p className="text-xs text-orange-600 mt-2 font-medium">
                      Sign in to share your experience
                    </p>
                  </div>
                ) : feature.isSpecial ? (
                  <button
                    className="btn btn-sm btn-primary w-full"
                    onClick={() => {
                      const chatbotElement =
                        document.querySelector("[data-chatbot]");
                      if (chatbotElement) {
                        chatbotElement.click();
                      }
                    }}
                  >
                    {feature.buttonText}
                  </button>
                ) : (
                  <Link
                    to={feature.linkTo}
                    className="btn btn-sm btn-primary w-full"
                  >
                    {feature.buttonText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join hundreds of NIT Silchar students and alumni who are sharing
            their interview experiences to help the community succeed together.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/questions" className="btn btn-primary btn-lg">
              Browse Questions
            </Link>
            {user ? (
              <Link to="/submit" className="btn btn-outline btn-lg">
                Share Your Experience
              </Link>
            ) : (
              <div className="flex flex-col items-center">
                <button
                  disabled
                  className="btn btn-warning btn-lg text-white font-semibold"
                  title="Login to submit questions"
                >
                  🔒 Login to Contribute
                </button>
                <p className="text-sm text-orange-600 mt-2 font-medium">
                  Sign in to share your interview experience
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-gray-500">
          <p>Built by students, for students. Together we grow stronger. 💪</p>
        </div>
      </div>
    </div>
  );
}
