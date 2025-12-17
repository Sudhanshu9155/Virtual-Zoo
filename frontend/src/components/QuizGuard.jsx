import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function QuizGuard({ children }) {
  const { user } = useAuth();

  // If not logged in or quiz not completed, send to quiz start
  if (!user || !user.quizCompleted) {
    return <Navigate to="/quiz-start" replace />;
  }

  return children;
}
