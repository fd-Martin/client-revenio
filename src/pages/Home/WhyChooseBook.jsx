import React, { useState, useEffect } from "react";
import {
  Plus,
  Minus,
  HelpCircle,
  MessageCircle,
  Clock,
  CheckCircle,
} from "lucide-react";

const ModernFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    const interval = setInterval(() => {
      const currentTheme = localStorage.getItem("theme") || "light";
      if (currentTheme !== theme) {
        setTheme(currentTheme);
      }
    }, 100);

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [theme]);

  const isDark = theme === "dark";

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click the Sign Up button in the top right corner and follow the registration process. You'll need to provide your email, create a password, and verify your account through the email we send you.",
      icon: HelpCircle,
      color: "from-blue-500 to-cyan-500",
      hoverColor: "group-hover:from-blue-500 group-hover:to-cyan-500",
    },
    {
      question: "I forgot my password. What should I do?",
      answer:
        "Click on Forgot Password on the login page and follow the instructions sent to your email. You'll receive a secure link to reset your password within minutes.",
      icon: MessageCircle,
      color: "from-purple-500 to-pink-500",
      hoverColor: "group-hover:from-purple-500 group-hover:to-pink-500",
    },
    {
      question: "How do I update my profile information?",
      answer:
        "Go to My Account settings and select Edit Profile to make changes. You can update your name, email, phone number, delivery address, and preferences anytime.",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      hoverColor: "group-hover:from-green-500 group-hover:to-emerald-500",
    },
    {
      question: "What types of books can I order through BookCourier?",
      answer:
        "You can order a wide range of books including fiction, non-fiction, academic textbooks, children's books, and popular novels available in our collection. We have over 50,000+ titles from various genres and publishers.",
      icon: HelpCircle,
      color: "from-orange-500 to-amber-500",
      hoverColor: "group-hover:from-orange-500 group-hover:to-amber-500",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes 2-5 business days depending on your location within Bangladesh. We aim to deliver your books as quickly as possible. Express delivery options are also available for urgent orders.",
      icon: Clock,
      color: "from-red-500 to-rose-500",
      hoverColor: "group-hover:from-red-500 group-hover:to-rose-500",
    },
    {
      question: "Is there a delivery fee?",
      answer:
        "Delivery fees may vary based on your location and the size of your order. Please check the checkout page for exact shipping costs before placing your order. Free shipping is available on orders above ৳500.",
      icon: MessageCircle,
      color: "from-indigo-500 to-blue-500",
      hoverColor: "group-hover:from-indigo-500 group-hover:to-blue-500",
    },
    {
      question: "Can I return or exchange a book?",
      answer:
        "Yes, you can request a return or exchange within 7 days of receiving the book if it is damaged or incorrect. Contact our support team for assistance. We ensure 100% customer satisfaction.",
      icon: CheckCircle,
      color: "from-teal-500 to-cyan-500",
      hoverColor: "group-hover:from-teal-500 group-hover:to-cyan-500",
    },
  ];

  return (
    <div
      className={`relative px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${
        isDark ? "" : "bg-transparent"
      }`}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-11/12 mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-purple-100 dark:from-orange-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full backdrop-blur-sm">
            <HelpCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span className="text-orange-700 dark:text-orange-300 text-sm font-bold uppercase tracking-wider">
              Questions & Answers
            </span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-extrabold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Frequently Asked <span className=" text-primary">Questions</span>
          </h2>

          <p
            className={`text-lg max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Find quick answers to common questions about BookCourier. Can't find
            what you're looking for? Feel free to contact our support team.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {faqs.length}+
              </div>
              <div
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                FAQs Available
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                24/7
              </div>
              <div
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Support Ready
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                100%
              </div>
              <div
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`group relative ${
                  isDark ? "bg-gray-800/50" : "bg-white/80"
                } backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl border ${
                  isDark ? "border-gray-700" : "border-gray-100"
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Gradient Border Effect on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${faq.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                ></div>

                {/* Question Section */}
                <button
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full text-left p-6 flex items-start gap-4 focus:outline-none"
                >
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${faq.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Question Text */}
                  <div className="flex-1">
                    <h3
                      className={`font-bold text-lg mb-1 ${
                        isDark ? "text-white" : "text-gray-900"
                      } group-hover:text-transparent group-hover:bg-gradient-to-r ${
                        faq.hoverColor
                      } group-hover:bg-clip-text transition-all duration-300`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* Toggle Icon */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-br ${faq.color}`
                        : isDark
                        ? "bg-gray-700"
                        : "bg-gray-100"
                    }`}
                  >
                    {isActive ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus
                        className={`w-5 h-5 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      />
                    )}
                  </div>
                </button>

                {/* Answer Section with Smooth Animation */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    {/* Gradient Divider */}
                    <div
                      className={`h-0.5 mb-4 bg-gradient-to-r ${faq.color} opacity-30 rounded-full`}
                    ></div>

                    {/* Answer Text */}
                    <p
                      className={`leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        {/* <div
          className={`mt-16 text-center p-8 rounded-3xl ${
            isDark
              ? "bg-gradient-to-r from-gray-800 to-gray-700"
              : "bg-gradient-to-r from-orange-100 to-purple-100"
          } backdrop-blur-sm`}
        >
          <h3
            className={`text-2xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Still Have Questions?
          </h3>
          <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Our support team is here to help you 24/7. Don't hesitate to reach
            out!
          </p>
          <button className="group relative px-8 py-2.5 rounded-full bg-orange-500 text-white font-bold tracking-wide shadow-lg hover:shadow-orange-500/40 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Contact Support
            </span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-orange-400"></div>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ModernFAQ;
