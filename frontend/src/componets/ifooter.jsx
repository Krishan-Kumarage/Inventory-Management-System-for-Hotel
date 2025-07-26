import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Social media icons


export default function Footers() {
    return (
        <footer className="footer bg-dark text-white py-4">
        <div className="container">
          <div className="row">
  
            {/* Footer About Section */}
            <div className="col-md-4">
              <h5>About Dhananjana Hotel</h5>
              <p>
                Experience the finest dining, exclusive offers, and unforgettable
                culinary moments with Dhananjana Hotel. We’re here to make your
                dining experience exceptional, from breakfast to dinner.
              </p>
            </div>
  
            {/* Footer Quick Links */}
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-white">Home</a></li>
                <li><a href="/menu" className="text-white">Menu</a></li>
                <li><a href="/offers" className="text-white">Special Offers</a></li>
                <li><a href="/contact" className="text-white">Contact Us</a></li>
                <li><a href="/about" className="text-white">About Us</a></li>
              </ul>
            </div>
  
            {/* Footer Social Media Section */}
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <div className="d-flex">
                <a href="https://www.facebook.com" className="text-white me-3" aria-label="Facebook">
                  <FaFacebook size={28} />
                </a>
                <a href="https://www.twitter.com" className="text-white me-3" aria-label="Twitter">
                  <FaTwitter size={28} />
                </a>
                <a href="https://www.instagram.com" className="text-white me-3" aria-label="Instagram">
                  <FaInstagram size={28} />
                </a>
                <a href="https://www.linkedin.com" className="text-white" aria-label="LinkedIn">
                  <FaLinkedin size={28} />
                </a>
              </div>
            </div>
  
          </div>
  
          {/* Footer Bottom Text */}
          <div className="text-center mt-4">
            <p>&copy; 2024 Dhananjana Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
    
  }