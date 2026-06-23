import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useEffect } from 'react';

export default function Features() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      navigate('/board', { replace: true });
    }
  }, [user, token, navigate]);

  return (
    <div className="features-page page-transition">
      <nav className="intro-nav">
        <div className="nav-content">
          <h2 className="nav-logo">TaskFlow</h2>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/features" className="nav-link active">Features</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/login" className="nav-btn-login">Sign In</Link>
          </div>
        </div>
      </nav>

      <section className="features-hero">
        <h1 className="page-title animate-fadeInDown">Powerful Features</h1>
        <p className="page-subtitle animate-fadeInUp">Everything you need to manage tasks effectively</p>
      </section>

      <section className="features-detailed">
        <div className="feature-row animate-fadeInUp">
          <div className="feature-content">
            <h2>Kanban Board</h2>
            <p>Visualize your workflow with our intuitive kanban board. Organize tasks into columns and drag them to update status instantly.</p>
            <ul className="feature-list">
              <li>✓ Unlimited task creation</li>
              <li>✓ Custom status columns</li>
              <li>✓ Drag & drop interface</li>
              <li>✓ Real-time updates</li>
            </ul>
          </div>
          <div className="feature-visual">
            <div className="visual-placeholder">📊</div>
          </div>
        </div>

        <div className="feature-row animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="feature-visual">
            <div className="visual-placeholder">👥</div>
          </div>
          <div className="feature-content">
            <h2>Task Assignment</h2>
            <p>Assign tasks to team members instantly. Track who is working on what and keep everyone aligned.</p>
            <ul className="feature-list">
              <li>✓ Easy task assignment</li>
              <li>✓ Team member profiles</li>
              <li>✓ Assignment notifications</li>
              <li>✓ Progress tracking</li>
            </ul>
          </div>
        </div>

        <div className="feature-row animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="feature-content">
            <h2>Search & Filter</h2>
            <p>Quickly find tasks with powerful search capabilities. Filter by assignee, status, or keyword.</p>
            <ul className="feature-list">
              <li>✓ Full-text search</li>
              <li>✓ Filter by assignee</li>
              <li>✓ Filter by status</li>
              <li>✓ Save filters</li>
            </ul>
          </div>
          <div className="feature-visual">
            <div className="visual-placeholder">🔍</div>
          </div>
        </div>

        <div className="feature-row animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="feature-visual">
            <div className="visual-placeholder">⚡</div>
          </div>
          <div className="feature-content">
            <h2>Real-time Collaboration</h2>
            <p>Work together with your team in real-time. See updates instantly as tasks are created and updated.</p>
            <ul className="feature-list">
              <li>✓ Live task updates</li>
              <li>✓ Instant notifications</li>
              <li>✓ Team activity feed</li>
              <li>✓ Version history</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pricing">
        <h2 className="section-title">Simple, Transparent Pricing</h2>
        <div className="pricing-cards">
          <div className="pricing-card animate-fadeInUp">
            <h3>Free</h3>
            <p className="price">$0</p>
            <p className="price-desc">Perfect to get started</p>
            <ul className="pricing-features">
              <li>✓ Up to 5 projects</li>
              <li>✓ Up to 10 tasks</li>
              <li>✓ Basic search</li>
            </ul>
            <button className="btn-secondary" disabled>Current Plan</button>
          </div>
          <div className="pricing-card featured animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="badge">Popular</div>
            <h3>Pro</h3>
            <p className="price">$9<span>/mo</span></p>
            <p className="price-desc">For growing teams</p>
            <ul className="pricing-features">
              <li>✓ Unlimited projects</li>
              <li>✓ Unlimited tasks</li>
              <li>✓ Advanced search</li>
              <li>✓ Team collaboration</li>
              <li>✓ Priority support</li>
            </ul>
            <Link to="/register" className="btn-primary">Start Free Trial</Link>
          </div>
          <div className="pricing-card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h3>Enterprise</h3>
            <p className="price">Custom</p>
            <p className="price-desc">For large organizations</p>
            <ul className="pricing-features">
              <li>✓ Everything in Pro</li>
              <li>✓ Custom integrations</li>
              <li>✓ Dedicated support</li>
              <li>✓ SSO & security</li>
            </ul>
            <button className="btn-secondary">Contact Sales</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}
