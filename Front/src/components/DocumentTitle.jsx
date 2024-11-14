import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUserName } from "../../store/authSlice"
import { changeUsername } from "../../services/userServices"

// Composant UserHeader - Permet d'afficher et de modifier le nom d'utilisateur
const UserHeader = () => {
  const dispatch = useDispatch() // Utilisé pour déclencher des actions Redux
  const user = useSelector((state) => state.auth) || {} // Récupération des informations utilisateur depuis le state Redux
  const [newUsername, setnewUsername] = useState() // État local pour stocker le nouveau nom d'utilisateur
  const [isEditing, setIsEditing] = useState(false) // État pour savoir si l'édition est activée

  // Active le mode édition et initialise le champ avec le nom actuel de l'utilisateur
  const handleEditing = () => {
    setnewUsername(user.userName) // Initialise newUsername avec le nom actuel pour permettre la modification
    setIsEditing(true) // Active l'édition
  }

  // Met à jour l'état local en fonction de la saisie de l'utilisateur dans le champ de texte
  const handleInputChange = (e) => {
    setnewUsername(e.target.value) // Met à jour newUsername à chaque frappe de l'utilisateur
  }

  // Sauvegarde le nouveau nom d'utilisateur et met à jour le state Redux et l'API
  const handleSaveNewUsername = async () => {
    if (newUsername.trim().length < 2) {
      return // Validation simple - le nom doit comporter au moins 2 caractères pour être valide
    }
    try {
      // Met à jour le nom d'utilisateur dans Redux
      dispatch(setUserName({ ...user, userName: newUsername }))
      setIsEditing(false) // Désactive le mode édition

      // Prépare la requête de changement de nom pour l'API
      const payload = {
        userName: newUsername,
      }

      // Envoie la requête pour mettre à jour le nom d'utilisateur sur le serveur
      await changeUsername(payload, user.token)
    } catch (error) {
      console.error("Failed to change username:", error) // Affiche une erreur si la mise à jour échoue
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
              value={newUsername !== undefined ? newUsername : user.userName} // Affiche le nom actuel ou le nom modifié
              onChange={handleInputChange} // Met à jour l'état `newUsername` à chaque modification
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveNewUsername() // Sauvegarde en appuyant sur "Enter"
                }
                if (e.key === "Escape" || e.key === "ESC") {
                  setIsEditing(false) // Annule l'édition avec "Escape"
                }
              }}
              autoFocus // Met le champ en focus automatique lors de l'édition
            />
          </div>

          {/* Affiche les informations utilisateur non modifiables */}
          <div>
            <label htmlFor="firstName">First name:</label>
            <input
              id="firstName"
              className="edit-user --not-editable"
              type="text"
              value={user.firstName || "[First Name]"} // Affiche un texte par défaut si le prénom est manquant
              readOnly // Le champ est en lecture seule
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name:</label>
            <input
              id="lastName"
              className="edit-user --not-editable"
              type="text"
              value={user.lastName || "[Last Name]"} // Affiche un texte par défaut si le nom de famille est manquant
              readOnly // Le champ est en lecture seule
            />
          </div>
        </div>
      ) : (
        // Affiche un message de bienvenue avec le nom d'utilisateur actuel si on n'est pas en mode édition
        <h1>
          Welcome back <br />
          {`${user.userName || "[Username]"}`}!
        </h1>
      )}

      {/* Affiche les boutons de sauvegarde et d'annulation si on est en mode édition, sinon le bouton "Edit Name" */}
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
