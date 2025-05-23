import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDemandes() {
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erreur, setErreur] = useState('');

    // États pour la modale d’ajout (facultatif si tu veux ajouter des demandes côté admin)
    const [showPopup, setShowPopup] = useState(false);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [selectedStatut, setSelectedStatut] = useState('en_attente');

    // 🔁 Charge les demandes au montage du composant
    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get('http://localhost:8000/api/demandes', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setDemandes(res.data);
                setLoading(false);

            } catch (err) {
                console.error("Erreur lors du chargement des demandes", err);
                setErreur("Impossible de charger les demandes");
                setLoading(false);
            }
        };

        fetchDemandes();
    }, []);

    // 🆕 Mets à jour le statut d'une demande
    const handleUpdateStatut = async (id, nouveauStatut) => {
        try {
            const token = localStorage.getItem('token');

            await axios.put(`http://localhost:8000/api/demandes/${id}/statut`, {
                statut: nouveauStatut
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setDemandes(
                demandes.map(d =>
                    d.id === id ? { ...d, statut: nouveauStatut } : d
                )
            );

        } catch (err) {
            alert("Échec de mise à jour du statut");
        }
    };

    // ✅ Soumet une nouvelle demande (optionnel côté admin)
    const handleAjout = async () => {
        if (!type || !description) {
            setErreur('Type et description sont obligatoires');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const res = await axios.post('http://localhost:8000/api/demandes', {
                type,
                description,
                fichier: null,
                utilisateur_id: 1 // Peut venir de localStorage ou login
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setDemandes([res.data, ...demandes]);
            setType('');
            setDescription('');
            setSelectedStatut('en_attente');
            setShowPopup(false);

        } catch (err) {
            console.error("Erreur lors de l'envoi", err);
            setErreur("Erreur lors de l'ajout");
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Chargement des demandes...</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Gestion des Demandes</h2>

            {/* Bouton Ajouter (facultatif selon tes besoins) */}
            {/* <button onClick={() => setShowPopup(true)} className="btn btn-primary mb-4">Nouvelle Demande</button> */}

            {erreur && <div className="alert alert-danger">{erreur}</div>}

            {/* Liste des demandes */}
            <div className="row g-4">
                {demandes.length === 0 && (
                    <div className="col-12 text-center text-muted">
                        Aucune demande trouvée
                    </div>
                )}

                {demandes.map((d) => (
                    <div key={d.id} className="col-md-6 col-lg-4">
                        <div className="card shadow-sm border-left-info h-100 hover-card">
                            <div className="card-body">
                                <h5 className="card-title fw-bold">{d.type}</h5>
                                <p className="card-text text-muted">{d.description}</p>
                                <p className="text-sm text-gray-500">De : {d.utilisateur?.nom} {d.utilisateur?.prenom}</p>

                                <div className="mt-3">
                                    <select
                                        value={d.statut}
                                        onChange={(e) => handleUpdateStatut(d.id, e.target.value)}
                                        className={`form-select ${
                                            d.statut === 'en_attente' ? 'bg-warning bg-opacity-10 text-warning' : 'bg-success bg-opacity-10 text-success'
                                        }`}
                                    >
                                        <option value="en_attente">En attente</option>
                                        <option value="traitee">Traitée</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modale d’ajout (facultatif) */}
            {showPopup && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Soumettre une demande</h5>
                                <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
                            </div>
                            <div className="modal-body">
                                {erreur && <div className="alert alert-danger">{erreur}</div>}
                                <div className="mb-3">
                                    <label className="form-label">Type</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Statut</label>
                                    <select
                                        value={selectedStatut}
                                        onChange={(e) => setSelectedStatut(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="en_attente">En attente</option>
                                        <option value="traitee">Traitée</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>Annuler</button>
                                <button className="btn btn-success" onClick={handleAjout}>Envoyer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}