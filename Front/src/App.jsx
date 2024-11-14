import { BrowserRouter, Routes, Route } from "react-router-dom" // Importation des composants de routage de React Router
import Home from "./pages/Home/" // Page d'accueil
import Header from "./components/Header/Header" // Composant d'en-tête
import Footer from "./components/Footer/Footer" // Composant de pied de page
import User from "./pages/User" // Page utilisateur (accessible uniquement si l'utilisateur est authentifié)
import Login from "./pages/Login" // Page de connexion
import Error from "./pages/Error/" // Page d'erreur 404 pour les routes non définies
import PrivateRoute from "./utils/privateRoute" // Composant pour les routes privées

// Composant principal de l'application
const App = () => {
  return (
    <BrowserRouter>
      {/* En-tête de l'application, visible sur toutes les pages */}
      <Header />

      {/* Définition des routes de l'application */}
      <Routes>
        {/* Route vers la page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Route vers la page de connexion */}
        <Route path="/login" element={<Login />} />

        {/* Route vers la page utilisateur, protégée par PrivateRoute */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              {" "}
              {/* Protège la page pour que seuls les utilisateurs connectés y accèdent */}
              <User />
            </PrivateRoute>
          }
        />

        {/* Route de secours pour les pages non trouvées, redirige vers la page d'erreur */}
        <Route path="*" element={<Error />} />
      </Routes>

      {/* Pied de page de l'application, visible sur toutes les pages */}
      <Footer />
    </BrowserRouter>
  )
}

export default App
