import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Board from './pages/Board';
import Introduction from './pages/Introduction';
import Features from './pages/Features';
import Contact from './pages/Contact';
import './index.css';

function ProtectedRoute({ element }) {
  const { user, token } = useAuth();

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return element;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Introduction />} />
      <Route path="/features" element={<Features />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/board" element={<ProtectedRoute element={<Board />} />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
