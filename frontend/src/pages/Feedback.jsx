import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feedback = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_af9ysfd",
        "template_93d7ufr",
        form.current,
        "KUawlnKaU68_a5J1s"
      )
      .then(
        () => {
          toast.success("🎉 Feedback sent successfully!", {
            position: "top-center",
            autoClose: 2000,
          });
          form.current.reset();
          setLoading(false);
        },
        (error) => {
          console.error(error.text);
          toast.error("❌ Failed to send feedback. Please try again.", {
            position: "top-center",
            autoClose: 2000,
          });
          setLoading(false);
        }
      );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex flex-col items-center py-20 px-4">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-600 to-transparent opacity-20"></div>
      
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border-t-8 border-orange-500">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-amber-500 opacity-10 rounded-bl-full"></div>
        
        {/* Header */}
        <div className="relative z-10 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl">🦁</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent mb-3">
            We Value Your Feedback
          </h2>
          <p className="text-center text-gray-600 text-lg max-w-xl mx-auto">
            Share your zoo experience with us! Your thoughts help us create memorable moments for all visitors.
          </p>
        </div>

        {/* Feedback Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Your Name
            </label>
            <input
              type="text"
              name="user_name"
              required
              placeholder="Enter your name"
              className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all bg-amber-50/30"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              name="user_email"
              required
              placeholder="Enter your email"
              className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all bg-amber-50/30"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Your Feedback
            </label>
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Tell us about your experience..."
              className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all resize-none bg-amber-50/30"
            ></textarea>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg hover:shadow-xl"
              } text-white px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 active:scale-95`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Submit Feedback"
              )}
            </button>
          </div>
        </form>

        {/* Toast Notifications */}
        <ToastContainer 
          toastStyle={{
            background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
            color: 'white',
            fontWeight: 'bold'
          }}
        />
      </div>

      {/* Bottom decorative accent */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>🐘 Thank you for helping us improve your zoo experience 🦒</p>
      </div>
    </section>
  );
};

export default Feedback;