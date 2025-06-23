import React from "react";
import "./Footer.css";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <p>Códice Chugchilán © 2025</p>
      <a
        href="https://www.instagram.com/nuevomundochugchilan"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-icon"
      >
        <FaInstagram size={24} />
      </a>
    </footer>
  );
}
