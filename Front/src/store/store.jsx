import { configureStore } from "@reduxjs/toolkit"
import authReducer, { initializeAuth } from "./authSlice" // Import du reducer d'authentification et de l'action initializeAuth

// Configuration du store Redux
const store = configureStore({
  reducer: {
    auth: authReducer, // Associe le slice d'authentification au state `auth`
  },
  devTools: process.env.NODE_ENV === "development", // Active Redux DevTools en mode développement uniquement
})

// Déclenche l'action asynchrone pour initialiser l'état d'authentification
store.dispatch(initializeAuth())

export default store // Exporte le store pour être utilisé dans l'application
