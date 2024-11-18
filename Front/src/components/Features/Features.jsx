import chatIcon from "../../../public/icon-chat.webp"
import cashIcon from "../../../public/icon-money.webp"
import shieldIcon from "../../../public/icon-security.webp"
import FeatureItem from "./FeatureItem"

// Composant Features - affiche les principaux avantages offerts par l'application
const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <FeatureItem
        image={chatIcon}
        title={"You are our #1 priority"}
        description={`Need to talk to a representative? You can get in touch through our
          24/7 chat or through a phone call in less than 5 minutes.`}
      />
      <FeatureItem
        image={cashIcon}
        title={"More savings means higher rates"}
        description={`The more you save with us, the higher your interest rate will be!`}
      />
      <FeatureItem
        image={shieldIcon}
        title={"Security you can trust"}
        description={`We use top of the line encryption to make sure your data and money is
          always safe.`}
      />
    </section>
  )
}

export default Features
