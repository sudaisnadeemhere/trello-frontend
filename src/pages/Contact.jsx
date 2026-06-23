import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useEffect, useState } from 'react';

export default function Contact() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user && token) {
      navigate('/board', { replace: true });
    }
  }, [user, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="contact-page page-transition">
      <nav className="intro-nav">
        <div className="nav-content">
          <h2 className="nav-logo">TaskFlow</h2>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/features" className="nav-link">Features</Link>
            <Link to="/contact" className="nav-link active">Contact</Link>
            <Link to="/login" className="nav-btn-login">Sign In</Link>
          </div>
        </div>
      </nav>

      <section className="contact-hero">
        <h1 className="page-title animate-fadeInDown">Get in Touch</h1>
        <p className="page-subtitle animate-fadeInUp">Have questions? We'd love to hear from you.</p>
      </section>

      <section className="contact-content">
        <div className="contact-info-grid">
          <div className="contact-info animate-fadeInUp">
            <div className="info-icon">📧</div>
            <h3>Email</h3>
            <p>support@taskflow.com</p>
            <p className="info-desc">We'll respond within 24 hours</p>
          </div>
          <div className="contact-info animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="info-icon">💬</div>
            <h3>Live Chat</h3>
            <p>Available 9AM - 6PM UTC</p>
            <p className="info-desc">Chat with our support team</p>
          </div>
          <div className="contact-info animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="info-icon">📍</div>
            <h3>Location</h3>
            <p>San Francisco, CA</p>
            <p className="info-desc">Based in the heart of tech</p>
          </div>
        </div>

        <div className="contact-form-container animate-fadeInUp">
          <div className="contact-form-wrapper">
            <h2>Send us a message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  rows="6"
                  required
                ></textarea>
              </div>

              {submitted && (
                <div className="success-message animate-fadeInUp">
                  ✓ Thank you! We'll get back to you soon.
                </div>
              )}

              <button type="submit" className="btn-primary btn-large" disabled={submitted}>
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="faq">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item animate-fadeInUp">
            <h3>How do I create an account?</h3>
            <p>Click on "Get Started Free" on our homepage and fill in your details. You'll have access to your task board immediately.</p>
          </div>
          <div className="faq-item animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h3>Is my data secure?</h3>
            <p>Yes! We use industry-standard encryption and security practices to keep your data safe and private.</p>
          </div>
          <div className="faq-item animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h3>Can I invite team members?</h3>
            <p>Absolutely! Pro plan users can invite unlimited team members to collaborate on tasks.</p>
          </div>
          <div className="faq-item animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h3>What payment methods do you accept?</h3>
            <p>We accept all major credit cards, PayPal, and wire transfers for enterprise plans.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}
