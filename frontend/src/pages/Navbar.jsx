import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
        <NavLink className="navbar-brand fw-bold text-warning fs-4" to="/">
          Códice Chugchilán
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
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/cultura">Cultura</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/comidas">Comidas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/actividades">Actividades</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/realidad">Realidad</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
