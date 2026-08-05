import React from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Calendar = () => {
  return (
    <div className="calendar-page">

      <div className="calendar-header">
        <div>
          <h2>Task Calendar</h2>
          <p>Manage deadlines and upcoming schedules.</p>
        </div>

        <button className="today-btn">
          Today
        </button>
      </div>

      <div className="calendar-stats">

        <div className="calendar-card">
          <CalendarDays size={35} />
          <h3>24</h3>
          <span>Total Events</span>
        </div>

        <div className="calendar-card">
          <Clock size={35} />
          <h3>8</h3>
          <span>Upcoming</span>
        </div>

        <div className="calendar-card">
          <AlertCircle size={35} />
          <h3>3</h3>
          <span>Due Today</span>
        </div>

        <div className="calendar-card">
          <CheckCircle size={35} />
          <h3>13</h3>
          <span>Completed</span>
        </div>

      </div>

      <div className="calendar-grid">

        <div className="calendar-box">

          <h3>August 2026</h3>

          <div className="days">

            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>

            {
              Array.from({ length: 31 }).map((_, i) => (
                <div
                  key={i}
                  className={i === 2 ? "active-day" : ""}
                >
                  {i + 1}
                </div>
              ))
            }

          </div>

        </div>

        <div className="event-box">

          <h3>Today's Schedule</h3>

          <div className="event">
            <h4>Dashboard Meeting</h4>
            <p>10:00 AM</p>
          </div>

          <div className="event">
            <h4>Login Module Review</h4>
            <p>12:30 PM</p>
          </div>

          <div className="event">
            <h4>Task Assignment</h4>
            <p>03:00 PM</p>
          </div>

          <div className="event">
            <h4>Project Discussion</h4>
            <p>05:00 PM</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Calendar;