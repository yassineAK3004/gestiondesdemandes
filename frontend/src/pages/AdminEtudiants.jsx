import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminEtudiants() {
    const [showModal, setShowModal] = useState(false);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [confirmMotDePasse, setConfirmMotDePasse] = useState('');
    const [erreur, setErreur] = useState('');
    const [etudiants, setEtudiants] = useState([]);

    // 🔁 Charge les étudiants au montage du composant
    useEffect(() => {
        const fetchEtudiants = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get('http://localhost:8000/api/utilisateurs', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setEtudiants(res.data); // ✅ Stocke les étudiants reçus du backend

            } catch (err) {
                console.error("Erreur lors du chargement des étudiants", err);
            }
        };

        fetchEtudiants();
    }, []);

    // ✅ Ajout d’un étudiant
    const handleAjout = async () => {
        if (!nom || !prenom || !email || !motDePasse || !confirmMotDePasse) {
            setErreur('Tous les champs sont obligatoires');
            return;
        }

        if (motDePasse !== confirmMotDePasse) {
            setErreur('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const res = await axios.post('http://localhost:8000/api/utilisateurs', {
                nom,
                prenom,
                email,
                mot_de_passe: motDePasse,
                role_id: 1
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setEtudiants([res.data, ...etudiants]);
            resetForm();

        } catch (err) {
            console.error("Erreur complète :", err);

            if (err.response?.data?.errors) {
                const firstError = Object.values(err.response.data.errors)[0][0];
                setErreur(firstError);
            } else if (err.response?.data?.message === 'CSRF token mismatch.') {
                setErreur('Session expirée. Veuillez vous reconnecter.');
            } else if (err.response?.data?.error) {
                setErreur(err.response.data.error);
            } else {
                setErreur("Erreur lors de l'ajout");
            }
        }
    };

    // 🗑️ Supprime un étudiant côté React + backend
    const handleSuppression = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
            axios.delete(`http://localhost:8000/api/utilisateurs/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(() => {
                    setEtudiants(etudiants.filter(e => e.id !== id));
                })
                .catch((err) => {
                    alert("Impossible de supprimer cet étudiant");
                });
        }
    };

    // 🔄 Réinitialise le formulaire
    const resetForm = () => {
        setNom('');
        setPrenom('');
        setEmail('');
        setMotDePasse('');
        setConfirmMotDePasse('');
        setErreur('');
        setShowModal(false);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Gestion des Étudiants</h2>

            {/* Bouton Ajouter */}
             <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-success shadow-sm px-4 py-2 d-flex align-items-center"
                    style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                >
                    <i className="bi bi-person-add me-2 fs-5"></i>
                    Ajouter un étudiant
                </button>
                <div
                    className="bg-light border rounded-pill px-4 py-2 d-flex align-items-center shadow-sm"
                    style={{ fontSize: '1.05em', minWidth: 200 }}
                >
                    <i className="bi bi-people-fill me-2 text-primary fs-5"></i>
                    {etudiants.length === 0 && "Aucun étudiant"}
                    {etudiants.length === 1 && "1 étudiant"}
                    {etudiants.length > 1 && `${etudiants.length} étudiants`}
                </div>
            </div>
            <table className="table-striped table-bordered table-hover table">
                
                <thead className="bg-light">
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {etudiants.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center text-muted">
                                Aucun étudiant ajouté
                            </td>
                        </tr>
                    )}

                    {etudiants.map((e) => (
                        <tr key={e.id}>
                            <td>{e.nom} {e.prenom}</td>
                            <td>{e.email}</td>
                            <td className="text-end">
                                <button
                                    onClick={() => handleSuppression(e.id)}
                                    className="btn btn-sm btn-outline-danger"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modale d’ajout */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter un Étudiant</h5>
                                <button type="button" className="btn-close" onClick={resetForm}></button>
                            </div>
                            <div className="modal-body">
                                {erreur && <div className="alert alert-danger">{erreur}</div>}
                                <div className="mb-3">
                                    <label className="form-label">Nom</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Prénom</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={prenom}
                                        onChange={(e) => setPrenom(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={motDePasse}
                                        onChange={(e) => setMotDePasse(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirmer le mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={confirmMotDePasse}
                                        onChange={(e) => setConfirmMotDePasse(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={resetForm}>Annuler</button>
                                <button className="btn btn-success" onClick={handleAjout}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}