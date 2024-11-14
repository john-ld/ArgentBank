import PropTypes from "prop-types"

// Composant Hero - Affiche un titre, sous-titres et contenu pour la page d'accueil
const Hero = ({ title, subtitle, content }) => {
  return (
    <div className="hero">
      <section className="hero-content">
        <h2 className="sr-only">{title}</h2>
        {subtitle.map((item, index) => (
          <p key={index} className="subtitle">
            {item}
          </p>
        ))}
        <p className="text">{content}</p>
      </section>
    </div>
  )
}
// Validation des props avec PropTypes
Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.arrayOf(PropTypes.string).isRequired,
  content: PropTypes.string.isRequired,
}

export default Hero
