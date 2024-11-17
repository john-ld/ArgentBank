import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login, setUser } from "../../store/authSlice"
import { userLogin, fetchUser } from "../../services/userServices"

// Composant Form - Formulaire de connexion
const Form = () => {
  const form = useRef() // Référence pour accéder aux éléments du formulaire
  const navigate = useNavigate() // Navigation après connexion
  const dispatch = useDispatch() // Dispatcher pour les actions Redux
  const [errorMessage, setErrorMessage] = useState("") // Gestion des messages d'erreur

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault() // Empêche le rechargement de la page
    const userInfos = {
      email: form.current[0].value, // Récupère l'email
      password: form.current[1].value, // Récupère le mot de passe
      rememberMe: form.current[2].checked, // Vérifie si "remember me" est coché
    }
    const payload = JSON.stringify(userInfos)

    try {
      const data = await userLogin(payload) // Appel API pour se connecter
      if (data.body.token) {
        dispatch(login({ token: data.body.token })) // Stockage du token dans Redux

        const userData = await fetchUser(data.body.token) // Récupère les infos utilisateur
        dispatch(
          setUser({
            id: userData.id,
            email: userData.email,
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lastName,
          })
        )

        // Enregistre le token selon "remember me"
        if (userInfos.rememberMe) {
          localStorage.setItem("token", data.body.token)
          sessionStorage.removeItem("token")
        } else {
          sessionStorage.setItem("token", data.body.token)
          localStorage.removeItem("token")
        }

        navigate("/user") // Redirection vers la page utilisateur
      } else {
        console.error("Token not found in response") // Gestion d'erreur
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.")
    }
  }

  return (
    <form ref={form} onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="email">Username</label>
        <input type="email" id="email" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className="sign-in-button">Sign In</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  )
}

export default Form
