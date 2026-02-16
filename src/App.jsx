import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Globe, Github } from 'lucide-react';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="logo"
          >
            DevSpace
          </motion.div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            href="https://github.com/fOxXx-11830"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <Github size={24} />
          </motion.a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-title">
                Build <span className="highlight-1">Faster</span>.<br />
                Scale <span className="highlight-2">Better</span>.
              </h1>
              <p className="hero-description">
                A modern React template designed for developers who want to ship beautiful websites without the hassle.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary">
                  Get Started
                  <ArrowRight size={20} />
                </button>
                <button className="btn btn-secondary">
                  View Source
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features">
          <div className="features-grid">
            <FeatureCard
              icon={<Zap size={32} color="#facc15" />}
              title="Lightning Fast"
              description="Built on Vite for instant server start and lightning fast HMR."
              delay={0.1}
            />
            <FeatureCard
              icon={<Code size={32} color="#60a5fa" />}
              title="Modern Stack"
              description="React, Framer Motion, and CSS Modules ready out of the box."
              delay={0.2}
            />
            <FeatureCard
              icon={<Globe size={32} color="#4ade80" />}
              title="SEO Optimized"
              description="Designed with best practices for search engine visibility."
              delay={0.3}
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 DevSpace. Built for creators.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="feature-card"
    >
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">
        {description}
      </p>
    </motion.div>
  );
}

export default App;
