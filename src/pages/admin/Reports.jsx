import React from "react";
import {
  BarChart3,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";

const Reports = () => {
  return (
    <div className="reports-page">

      <div className="reports-header">

        <div>
          <h2>Reports & Analytics</h2>
          <p>Track project and task performance.</p>
        </div>

      </div>

      <div className="report-cards">

        <div className="report-card">
          <BarChart3 size={35} />
          <h3>180</h3>
          <span>Total Tasks</span>
        </div>

        <div className="report-card">
          <CheckCircle size={35} />
          <h3>135</h3>
          <span>Completed</span>
        </div>

        <div className="report-card">
          <Clock size={35} />
          <h3>45</h3>
          <span>Pending</span>
        </div>

        <div className="report-card">
          <Users size={35} />
          <h3>24</h3>
          <span>Employees</span>
        </div>

      </div>

      <div className="analytics-box">

        <h3>
          <TrendingUp size={22} />
          Monthly Performance
        </h3>

        <div className="chart-placeholder">

          <div style={{height:"70%"}}></div>
          <div style={{height:"45%"}}></div>
          <div style={{height:"85%"}}></div>
          <div style={{height:"60%"}}></div>
          <div style={{height:"95%"}}></div>
          <div style={{height:"75%"}}></div>

        </div>

      </div>

      <div className="summary-box">

        <h3>Performance Summary</h3>

        <ul>
          <li>✅ Task Completion Rate : 75%</li>
          <li>📈 Productivity Increased : 15%</li>
          <li>👨‍💻 Active Employees : 24</li>
          <li>📁 Running Projects : 8</li>
        </ul>

      </div>

    </div>
  );
};

export default Reports;