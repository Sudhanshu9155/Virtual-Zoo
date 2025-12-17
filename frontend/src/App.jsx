import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Categories from "./pages/Categories";
import Feedback from "./pages/Feedback";

// Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";

// Quiz pages
import QuizCategories from "./pages/QuizCategories";
import QuizAnimalList from "./pages/QuizAnimalList";
import QuizStart from "./pages/QuizStart";

// Virtual Zoo pages
import VirtualTour from "./pages/VirtualTour";
import TourPage from "./pages/TourPage";
import AnimalDetails from "./pages/AnimalDetails";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-grow bg-gray-50">
            <Routes>
              {/* -------- PUBLIC ROUTES -------- */}
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/feedback" element={<Feedback />} />

              {/* -------- AUTH ROUTES -------- */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* -------- QUIZ ROUTES (REQUIRE LOGIN) -------- */}
              <Route
                path="/quiz-categories"
                element={
                  <ProtectedRoute>
                    <QuizCategories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz-animals"
                element={
                  <ProtectedRoute>
                    <QuizAnimalList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz-start"
                element={
                  <ProtectedRoute>
                    <QuizStart />
                  </ProtectedRoute>
                }
              />

              {/* -------- VIRTUAL ZOO (LOGIN + OPTIONAL QUIZ GUARD) -------- */}
              <Route
                path="/tour"
                element={
                  <ProtectedRoute>
                    <VirtualTour />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tour/:id"
                element={
                  <ProtectedRoute>
                    <TourPage />
                  </ProtectedRoute>
                }
              />

              {/* Animal detail remains public */}
              <Route path="/animal/:id" element={<AnimalDetails />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
