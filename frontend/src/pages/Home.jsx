// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, idx) => {
      setTimeout(() => el.classList.add('visible'), 150 * idx);
    });
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="fade-in">Plateforme de Gestion des Demandes Étudiantes</h1>
        <p className="fade-in">Une solution centralisée pour gérer facilement les demandes.</p>
        <Link to="/login" className="btn fade-in">Se Connecter</Link>
      </section>

       

      {/* Features */}
      <section id="services" className="features">
        <div className="container">
          <h2 className="text-center mb-5 fade-in">Fonctionnalités Principales</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card p-4 shadow-sm hover-card">
                <h5>Soumettre une Demande</h5>
                <p>Les étudiants peuvent soumettre leurs demandes rapidement.</p>
                <Link to="/login" className="btn btn-outline-primary mt-auto">Soumettre →</Link>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card p-4 shadow-sm hover-card">
                <h5>Gestion des Étudiants</h5>
                <p>L’administrateur peut ajouter ou supprimer des comptes étudiants.</p>
                <Link to="/login" className="btn btn-outline-success mt-auto">Admin →</Link>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card p-4 shadow-sm hover-card">
                <h5>Suivi des Demandes</h5>
                <p>Toutes les demandes sont centralisées pour une réponse rapide.</p>
                <Link to="/login" className="btn btn-outline-info mt-auto">Voir Plus →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 