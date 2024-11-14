import "./styles/main.css" // Importation des styles globaux pour l'application
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App" // Importation du composant racine de l'application

// REDUX
import { Provider } from "react-redux" // Le Provider de Redux permet d'injecter le store dans l'application
import store from "./store/store" // Importation du store Redux

// Création de la racine de l'application avec la méthode createRoot
const root = ReactDOM.createRoot(document.getElementById("root"))

// Rendu de l'application avec le Provider Redux pour gérer l'état global
root.render(
  <React.StrictMode>
    {" "}
    {/* Mode strict de React pour détecter les problèmes potentiels */}
    <Provider store={store}>
      {" "}
      {/* Enveloppe l'application dans le Provider pour donner accès au store Redux */}
      <App /> {/* Composant racine */}
    </Provider>
  </React.StrictMode>
)
