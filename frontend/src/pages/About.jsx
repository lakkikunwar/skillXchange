import { Users, BookOpen, CreditCard, MessageCircle, Sparkles, Shield, Heart, Globe } from "lucide-react";
import "./About.css";
import { Navbar } from "./Home";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="container">
            <h1 className="hero-title">
              Learn from Anyone.<br />
              Teach Anyone.<br />
              <span className="highlight">Grow Together.</span>
            </h1>
            <p className="hero-subtitle">
              SkillXchange is not just a platform — it's a movement to make knowledge free, fair, and accessible to everyone through peer-to-peer teaching.
            </p>
          </div>
        </section>

        {/* Our Vision */}
        <section className="vision-section">
          <div className="container">
            <div className="vision-grid">
              <div className="vision-text">
                <h2>Our Vision</h2>
                <p>
                  We believe that <strong>everyone has something valuable to teach</strong> and 
                  <strong> everyone has something new to learn</strong>. Traditional education is expensive, 
                  one-way, and often outdated. SkillXchange changes that.
                </p>
                <p>
                  Here, a designer in India can teach UI/UX to a developer in Brazil. 
                  A guitarist in Spain can mentor a beginner in Japan. 
                  A language enthusiast in Nigeria can practice with a native speaker in France — 
                  all using credits earned by teaching what they love.
                </p>
                <p className="highlight-quote">
                  Knowledge should flow freely. We’re just building the bridge.
                </p>
              </div>
              <div className="vision-image">
                <div className="globe-icon"><Globe size={180} /></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-section">
          <div className="container">
            <h2 className="section-title">How SkillXchange Works</h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-icon"><Users /></div>
                <h3>1. Add Your Skills</h3>
                <p>Tell the world what you’re great at — coding, cooking, yoga, guitar, Spanish, anything!</p>
              </div>
              <div className="step">
                <div className="step-icon"><BookOpen /></div>
                <h3>2. Teach & Earn Credits</h3>
                <p>Conduct live sessions via chat, video call, screen share and earn credits for every minute.</p>
              </div>
              <div className="step">
                <div className="step-icon"><CreditCard /></div>
                <h3>3. Spend Credits to Learn</h3>
                <p>Use your earned credits to book sessions from other experts in skills you want to master.</p>
              </div>
              <div className="step">
                <div className="step-icon"><Sparkles /></div>
                <h3>4. Grow Together</h3>
                <p>Teach → Earn → Learn → Teach again. A never-ending cycle of growth and sharing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="values-section">
          <div className="container">
            <h2 className="section-title">Our Core Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <Shield size={40} />
                <h4>Trust & Safety</h4>
                <p>Verified profiles, secure payments, and rating system.</p>
              </div>
              <div className="value-card">
                <Heart size={40} />
                <h4>Community First</h4>
                <p>No middlemen. 100% of credits go between learners and teachers.</p>
              </div>
              <div className="value-card">
                <MessageCircle size={40} />
                <h4>Real Human Connection</h4>
                <p>Live video, chat, and personal mentorship not pre-recorded courses.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / Complaints */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-card">
              <h2>We're Here to Help</h2>
              <p>
                Facing any issue? Have feedback? Want to report inappropriate behavior?
              </p>
              <p className="email-highlight">
                Email us at: 
                <a href="mailto:support@skillxchange.com"> support@skillxchange.com</a>
              </p>
              <p className="response-time">
                We reply within 24 hours — always.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="about-footer">
          <div className="container">
            <p>© 2025 SkillXchange. Made with <Heart size={18} className="heart" /> for learners & teachers worldwide.</p>
          </div>
        </footer>
      </div>
    </>
  );
}