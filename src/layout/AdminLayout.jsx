import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/admin/Header";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
  return (
    <div style={styles.container}>

      {/* Header */}
      <Header />

      <div style={styles.body}>

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main style={styles.content}>
          <Outlet />
        </main>

      </div>

    </div>
  );
};


const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
  },

  body: {
    display: "flex",
  },

  content: {
    flex: 1,
    padding: "25px",
    marginLeft: "250px",
    minHeight: "calc(100vh - 70px)",
  },
};


export default AdminLayout;