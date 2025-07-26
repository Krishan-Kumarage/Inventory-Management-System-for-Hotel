import React from "react";
import Clock from "./clockl"; // Ensure the Clock component is correctly implemented
import backgroundImage from '../assets/background.jpg'; // Import the background image
import Footer from "./ifooter"; 
import Header from "./iHeader";

function Home() {
  // Styles for the home page
  const homeStyle = {
    height: "100vh", // Full-screen height
    backgroundImage: `url(${backgroundImage})`, // Use the imported background image
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    position: "relative",
    color: "white",
    textAlign: "center",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay to improve text visibility
    zIndex: 1,
  };

  const contentStyle = {
    zIndex: 2, // Ensure text appears above overlay
    padding: "20px",
  };

  const clockContainerStyle = {
    position: "absolute",
    top: "20px", // Move clock closer to the top
    left: "50%", // Center horizontally
    transform: "translateX(-50%)", // Adjust to ensure it's centered
    zIndex: 2, // Make sure it's above the background and overlay
  };

  return (
    <div><Header />
    <div style={{ position: "relative" }}>
      
      <div style={overlayStyle}></div>
      <div style={homeStyle}>
        <div style={clockContainerStyle}>
          <Clock />
        </div>
        <div style={contentStyle}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>Inventory Admin</h1>
          <p style={{ fontSize: "24px", maxWidth: "600px", margin: "20px auto" }}>
            Manage more with our easy-to-use inventory system. Stay organized and efficient!
          </p>
          <button style={buttonStyle}>Get Started</button>
        </div>
      </div>
      <Footer/>
    </div>
    </div>
  );
}

// Button styles
const buttonStyle = {
  backgroundColor: "#4CAF50", // Green background
  color: "white", // White text
  border: "none", // No border
  borderRadius: "5px", // Rounded corners
  padding: "10px 20px", // Spacing
  fontSize: "18px", // Font size
  cursor: "pointer", // Pointer cursor on hover
  zIndex: 2, // Ensure button is above the overlay
  transition: "background-color 0.3s ease", // Smooth transition for hover effect
};

buttonStyle[':hover'] = {
  backgroundColor: "#45a049", // Darker green on hover
};

export default Home;
