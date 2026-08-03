import React from "react";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🛒 E-Commerce App</h2>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#2d3748",
    color: "#fff",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    margin: 0,
    fontSize: "20px",
  },
};