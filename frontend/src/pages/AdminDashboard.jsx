import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const utilisateur = JSON.parse(localStorage.getItem("user")) || {
    nom: "admin",
    prenom: "",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <style>{`
        /* Bordure gauche colorée */
        .border-left-primary {
          border-left: 4px solid #0d6efd !important;
        }
        .border-left-info {
          border-left: 4px solid #0dcaf0 !important;
        }

        /* Effet hover élégant sur les cartes */
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .hover-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(13, 110, 253, 0.3);
        }

        /* Lien étiré (pour cliquer n'importe où sur la carte) */
        .stretched-link::after {
          position: absolute;
          inset: 0;
          z-index: 1;
          content: "";
        }

        /* Espacement icône bouton déconnexion */
        .btn.d-flex i {
          font-size: 1.1rem;
        }

        /* Responsive tweaks */
        @media (max-width: 576px) {
          .hover-card {
            transform: none !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          }
        }
      `}</style>

      <div className="container mt-5">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-5">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold text-primary fs-3" to="/admin">
              ENSAJ
            </Link>

            <div className="d-flex align-items-center ms-auto gap-3">
              <span className="fs-5">
                Bonjour, <strong>{utilisateur.nom} {utilisateur.prenom}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                title="Se déconnecter"
              >
                <i className="bi bi-box-arrow-right"></i> Se déconnecter
              </button>
            </div>
          </div>
        </nav>

        {/* Contenu principal */}
        <div className="text-center mb-5">
          <h2 className="mb-2">Tableau de bord administrateur</h2>
          <p className="text-secondary fs-5">
            Gérez les étudiants et leurs demandes ici
          </p>
        </div>

        {/* Cartes des actions */}
        <div className="row justify-content-center g-5">
          <div className="col-md-5">
            <div className="card border-left-primary shadow-sm h-100 py-3 hover-card">
              <div className="card-body d-flex align-items-center gap-3 position-relative">
                <div className="flex-grow-1">
                  <Link
                    to="/admin/etudiants"
                    className="stretched-link text-decoration-none"
                  >
                    <h4 className="text-primary mb-1">Gérer les Étudiants</h4>
                    <p className="text-muted mb-0 fs-6">
                      Ajouter, modifier ou supprimer des comptes étudiants
                    </p>
                  </Link>
                </div>
                <i className="bi bi-person-plus fs-1 text-primary"></i>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card border-left-info shadow-sm h-100 py-3 hover-card">
              <div className="card-body d-flex align-items-center gap-3 position-relative">
                <div className="flex-grow-1">
                  <Link
                    to="/admin/demandes"
                    className="stretched-link text-decoration-none"
                  >
                    <h4 className="text-info mb-1">Gérer les Demandes</h4>
                    <p className="text-muted mb-0 fs-6">
                      Voir et répondre aux demandes des étudiants
                    </p>
                  </Link>
                </div>
                <i className="bi bi-envelope fs-1 text-info"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
