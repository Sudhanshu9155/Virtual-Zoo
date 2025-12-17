import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getLeaderboard } from "../services/api";

const getInitials = (name = "", email = "") => {
  if (name) {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return email.charAt(0).toUpperCase();
};

const Profile = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data);
      } catch (err) {
        console.error("Failed to load leaderboard", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-emerald-50 to-sky-50 px-4">
        <div className="bg-white/90 rounded-3xl shadow-xl border border-amber-100 px-10 py-8 text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-2">
            No profile available
          </h2>
          <p className="text-gray-600">
            Please login to view your profile.
          </p>
        </div>
      </section>
    );
  }

  const initials = getInitials(user.name, user.email);

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-sky-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* PROFILE HEADER CARD */}
        <div className="relative mb-8 overflow-hidden rounded-3xl shadow-xl border border-emerald-100 bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-400 text-white">
          <div className="absolute inset-0 opacity-20 mix-blend-soft-light bg-[url('https://images.pexels.com/photos/1821730/pexels-photo-1821730.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between px-8 py-8 md:py-10 gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-white/10 border border-white/40 flex items-center justify-center text-3xl md:text-4xl font-bold shadow-lg backdrop-blur">
                {initials}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-50/90 mb-1">
                  Zoo Explorer Profile
                </p>
                <h1 className="text-2xl md:text-3xl font-extrabold drop-shadow-sm">
                  {user.name || "Anonymous Explorer"}
                </h1>
                <p className="text-emerald-50/90 text-sm mt-1">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="px-4 py-2 rounded-2xl bg-black/10 backdrop-blur border border-white/20">
                <p className="text-[0.7rem] uppercase tracking-widest text-emerald-50/80">
                  Best Score
                </p>
                <p className="text-xl font-extrabold">
                  {"bestScore" in user ? user.bestScore : 0}
                  <span className="text-sm font-semibold text-emerald-100/80">
                    /10
                  </span>
                </p>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-black/10 backdrop-blur border border-white/20">
                <p className="text-[0.7rem] uppercase tracking-widest text-emerald-50/80">
                  Quizzes Taken
                </p>
                <p className="text-xl font-extrabold">
                  {"quizzesTaken" in user ? user.quizzesTaken : 0}
                </p>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-black/10 backdrop-blur border border-white/20">
                <p className="text-[0.7rem] uppercase tracking-widest text-emerald-50/80">
                  Status
                </p>
                <p className="text-sm font-semibold">
                  {user.quizCompleted ? "Quiz Unlocked ✅" : "Locked 🔒"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* LEFT COLUMN: DETAILS & STATS CARDS */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-white/95 rounded-2xl shadow-md border border-emerald-100 p-6">
              <h2 className="text-sm font-semibold text-emerald-700 uppercase tracking-[0.2em] mb-2">
                Personal Details
              </h2>
              <div className="mt-3 space-y-3 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-500">Name</span>
                  <span>{user.name || "Anonymous Explorer"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-500">Email</span>
                  <span className="truncate max-w-[160px] text-right">
                    {user.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/95 rounded-2xl shadow-md border border-amber-100 p-6">
              <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-[0.2em] mb-2">
                Quiz Insights
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
                  <p className="text-[0.7rem] uppercase tracking-widest text-amber-700/80 mb-1">
                    Last Score
                  </p>
                  <p className="text-lg font-semibold text-amber-900">
                    {"lastScore" in user ? user.lastScore : 0}
                    <span className="text-xs text-amber-700/80"> / 10</span>
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3">
                  <p className="text-[0.7rem] uppercase tracking-widest text-emerald-700/80 mb-1">
                    Completion
                  </p>
                  <p className="text-sm font-semibold text-emerald-900">
                    {user.quizCompleted ? "Passed" : "Not passed yet"}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500 leading-relaxed">
                Keep playing quizzes to improve your best score and climb the
                leaderboard of Virtual Zoo explorers.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: LEADERBOARD */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 rounded-2xl shadow-md border border-emerald-100 p-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <h2 className="text-lg md:text-xl font-extrabold text-emerald-900">
                    Leaderboard
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600">
                    Top explorers based on their best quiz scores.
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 text-xs px-3 py-1 border border-emerald-100">
                  {leaderboard.length} active players
                </span>
              </div>

              {loading ? (
                <p className="text-gray-500 text-sm">Loading leaderboard...</p>
              ) : (
                <div className="overflow-x-auto border border-emerald-100 rounded-2xl shadow-sm bg-white mt-3">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-emerald-50 text-emerald-900 uppercase text-xs tracking-wide">
                      <tr>
                        <th className="px-4 py-3">Rank</th>
                        <th className="px-4 py-3">Player</th>
                        <th className="px-4 py-3">Best Score</th>
                        <th className="px-4 py-3">Last Score</th>
                        <th className="px-4 py-3">Quizzes Taken</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-6 text-center text-gray-500 text-sm"
                          >
                            No scores yet. Be the first to play a quiz!
                          </td>
                        </tr>
                      ) : (
                        leaderboard.map((u, idx) => {
                          const isCurrent =
                            u._id === user._id || u.email === user.email;
                          return (
                            <tr
                              key={u._id || u.email}
                              className={`border-t border-emerald-50 ${
                                isCurrent ? "bg-amber-50/60" : "bg-white"
                              }`}
                            >
                              <td className="px-4 py-2 font-semibold text-gray-700">
                                #{idx + 1}
                              </td>
                              <td className="px-4 py-2 text-gray-800">
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xs font-semibold text-emerald-800">
                                    {getInitials(u.name, u.email)}
                                  </div>
                                  <span>
                                    {u.name || u.email}
                                    {isCurrent && (
                                      <span className="ml-1 text-[0.65rem] text-amber-700 font-semibold uppercase tracking-wide">
                                        You
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-2 text-gray-700">
                                {u.bestScore ?? 0} / 10
                              </td>
                              <td className="px-4 py-2 text-gray-700">
                                {u.lastScore ?? 0} / 10
                              </td>
                              <td className="px-4 py-2 text-gray-700">
                                {u.quizzesTaken ?? 0}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
