import DocumentTitle from "../../components/DocumentTitle" // Composant pour définir le titre de la page dans l'onglet du navigateur
import Form from "../../components/Form/Form" // Composant du formulaire de connexion

// Composant Login - Affiche la page de connexion
function Login() {
  const title = "Sign in" // Titre pour la page de connexion

  return (
    <>
      {/* Définit le titre de la page dans le navigateur */}
      <DocumentTitle title={title} />

      {/* Contenu principal de la page de connexion */}
      <main className="main bg-dark">
        <section className="sign-in-content">
          {/* Icône utilisateur pour la page de connexion */}
          <i className="fa fa-user-circle sign-in-icon"></i>

          {/* Titre de la section de connexion */}
          <h1>{title}</h1>

          {/* Formulaire de connexion */}
          <Form />
        </section>
      </main>
    </>
  )
}

export default Login
