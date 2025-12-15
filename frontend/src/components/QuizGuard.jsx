import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function QuizGuard({ children }) {
  const { user } = useAuth();
  if (!user.quizCompleted) return <Navigate to="/quiz-start" replace />;
  return children;
}
