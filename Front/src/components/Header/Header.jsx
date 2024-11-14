import { Link, useNavigate } from "react-router-dom"
import logo from "../../../public/argentBankLogo.webp"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/authSlice"

// Composant Header - Barre de navigation avec connexion/déconnexion
export default function Header() {
  const token = useSelector((state) => state.auth.token) // Sélection du token d'authentification
  const userName = useSelector((state) => state.auth.userName) // Sélection du nom utilisateur
  const navigate = useNavigate() // Navigation après déconnexion
  const dispatch = useDispatch() // Dispatcher pour les actions Redux

  // Fonction de déconnexion
  const handleLogout = () => {
    dispatch(logout()) // Action pour déconnecter l'utilisateur
    navigate("/") // Redirection vers l'accueil
  }

  return (
    <header className="main-header">
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
        </Link>

        {/* Section de navigation en fonction de l'état de connexion */}
        <div>
          {token ? (
            <div>
              <Link className="main-nav-item" to="/user">
                <i className="fa fa-user-circle"></i>
                {userName}
              </Link>

              <Link className="main-nav-item" to="/" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                Sign out
              </Link>
            </div>
          ) : (
            <Link className="main-nav-item" to="/login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
