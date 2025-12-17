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
    <section className="min-h-screen bg-gradient-to-b from-amber-50 via-emerald-50 to-white flex flex-col items-center py-20 px-4">
      <div className="max-w-2xl w-full bg-white/95 rounded-3xl shadow-xl p-8 md:p-10 border border-emerald-100 relative overflow-hidden">
        {/* Subtle corner accent */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-100/60" />

        {/* Header */}
        <div className="relative z-10 mb-6 text-center">
          <div className="inline-flex items-center justify-center mb-3 rounded-2xl bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 uppercase tracking-[0.25em]">
            Feedback
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-900 mb-2">
            We Value Your Feedback
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            Share your zoo experience with us so we can keep improving Virtual Zoo
            for you and other explorers.
          </p>
        </div>

        {/* Feedback Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-5 relative z-10">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-[0.18em]">
                Your Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none text-sm bg-emerald-50/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-[0.18em]">
                Email Address
              </label>
              <input
                type="email"
                name="user_email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none text-sm bg-emerald-50/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-[0.18em]">
              Your Feedback
            </label>
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Tell us about your experience..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none text-sm resize-none bg-emerald-50/20"
            ></textarea>
          </div>

          <div className="pt-3 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 shadow-md hover:shadow-lg"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
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
            background: "linear-gradient(135deg, #047857 0%, #16a34a 50%, #f59e0b 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        />
      </div>

      {/* Bottom decorative accent */}
      <div className="mt-8 text-center text-gray-500 text-xs md:text-sm">
        <p>🐘 Thank you for helping us improve your zoo experience 🦒</p>
      </div>
    </section>
  );
};

export default Feedback;