import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUser } from "../services/userServices"

// État initial pour le slice d'authentification
const initialState = {
  token: null,
  id: null,
  email: null,
  userName: null,
  firstName: null,
  lastName: null,
  loading: false, // Indicateur de chargement pour les opérations asynchrones
  error: null, // Stocke les messages d'erreur éventuels
}

// Action asynchrone pour initialiser l'authentification avec un token déjà stocké
export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { dispatch, rejectWithValue }) => {
    // Récupère le token depuis le stockage local ou de session
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token")
    if (token) {
      // Déclenche l'action de connexion avec le token récupéré
      dispatch(login({ token }))
      try {
        // Récupère les données utilisateur en utilisant le token
        const userData = await fetchUser(token)
        // Met à jour le state utilisateur avec les données récupérées
        dispatch(
          setUser({
            id: userData.id,
            email: userData.email,
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lastName,
          })
        )
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        // Si la récupération des données échoue, rejette l'action avec une erreur
        return rejectWithValue(error.response.data)
      }
    }
  }
)

// Création du slice d'authentification
const authSlice = createSlice({
  name: "auth", // Nom du slice
  initialState, // État initial
  reducers: {
    // Action pour la connexion - Enregistre le token dans le state
    login(state, action) {
      state.token = action.payload.token
    },
    // Action pour mettre à jour les informations utilisateur
    setUser(state, action) {
      const { id, email, userName, firstName, lastName } = action.payload
      state.id = id
      state.email = email
      state.userName = userName
      state.firstName = firstName
      state.lastName = lastName
    },
    // Action pour mettre à jour uniquement le nom d'utilisateur
    setUserName(state, action) {
      const { userName } = action.payload
      state.userName = userName
    },
    // Action pour déconnecter l'utilisateur
    logout(state) {
      // Réinitialise l'état utilisateur et retire le token du stockage local
      state.token = null
      state.id = null
      state.email = null
      state.userName = null
      state.firstName = null
      state.lastName = null
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")
    },
  },
  // Gestion des cas d'actions asynchrones avec createAsyncThunk
  extraReducers: (builder) => {
    builder
      // Cas pour lorsque l'initialisation est en cours (pending)
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Cas pour lorsque l'initialisation est réussie (fulfilled)
      .addCase(initializeAuth.fulfilled, (state) => {
        state.loading = false
      })
      // Cas pour lorsque l'initialisation échoue (rejected)
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

// Export des actions et du reducer
export const { login, setUser, setUserName, logout } = authSlice.actions
export default authSlice.reducer
