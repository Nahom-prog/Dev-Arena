import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import ExploreHome from './pages/ExploreHome';
import QuizzesList from './pages/QuizzesList';
import QuickPractice from './pages/QuickPractice';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import ExamRoom from './pages/ExamRoom';
import DetailedResult from './pages/DetailedResult';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherCreate from './pages/TeacherCreate';
import TeacherManage from './pages/TeacherManage';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<ExploreHome />} />
              <Route path="/quizzes" element={<QuizzesList />} />
              <Route path="/practice" element={<QuickPractice />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Authenticated Pages */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/quiz/:quizId" element={<ExamRoom />} />
                <Route path="/quiz/:quizId/result" element={<DetailedResult />} />
              </Route>

              {/* Educator Studio Routes */}
              <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
                <Route path="/studio" element={<TeacherDashboard />} />
                <Route path="/create-quiz" element={<TeacherCreate />} />
                <Route path="/quiz/:quizId/edit" element={<TeacherManage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
