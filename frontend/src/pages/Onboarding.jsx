import { useState } from "react";
import { Camera, User, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import "./Onboarding.css";

export default function Onboarding() {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [profilePic, setProfilePic] = useState("https://i.pravatar.cc/300?img=68");

  const [role, setRole] = useState(""); // learn, teach, both
  const [learningInterests, setLearningInterests] = useState([]);
  const [teachingSkills, setTeachingSkills] = useState([]);

  const subjects = ["Programming", "Science", "Maths", "Music", "Art", "Design", "Languages", "Business", "Cooking", "Photography"];

  const toggleSelection = (arr, setArr, value) => {
    setArr(arr.includes(value) 
      ? arr.filter(item => item !== value)
      : [...arr, value]
    );
  };

  const handleNext = () => {
    if (step === 1 && name && gender) setStep(2);
    if (step === 2 && role) setStep(3);
  };

  const handleSave = () => {
    // Save to backend or localStorage + redirect
    alert("Profile setup complete! Welcome to SkillXchange 🎉");
    window.location.href = "/login-success";
  };

  const isStep1Valid = name && gender;
  const isStep2Valid = role !== "";
  const isStep3Valid = 
    (role === "learn" && learningInterests.length > 0) ||
    (role === "teach" && teachingSkills.length > 0) ||
    (role === "both" && learningInterests.length > 0 && teachingSkills.length > 0);

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        <div style={{color: 'lime', textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.2rem'}}>Onboarding page loaded successfully</div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        <h1 className="onboarding-title">Welcome to SkillXchange!</h1>
        <p className="onboarding-subtitle">Let's set up your profile in 3 quick steps</p>

        {/* STEP 1: Name, Gender, Photo */}
        {step === 1 && (
          <div className="step-content">
            <div className="profile-pic-section">
              <div className="avatar-upload">
                <img src={profilePic} alt="Profile" className="avatar-preview" />
                <label className="upload-overlay" htmlFor="profile-upload">
                  <Camera size={28} />
                </label>
                <input id="profile-upload" type="file" accept="image/*" className="file-input" onChange={(e) => {
                  if (e.target.files[0]) {
                    setProfilePic(URL.createObjectURL(e.target.files[0]));
                  }
                }} />
              </div>
              <p>Click photo to upload <span className="required">*</span></p>
            </div>

            <div className="input-group">
              <label htmlFor="onboarding-name">Full Name <span className="required">*</span></label>
              <input
                id="onboarding-name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="input-group">
              <label>Gender <span className="required">*</span></label>
              <div className="gender-options">
                <button type="button" className={gender === "male" ? "selected" : ""} onClick={() => setGender("male")}>Male</button>
                <button type="button" className={gender === "female" ? "selected" : ""} onClick={() => setGender("female")}>Female</button>
                <button type="button" className={gender === "other" ? "selected" : ""} onClick={() => setGender("other")}>Other</button>
                <button type="button" className={gender === "na" ? "selected" : ""} onClick={() => setGender("na")}>Prefer not to say</button>
              </div>
            </div>

            <button className="next-btn" onClick={handleNext} disabled={!isStep1Valid}>
              Next <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* STEP 2: Role Selection */}
        {step === 2 && (
          <div className="step-content">
            <h2 className="onboarding-step-title">What brings you here today?</h2>

            <div className="role-cards">
              <div
                className={`role-card ${role === "learn" ? "selected" : ""}`}
                onClick={() => setRole("learn")}
              >
                <BookOpen size={48} />
                <h3>I want to Learn</h3>
                <p>Find mentors and master new skills</p>
              </div>

              <div
                className={`role-card ${role === "teach" ? "selected" : ""}`}
                onClick={() => setRole("teach")}
              >
                <GraduationCap size={48} />
                <h3>I want to Teach</h3>
                <p>Share your knowledge and earn credits</p>
              </div>

              <div
                className={`role-card both ${role === "both" ? "selected" : ""}`}
                onClick={() => setRole("both")}
              >
                <div className="both-icons">
                  <BookOpen size={32} />
                  <GraduationCap size={32} />
                </div>
                <h3>I want to do Both</h3>
                <p>Learn new things and teach what I know</p>
              </div>
            </div>

            <div className="nav-buttons">
              <button className="back-btn" onClick={() => setStep(1)}>Back</button>
              <button className="next-btn" onClick={() => setStep(3)} disabled={!isStep2Valid}>
                Next <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Interests / Skills */}
        {step === 3 && (
          <div className="step-content">
            <h2 className="onboarding-step-title">Tell us about your interests</h2>

            {(role === "learn" || role === "both") && (
              <div className="interest-section">
                <h3>I want to learn</h3>
                <div className="subjects-grid">
                  {subjects.map(sub => (
                    <button
                      key={sub}
                      type="button"
                      className={`subject-btn ${learningInterests.includes(sub) ? "selected" : ""}`}
                      onClick={() => toggleSelection(learningInterests, setLearningInterests, sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(role === "teach" || role === "both") && (
              <div className="interest-section">
                <h3>I can teach</h3>
                <div className="subjects-grid">
                  {subjects.map(sub => (
                    <button
                      key={sub}
                      type="button"
                      className={`subject-btn ${teachingSkills.includes(sub) ? "selected" : ""}`}
                      onClick={() => toggleSelection(teachingSkills, setTeachingSkills, sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="nav-buttons">
              <button className="back-btn" onClick={() => setStep(2)}>Back</button>
              <button className="save-btn" onClick={handleSave} disabled={!isStep3Valid}>
                Complete Setup
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}