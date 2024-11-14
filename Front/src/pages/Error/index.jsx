import DocumentTitle from "../../components/DocumentTitle" // Importation du composant pour définir le titre du document

// Composant Error - Affiche un message d'erreur pour les pages introuvables
export default function Error() {
  // Définition du titre pour la page d'erreur
  const title = "404"

  return (
    <>
      {/* Composant pour définir le titre de la page dans le navigateur */}
      <DocumentTitle title={title} />

      {/* Contenu principal de la page d'erreur */}
      <div>
        <h1>{title} - Page not found</h1> {/* Affiche l'erreur 404 */}
        <h2>The page you are looking for cannot be found</h2>{" "}
        {/* Message explicatif */}
      </div>
    </>
  )
}
