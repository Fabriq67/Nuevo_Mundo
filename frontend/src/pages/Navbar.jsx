import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
        <NavLink className="navbar-brand" to="/">
          Codice Chugchilan
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/cultura">Cultura</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/comidas">Comidas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/realidad">Realidad</NavLink>
            </li>

            {/* ✅ Nuevo link de Iniciar Sesión */}
            <li className="nav-item">
              <NavLink className="nav-link custom-link" to="/login">Iniciar Sesión</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
