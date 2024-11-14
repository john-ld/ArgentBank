// Fonction pour effectuer la connexion de l'utilisateur
export const userLogin = async (payload) => {
  // Envoie une requête POST pour l'authentification
  let response = await fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Spécifie que le corps de la requête est en JSON
    },
    body: payload, // Contient les informations de connexion sous forme de chaîne JSON
  })

  // Vérifie si la réponse est correcte
  if (!response.ok) {
    // Si le serveur renvoie une erreur, on obtient le message d'erreur
    const error = await response.json()
    if (response.status === 400) {
      // Erreur spécifique si les identifiants sont incorrects
      return { error: "Invalid username or password." }
    } else {
      // Autres erreurs, message générique en cas de problème réseau
      throw new Error(error.message || "Network response was not ok")
    }
  }

  // Si la réponse est correcte, on convertit la réponse JSON en objet JavaScript
  const data = await response.json()
  return data // Retourne les données de connexion, y compris le token
}

// Fonction pour récupérer les informations de l'utilisateur connecté
export const fetchUser = async (token) => {
  // Envoie une requête POST pour récupérer le profil utilisateur en utilisant le token
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // Ajoute le token dans le header pour l'authentification
    },
  })

  // Convertit la réponse JSON en objet JavaScript
  const data = await response.json()
  return data.body // Retourne les données du profil utilisateur
}

// Fonction pour modifier le nom d'utilisateur
export const changeUsername = async (payload, token) => {
  // Envoie une requête PUT pour modifier le profil utilisateur
  let response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Spécifie que le corps de la requête est en JSON
      Authorization: `Bearer ${token}`, // Ajoute le token dans le header pour l'authentification
    },
    body: JSON.stringify(payload), // Convertit les données de payload en JSON
  })

  // Vérifie si la réponse est correcte, sinon déclenche une erreur
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  // Convertit la réponse JSON en objet JavaScript
  const data = await response.json()
  return data // Retourne les données de la réponse, incluant les informations mises à jour
}
