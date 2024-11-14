import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUserName } from "../../store/authSlice"
import { changeUsername } from "../../services/userServices"

// Composant UserHeader - Permet d'afficher et de modifier le nom d'utilisateur
const UserHeader = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth) || {} // Récupération des informations utilisateur depuis le state Redux
  const [newUsername, setnewUsername] = useState() // État local pour stocker le nouveau nom d'utilisateur
  const [isEditing, setIsEditing] = useState(false) // État pour savoir si l'édition est activée

  // Active le mode édition et initialise le champ avec le nom actuel
  const handleEditing = () => {
    setnewUsername(user.userName)
    setIsEditing(true)
  }

  // Met à jour l'état local en fonction de l'entrée utilisateur
  const handleInputChange = (e) => {
    setnewUsername(e.target.value)
  }

  // Sauvegarde le nouveau nom d'utilisateur
  const handleSaveNewUsername = async () => {
    if (newUsername.trim().length < 2) {
      return // Validation simple - le nom doit avoir au moins 2 caractères
    }
    try {
      // Met à jour l'état Redux avec le nouveau nom d'utilisateur
      dispatch(setUserName({ ...user, userName: newUsername }))
      setIsEditing(false) // Désactive le mode édition

      // Prépare la requête de changement de nom
      const payload = {
        userName: newUsername,
      }

      // Envoie la requête pour mettre à jour le nom d'utilisateur sur le serveur
      await changeUsername(payload, user.token)
    } catch (error) {
      console.error("Failed to change username:", error) // Gère les erreurs d'API
    }
  }

  return (
    <div className="header">
      {isEditing ? (
        <div className="edit-user-info">
          <h2>Edit user info</h2>

          {/* Champ d'édition du nom d'utilisateur */}
          <div>
            <label htmlFor="username">User name:</label>
            <input
              id="username"
              className="edit-user edit-username-input"
              type="text"
              value={newUsername !== undefined ? newUsername : user.userName} // Affiche le nom actuel ou le nouveau nom
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveNewUsername() // Sauvegarde en appuyant sur "Enter"
                }
                if (e.key === "Escape" || e.key === "ESC") {
                  setIsEditing(false) // Annule l'édition avec "Escape"
                }
              }}
              autoFocus
            />
          </div>

          {/* Affichage des autres informations utilisateur (non modifiables) */}
          <div>
            <label htmlFor="firstName">First name:</label>
            <input
              id="firstName"
              className="edit-user --not-editable"
              type="text"
              value={user.firstName || "[First Name]"} // Affiche un texte par défaut si la donnée est manquante
              readOnly
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name:</label>
            <input
              id="lastName"
              className="edit-user --not-editable"
              type="text"
              value={user.lastName || "[Last Name]"} // Affiche un texte par défaut si la donnée est manquante
              readOnly
            />
          </div>
        </div>
      ) : (
        // Message de bienvenue affichant le nom d'utilisateur actuel
        <h1>
          Welcome back <br />
          {`${user.userName || "[Username]"}`}!
        </h1>
      )}

      {/* Boutons d'édition ou de sauvegarde en fonction de l'état d'édition */}
      {isEditing ? (
        <div className="edit-buttons">
          <button className="edit-button-on" onClick={handleSaveNewUsername}>
            Save Name
          </button>
          <button
            className="edit-button-on"
            onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="edit-button" onClick={handleEditing}>
          Edit Name
        </button>
      )}
    </div>
  )
}

export default UserHeader
