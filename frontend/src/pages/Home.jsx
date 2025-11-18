import { Search, Star, Users, PlayCircle } from "lucide-react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Navbar() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50 || window.scrollY < lastScrollY) {
        setShowNav(true);
      } else if (window.scrollY > lastScrollY) {
        setShowNav(false);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar${showNav ? "" : " navbar--hidden"}`}>
      <div className="nav-container">
        <Link to="/login-success" className="logo">
          SkillXchange
        </Link>
        <div className="nav-links">
          <Link to="/teachers">Teachers</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/about">About</Link>
          <Link to="/pricing">Pricing</Link>
        </div>
        <Link to="/profile" className="profile-btn">
          <span className="profile-initial">P</span>
        </Link>
      </div>
    </nav>
  );
}

export default function Home() {
  const categories = ["Photography", "Coding", "Design", "Marketing", "Music", "Cooking", "Yoga", "Languages"];
  
  const featuredTeachers = [
    { name: "Mike Martin", skill: "JavaScript Expert", rating: 4.9, img: "https://i.pravatar.cc/150?img=1" },
    { name: "Anjali Gupta", skill: "UI/UX Design Pro", rating: 5.0, img: "https://i.pravatar.cc/150?img=2" },
    { name: "Rahul Sharma", skill: "Python & Data Science", rating: 4.8, img: "https://i.pravatar.cc/150?img=3" },
    { name: "Priya Singh", skill: "Digital Marketing", rating: 4.9, img: "https://i.pravatar.cc/150?img=5" },
  ];

  const testimonials = [
    { quote: "Best platform to both learn and earn! I taught 20+ students and bought a guitar course with my credits.", author: "Arjun Mehta" },
    { quote: "The live video sessions are smooth and the credit system is genius. Finally a fair way to exchange knowledge!", author: "Neha Kapoor" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">SkillXchange</h1>
          <div className="nav-links">
            <Link to="/teachers">Teachers</Link>
            <a href="#">Chat</a>
            <a href="#">About</a>
            <a href="#">Pricing</a>
            <a href="#">Contact</a>
          </div>
          <button className="profile-btn">
            <span className="profile-initial">P</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Unlock Your Potential<br />
            <span className="highlight">with Expert-Led Courses</span>
          </h1>
          <p>Join thousands of learners mastering new skills through our curated selection of online classes.</p>
          
          <div className="search-bar">
            <input type="text" placeholder="What do you want to learn today?" />
            <button>
              <Search size={24} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step-card">
              <div className="icon-circle"><Search size={40} /></div>
              <h3>Find Fiver</h3>
              <p>Search and discover courses from expert instructors in any field you want to master.</p>
            </div>
            <div className="step-card highlight-card">
              <div className="icon-circle white"><Users size={40} /></div>
              <h3>Enroll</h3>
              <p>Join live sessions, ask questions, and learn at your own pace with real-time interaction.</p>
            </div>
            <div className="step-card">
              <div className="icon-circle"><PlayCircle size={40} /></div>
              <h3>Start Learning</h3>
              <p>Watch recordings, complete assignments, and earn credits by teaching others too!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      <section className="featured-teachers">
        <div className="container">
          <h2>Featured Teachers</h2>
          <p className="subtitle">Learn from the best in the industry</p>
          <div className="teachers-grid">
            {featuredTeachers.map((teacher) => (
              <div key={teacher.name} className="teacher-card">
                <img src={teacher.img} alt={teacher.name} />
                <div className="teacher-info">
                  <h3>{teacher.name}</h3>
                  <p className="skill">{teacher.skill}</p>
                  <div className="rating">
                    <Star size={18} fill="currentColor" />
                    <span>{teacher.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>Testimonials</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <p className="quote">"{t.quote}"</p>
                <p className="author">- {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 SkillXchange. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}