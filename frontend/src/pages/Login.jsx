import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // 🔐 Envoie les identifiants à Laravel
            const res = await axios.post('http://localhost:8000/api/auth/login', {
                email,
                mot_de_passe: motDePasse
            });

            // ✅ Stocke le token et utilisateur
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.utilisateur));

            // 🚪 Redirige selon le rôle
            if (res.data.utilisateur.role_id === 2) {
                navigate('/admin');
            } else {
                navigate('/etudiant');
            }

        } catch (err) {
            alert("Identifiants incorrects");
        }
    };

    return (
        <div className="login-container d-flex align-items-center justify-content-center min-vh-100">
            <div className="login-card card shadow-lg border-0 rounded-3 overflow-hidden w-100" style={{ maxWidth: "900px" }}>
                <div className="card-body p-0">
                    <div className="row g-0">
                        {/* Image de fond */}
                        <div className="col-md-6 d-none d-md-block position-relative login-image" style={{
                            backgroundImage: 'url(https://source.unsplash.com/1200x600/?university ,student,request)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}></div>

                        {/* Formulaire */}
                        <div className="col-md-6 p-5">
                            <div className="text-center mb-4">
                                <h3 className="fw-bold text-primary">Plateforme ENSAJ</h3>
                                <p className="text-muted">Connexion à votre compte</p>
                            </div>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control form-control-lg"
                                        placeholder="Entrez votre email"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={motDePasse}
                                        onChange={(e) => setMotDePasse(e.target.value)}
                                        className="form-control form-control-lg"
                                        placeholder="Entrez votre mot de passe"
                                        required
                                    />
                                </div>

                                <div className="d-grid gap-2 mt-4">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Se connecter
                                    </button>
                                </div>
                            </form>

                            <hr className="my-4" />

                            <div className="text-center">
                                <small className="text-muted">© 2025 Plateforme ENSAJ</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}