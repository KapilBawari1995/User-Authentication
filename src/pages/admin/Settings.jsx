import React, { useState } from "react";
import {
  Settings,
  Bell,
  Moon,
  Globe,
  Shield,
  Save,
} from "lucide-react";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="settings-page">

      {/* Header */}
      <div className="settings-header">
        <div>
          <h2>
            <Settings size={30} />
            Settings
          </h2>
          <p>Manage your account preferences and application settings.</p>
        </div>

        <button className="save-btn">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      {/* General Settings */}
      <div className="settings-card">

        <h3>General Settings</h3>

        <div className="setting-item">
          <div className="setting-left">
            <Bell size={20} />
            <div>
              <h4>Notifications</h4>
              <p>Receive task and project notifications.</p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        <div className="setting-item">
          <div className="setting-left">
            <Moon size={20} />
            <div>
              <h4>Dark Mode</h4>
              <p>Enable dark theme.</p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

      </div>

      {/* Language */}

      <div className="settings-card">

        <h3>Language</h3>

        <div className="setting-item">

          <div className="setting-left">
            <Globe size={20} />
            <div>
              <h4>Application Language</h4>
              <p>Select your preferred language.</p>
            </div>
          </div>

          <select className="setting-select">
            <option>English</option>
            <option>Hindi</option>
          </select>

        </div>

      </div>

      {/* Privacy */}

      <div className="settings-card">

        <h3>Privacy & Security</h3>

        <div className="setting-item">

          <div className="setting-left">
            <Shield size={20} />
            <div>
              <h4>Two-Factor Authentication</h4>
              <p>Improve account security.</p>
            </div>
          </div>

          <button className="enable-btn">
            Enable
          </button>

        </div>

      </div>

    </div>
  );
};

export default SettingsPage;