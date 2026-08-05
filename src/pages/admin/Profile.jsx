import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Edit,
} from "lucide-react";

const Profile = () => {
  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <h2>My Profile</h2>

        <button className="edit-btn">
          <Edit size={18} />
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="profile-card">

        <div className="profile-left">

          <img
            src="https://i.pravatar.cc/180"
            alt="Profile"
            className="profile-image"
          />

          <h3>Kapil Bawari</h3>

          <p>React Developer</p>

          <span className="status">
            ● Online
          </span>

        </div>

        <div className="profile-right">

          <div className="info-box">

            <div className="info-item">
              <Mail size={18} />
              <span>kapil@gmail.com</span>
            </div>

            <div className="info-item">
              <Phone size={18} />
              <span>+91 9876543210</span>
            </div>

            <div className="info-item">
              <MapPin size={18} />
              <span>New Delhi, India</span>
            </div>

            <div className="info-item">
              <Briefcase size={18} />
              <span>Frontend Developer</span>
            </div>

            <div className="info-item">
              <Calendar size={18} />
              <span>Joined : August 2026</span>
            </div>

          </div>

        </div>

      </div>

      {/* Skills */}

      <div className="skill-card">

        <h3>Skills</h3>

        <div className="skills">

          <span>React JS</span>
          <span>Redux Toolkit</span>
          <span>JavaScript</span>
          <span>HTML5</span>
          <span>CSS3</span>
          <span>Node JS</span>
          <span>Express JS</span>
          <span>MongoDB</span>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="activity-card">

        <h3>Recent Activity</h3>

        <ul>

          <li>✅ Completed Login Module</li>

          <li>📋 Created 5 New Tasks</li>

          <li>👥 Added 2 New Team Members</li>

          <li>📁 Updated Task Management Project</li>

        </ul>

      </div>

    </div>
  );
};

export default Profile;