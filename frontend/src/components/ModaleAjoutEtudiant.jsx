import { useState } from 'react';

export default function ModaleAjoutEtudiant({ onAjouter }) {
    const [ouvert, setOuvert] = useState(false);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAjouter({ nom, prenom, email, mot_de_passe: motDePasse });
        setNom('');
        setPrenom('');
        setEmail('');
        setMotDePasse('');
        setOuvert(false);
    };

    return (
        <>
            <button
                onClick={() => setOuvert(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Ajouter un étudiant
            </button>

            {ouvert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Ajouter un étudiant</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                placeholder="Nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                className="border p-2 w-full mb-2"
                                required
                            />
                            <input
                                placeholder="Prénom"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                className="border p-2 w-full mb-2"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border p-2 w-full mb-2"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                value={motDePasse}
                                onChange={(e) => setMotDePasse(e.target.value)}
                                className="border p-2 w-full mb-4"
                                required
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setOuvert(false)}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}