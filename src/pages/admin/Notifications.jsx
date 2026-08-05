import React from "react";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
} from "lucide-react";

const Notifications = () => {
  return (
    <div className="notifications-page">

      <div className="notification-header">
        <div>
          <h2>Notifications</h2>
          <p>Stay updated with your latest activities.</p>
        </div>

        <button className="mark-btn">
          Mark All as Read
        </button>
      </div>

      <div className="notification-list">

        <div className="notification-card unread">
          <div className="notification-icon success">
            <CheckCircle size={22} />
          </div>

          <div className="notification-content">
            <h4>Task Completed</h4>
            <p>Kapil completed the Login Authentication task.</p>
            <span>2 minutes ago</span>
          </div>
        </div>

        <div className="notification-card unread">
          <div className="notification-icon warning">
            <AlertTriangle size={22} />
          </div>

          <div className="notification-content">
            <h4>Deadline Reminder</h4>
            <p>Project Dashboard UI is due tomorrow.</p>
            <span>15 minutes ago</span>
          </div>
        </div>

        <div className="notification-card">
          <div className="notification-icon info">
            <Info size={22} />
          </div>

          <div className="notification-content">
            <h4>New User Added</h4>
            <p>Rahul joined your project team.</p>
            <span>1 hour ago</span>
          </div>
        </div>

        <div className="notification-card">
          <div className="notification-icon clock">
            <Clock size={22} />
          </div>

          <div className="notification-content">
            <h4>Meeting Scheduled</h4>
            <p>Project meeting scheduled for 4:00 PM today.</p>
            <span>Today</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Notifications;