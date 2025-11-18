import { useState } from "react";
import { Settings, Edit2, Camera, Star, Trophy, Calendar, Clock, Wallet, CheckCircle, Mail, Tag, User } from "lucide-react";
import "./Profile.css";
import { Navbar } from "./Home";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Alex Chen");
  const [tempName, setTempName] = useState(name);
  const [tempEmail, setTempEmail] = useState("alex.chen@skillxchange.com");
  const [tempGender, setTempGender] = useState("male");
  const [tempSubjects, setTempSubjects] = useState("JavaScript, React, Node.js, System Design");

  const [activeTab, setActiveTab] = useState("teaching");

  const user = {
    avatar: "https://i.pravatar.cc/300?img=1",
    name: "Alex Chen",
    email: "alex.chen@skillxchange.com",
    gender: "Male",
    subjects: ["programming"],
    badge: "diamond",
    rating: 4.9,
    reviews: 127,
    credits: 2847,
    taught: 89,
    learned: 156,
    earned: 68240,
  };

  const teachingHistory = [
    { date: "Nov 15", student: "Priya Sharma", skill: "React Hooks", duration: "60 min", credits: 80 },
    { date: "Nov 14", student: "Rahul Verma", skill: "Node.js API", duration: "45 min", credits: 60 },
  ];

  const learningHistory = [
    { date: "Nov 12", teacher: "Sarah Kim", skill: "Figma Design", duration: "90 min", credits: -135 },
    { date: "Nov 10", teacher: "Maria Lopez", skill: "Spanish Conversation", duration: "30 min", credits: -45 },
  ];

  const badgeInfo = {
    diamond: { name: "Diamond Mentor", color: "from-cyan-400 to-emerald-400" },
    platinum: { name: "Platinum Mentor", color: "from-purple-400 to-pink-400" },
    gold: { name: "Gold Mentor", color: "from-yellow-400 to-amber-500" },
    silver: { name: "Silver Mentor", color: "from-gray-300 to-gray-400" },
    bronze: { name: "Bronze Mentor", color: "from-orange-600 to-red-600" },
  };

  const currentBadge = badgeInfo[user.badge];

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="container">

          {/* Profile Header */}
          <div className="profile-header">

            <div className="avatar-container">
              <img src={user.avatar} alt={user.name} className="profile-avatar" />
              <div className="avatar-edit" onClick={() => setIsEditing(true)}><Camera size={18} /></div>
            </div>

            <button className="settings-btn" onClick={() => setIsEditing(true)} title="Edit Profile">
              <Settings size={22} />
            </button>

            <div className="profile-info">
              <div className="main-info-row">
                <h1>{name}</h1>
                <div className={`mentor-badge ${user.badge}`}> <Trophy size={20} /> <span>{currentBadge.name}</span> </div>
                <div className="rating"> <Star size={20} fill="currentColor" /> <span>{user.rating} <small>({user.reviews} reviews)</small></span> </div>
              </div>
              <div className="user-details">
                <div className="detail-item"> <Mail size={16} /> <span>{user.email}</span> </div>
                <div className="detail-item"> <User size={16} /> <span>{user.gender}</span> </div>
              </div>
              <div className="subjects-tags"> <Tag size={16} /> <div className="tags"> {user.subjects.map((sub, i) => (<span key={i} className="tag">{sub}</span>))} </div> </div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <Calendar size={28} />
              <div><p>Sessions Taught</p><strong>{user.taught}</strong></div>
            </div>
            <div className="stat-card">
              <CheckCircle size={28} />
              <div><p>Sessions Learned</p><strong>{user.learned}</strong></div>
            </div>
            <div className="stat-card">
              <Wallet size={28} />
              <div><p>Available Credits</p><strong>{user.credits.toLocaleString()}</strong></div>
            </div>
            <div className="stat-card highlight">
              <Trophy size={28} />
              <div><p>Credits Earned</p><strong>₹{user.earned.toLocaleString()}</strong></div>
            </div>
          </div>

          {/* History Tabs */}
          <div className="history-section">
            <div className="tab-header">
              <button className={activeTab === "teaching" ? "active" : ""} onClick={() => setActiveTab("teaching")}>
                Teaching History
              </button>
              <button className={activeTab === "learning" ? "active" : ""} onClick={() => setActiveTab("learning")}>
                Learning History
              </button>
            </div>

            <div className="history-table">
              {(activeTab === "teaching" ? teachingHistory : learningHistory).map((session, i) => (
                <div key={i} className="history-row">
                  <div className="session-info">
                    <p className="date">{session.date}</p>
                    <p className="person">{activeTab === "teaching" ? session.student : session.teacher}</p>
                    <p className="skill">{session.skill}</p>
                  </div>
                  <div className="session-meta">
                    <span className="duration"><Clock size={16} /> {session.duration}</span>
                    <span className={`credits ${session.credits > 0 ? "earned" : "spent"}`}>
                      {session.credits > 0 ? "+" : ""}{session.credits}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Edit Modal - Now with Gender, Email, Subjects */}
      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="edit-modal" onClick={e => e.stopPropagation()}>
            <h2>Edit Profile</h2>

            <div className="edit-field">
              <label>Name</label>
              <input type="text" value={tempName} onChange={e => setTempName(e.target.value)} />
            </div>

            <div className="edit-field">
              <label>Email</label>
              <input type="email" value={tempEmail} onChange={e => setTempEmail(e.target.value)} />
            </div>

            <div className="edit-field">
              <label>Gender</label>
              <select value={tempGender} onChange={e => setTempGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Prefer not to say</option>
              </select>
            </div>

            <div className="edit-field">
              <label>Subject You Teach</label>
              <input
                type="text"
                value={tempSubjects}
                onChange={e => setTempSubjects(e.target.value)}
                placeholder="e.g. Science, Programming, Maths"
              />
            </div>

            <div className="edit-field">
              <label>Profile Picture</label>
              <div className="upload-area">
                <Camera size={32} />
                <p>Click to upload new photo</p>
              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              <button className="save-btn" onClick={() => {
                setName(tempName);
                // You can add logic to save email, gender, and subject as needed
                setIsEditing(false);
              }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}