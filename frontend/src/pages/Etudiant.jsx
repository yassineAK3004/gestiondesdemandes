import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Etudiant() {
  const navigate = useNavigate();

  // Memoisation de l'utilisateur pour éviter recréation à chaque rendu
  const utilisateur = useMemo(() => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }, []);

  const token = localStorage.getItem("token");

  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [fichier, setFichier] = useState(null);
  const [erreur, setErreur] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Chargement des demandes
  useEffect(() => {
    if (!utilisateur || !token) {
      navigate("/login");
      return;
    }

    const fetchDemandes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/demandes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const mesDemandes = res.data.filter(
          (d) => d.utilisateur_id === utilisateur.id
        );
        setDemandes(mesDemandes);
      } catch (err) {
        console.error("Erreur lors du chargement des demandes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, [navigate, token, utilisateur?.id]); // dépendance sur id utilisateur uniquement (primitive)

  // Soumission nouvelle demande
  const handleSubmitDemande = async () => {
    if (!type.trim() || !description.trim()) {
      setErreur("Type et description sont obligatoires");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("description", description);
      formData.append("utilisateur_id", utilisateur.id);
      if (fichier) formData.append("fichier", fichier);

      const res = await axios.post(
        "http://localhost:8000/api/demandes",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDemandes([res.data, ...demandes]);
      setType("");
      setDescription("");
      setFichier(null);
      setErreur("");
      setShowModal(false);
    } catch (err) {
      setErreur(
        err.response?.data?.message || "Erreur lors de l'envoi de la demande"
      );
    }
  };

  // Suppression demande
  const handleDeleteDemande = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette demande ?")) return;

    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:8000/api/demandes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDemandes(demandes.filter((d) => d.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  // Déconnexion
  const handleLogout = () => {
    axios
      .post(
        "http://localhost:8000/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .finally(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <div>Chargement...</div>
      </div>
    );
  }

  const containerStyle = {
    maxWidth: "900px",
    margin: "auto",
    padding: "0 15px 80px",
  };

  const footerStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "#f8f9fa",
    borderTop: "1px solid #dee2e6",
    textAlign: "center",
    padding: "10px 0",
    fontSize: "0.9rem",
    color: "#6c757d",
    zIndex: 1000,
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 shadow-sm fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h4 className="mb-0 ms-3">Espace Étudiant</h4>
          <div className="d-flex align-items-center gap-3 me-3 flex-wrap">
            <span style={{ whiteSpace: "nowrap" }}>
              Bonjour, <strong>{utilisateur.nom} {utilisateur.prenom}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm"
              title="Se déconnecter"
              style={{ whiteSpace: "nowrap" }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      {/* Pour éviter que le contenu soit sous navbar fixe */}
      <div style={{ height: "70px" }}></div>

      <div style={containerStyle} className="my-4">
        {/* Bouton ajout */}
        <div className="d-flex justify-content-center mb-4">
          <button
            className="btn btn-success btn-lg shadow"
            onClick={() => setShowModal(true)}
            style={{ minWidth: 220 }}
          >
            + Ajouter une demande
          </button>
        </div>

        {/* Liste demandes */}
        <section>
          <h5 className="mb-3 text-center">Vos Demandes</h5>
          {demandes.length === 0 ? (
            <p className="text-muted text-center fst-italic">
              Aucune demande trouvée.
            </p>
          ) : (
            <ul className="list-group shadow-sm">
              {demandes.map((d) => (
                <li
                  key={d.id}
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  style={{ gap: "10px" }}
                >
                  <div style={{ minWidth: "60%", wordBreak: "break-word" }}>
                    <strong className="text-primary">{d.type}</strong> : {d.description}
                  </div>

                  <span
                    className={`badge rounded-pill ${
                      d.statut === "en_attente"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {d.statut === "en_attente" ? "En attente" : "Traitée"}
                  </span>

                  <button
                    className="btn btn-sm btn-danger ms-3"
                    onClick={() => handleDeleteDemande(d.id)}
                    disabled={deletingId === d.id}
                    title="Supprimer la demande"
                  >
                    {deletingId === d.id ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Supprimer"
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Modal création demande */}
        {showModal && (
          <>
            <div
              className="modal-backdrop fade show"
              onClick={() => setShowModal(false)}
            ></div>

            <div
              className="modal d-block"
              tabIndex="-1"
              role="dialog"
              aria-modal="true"
              style={{ overflowY: "auto" }}
            >
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content shadow-lg rounded-3">
                  <div className="modal-header">
                    <h5 className="modal-title">Nouvelle Demande</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Fermer"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {erreur && (
                      <div className="alert alert-danger small mb-3">{erreur}</div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Type de la demande
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Ex : Certificat, dérogation..."
                        autoFocus
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Description</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Entrez votre message ici"
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Joindre un fichier (facultatif)
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFichier(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div className="modal-footer d-flex justify-content-between">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Annuler
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmitDemande}>
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <footer style={footerStyle}>
        &copy; {new Date().getFullYear()} Espace Étudiant - Application de gestion des demandes ENSAJ
      </footer>
    </>
  );
}
