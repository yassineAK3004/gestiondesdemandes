// src/router/index.jsx

import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Etudiant from '../pages/Etudiant';
import AdminDashboard from '../pages/AdminDashboard';
import AdminEtudiants from '../pages/AdminEtudiants';
import AdminDemandes from '../pages/AdminDemandes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/etudiant',
    element: <Etudiant />,
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/etudiants',
    element: <AdminEtudiants />,
  },
  {
    path: '/admin/demandes',
    element: <AdminDemandes />,
  },
  {
    path: '*',
    element: <p>Page non trouvée</p>,
  },
]); 