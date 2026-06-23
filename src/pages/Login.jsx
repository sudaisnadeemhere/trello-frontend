import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      const data = await apiRequest('/api/auth/login', 'POST', { email, password });
      if (data && data.token && data.user) {
        login(data);
        setTimeout(() => navigate('/board', { replace: true }), 100);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell auth-page page-transition">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your task board</p>
          </div>
          
          {error && <div className="error-box">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              <span>Email</span>
              <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                placeholder="your@email.com"
                disabled={loading}
                required 
              />
            </label>
            <label>
              <span>Password</span>
              <input 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                placeholder="••••••••"
                disabled={loading}
                required 
              />
            </label>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
