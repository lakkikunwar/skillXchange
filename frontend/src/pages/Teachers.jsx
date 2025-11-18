import { useState } from "react";
import { MessageCircle, Star, Clock, CheckCircle } from "lucide-react";
import "./Teachers.css";
import { Navbar } from "./Home";

export default function Teachers() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [message, setMessage] = useState("");

  const teachers = [
    {
      id: 1,
      name: "Sarah Kim",
      skill: "UI/UX Design Expert",
      rating: 5.0,
      reviews: 89,
      price: 100,
      bio: "Helping designers level up since 2020",
      status: "available",
      languages: "English, Korean",
      img: "https://i.pravatar.cc/300?img=2",
    },
    {
      id: 2,
      name: "Rahul Patel",
      skill: "Python & Machine Learning",
      rating: 4.8,
      reviews: 203,
      price: 70,
      bio: "Taught 500+ students worldwide",
      status: "live",
      languages: "English, Hindi",
      img: "https://i.pravatar.cc/300?img=3",
    },
    {
      id: 3,
      name: "Maria Lopez",
      skill: "Native Spanish Teacher",
      rating: 4.9,
      reviews: 156,
      price: 65,
      bio: "Fun & effective conversation classes",
      status: "available",
      languages: "Spanish, English",
      img: "https://i.pravatar.cc/300?img=5",
    },
    {
      id: 4,
      name: "Alex Chen",
      skill: "JavaScript React Master",
      rating: 4.9,
      reviews: 127,
      price: 80,
      bio: "Full-stack developer mentor",
      status: "available",
      languages: "English, Mandarin",
      img: "https://i.pravatar.cc/300?img=1",
    },
    {
      id: 5,
      name: "Emily Carter",
      skill: "Digital Marketing Guru",
      rating: 4.7,
      reviews: 110,
      price: 90,
      bio: "Grow your brand with proven strategies",
      status: "available",
      languages: "English",
      img: "https://i.pravatar.cc/300?img=1",
    },
    {
      id: 6,
      name: "Ivan Petrov",
      skill: "Data Science Specialist",
      rating: 4.8,
      reviews: 95,
      price: 85,
      bio: "Unlock insights from your data",
      status: "live",
      languages: "English, Russian",
      img: "https://i.pravatar.cc/300?img=2",
    },
    {
      id: 7,
      name: "Linda Nguyen",
      skill: "Yoga & Wellness Coach",
      rating: 4.9,
      reviews: 120,
      price: 60,
      bio: "Balance mind and body",
      status: "available",
      languages: "English, Vietnamese",
      img: "https://i.pravatar.cc/300?img=4",
    },
    {
      id: 8,
      name: "Mohammed Al-Farsi",
      skill: "Arabic Language Expert",
      rating: 5.0,
      reviews: 80,
      price: 75,
      bio: "Native speaker, fun lessons",
      status: "available",
      languages: "Arabic, English",
      img: "https://i.pravatar.cc/300?img=5",
    },
  ];

  const openMessageModal = (teacher) => {
    setSelectedTeacher(teacher);
    setMessage("");
  };

  const closeModal = () => setSelectedTeacher(null);

  const sendMessage = () => {
    alert(`Message sent to ${selectedTeacher.name}!`);
    closeModal();
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="teachers-page">
        <div className="container">
          <h1 className="page-title">Find Your Perfect Teacher</h1>

          {/* Horizontal Filters */}
          <div className="filters-bar">
            <div className="filter-group">
              <label>Category</label>
              <select>
                <option>All Categories</option>
                <option>Programming</option>
                <option>Design</option>
                <option>Languages</option>
                <option>Music</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Rating</label>
              <select>
                <option>Any Rating</option>
                <option>4.5 & up</option>
                <option>4.8 & up</option>
              </select>
            </div>
            <div className="filter-group search-group">
              <label>Search</label>
              <input
                type="text"
                placeholder="Search by name..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div className="teachers-layout">

            {/* Teachers List */}
            <div className="teachers-grid">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="teacher-card-modern">
                  <div className="card-img-wrapper">
                    <img src={teacher.img} alt={teacher.name} className="card-img" />
                  </div>
                  <div className="card-body">
                    <h2 className="card-title">{teacher.name}</h2>
                    <p className="card-skill">{teacher.skill}</p>
                    <p className="card-desc">{teacher.bio}</p>
                    <div className="card-meta">
                      <span className="card-rating">
                        <Star size={16} style={{ verticalAlign: 'middle', color: '#fbbf24' }} /> {teacher.rating} ({teacher.reviews} reviews)
                      </span>
                      <span className="card-languages">{teacher.languages}</span>
                    </div>
                    <button className="card-btn" onClick={() => openMessageModal(teacher)}>
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {selectedTeacher && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Message {selectedTeacher.name}</h2>
            <textarea
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="6"
            />
            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="send-btn" onClick={sendMessage} disabled={!message.trim()}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}