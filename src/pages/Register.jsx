import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';
import { useAuth } from '../auth/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      const data = await apiRequest('/api/auth/register', 'POST', { name, email, password });
      if (data && data.token && data.user) {
        login(data);
        setTimeout(() => navigate('/board', { replace: true }), 100);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell auth-page page-transition">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Join and start managing your tasks</p>
          </div>

          {error && <div className="error-box">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              <span>Full Name</span>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                type="text"
                placeholder="Your name"
                disabled={loading}
                required 
              />
            </label>
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
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
