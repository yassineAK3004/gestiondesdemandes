// Layout.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoensaj from '../assets/logoensaj.png';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour toggler l'état de la barre de navigation
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img 
              src={logoensaj} 
              alt="Logo ENSAJ" 
              style={{ borderRadius: "50%", width: "40px", height: "40px", marginRight: "10px" }}
            />
            <span className="fw-bold">ENSAJ</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isOpen ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* Lien vers la page d'accueil */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">Accueil</Link>
              </li>

              {/* Lien vers la section Nos Services (avec scroll automatique) */}
              <li className="nav-item">
                <a className="nav-link text-white" href="#services">Nos Services</a>
              </li>

              {/* Lien vers la page de connexion */}
              <li className="nav-item">
                <Link 
                  className="nav-link btn btn-primary text-white px-4 py-2 rounded-pill shadow-sm" 
                  to="/login"
                >
                  Connexion
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="container mt-5 flex-grow-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-white text-center py-3 mt-5 border-top">
        <div className="container">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} <strong>ENSAJ</strong>. Tous droits réservés.
          </p>
          <p className="small">
            <Link className="text-white text-decoration-none" to="/privacy">Politique de confidentialité</Link> | 
            <Link className="text-white text-decoration-none ms-2" to="/terms">Conditions d'utilisation</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
  