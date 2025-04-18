import Facebook from "../../../assets/icons/facebook.component";
import Instagram from "../../../assets/icons/instagram.component";
import Twitch from "../../../assets/icons/twitch.component";
import {
  FooterContainer,
  GridContainer,
  LeftSection,
  MiddleSection,
  RightSection,
  Logo,
  Text,
  SocialIcons,
  FooterLink,
  Title,
  BottomBar,
  Divider,
} from "./footer.styled";

const Footer = () => {
  return (
    <footer aria-labelledby="footer-heading">
      <FooterContainer>
        <GridContainer>
          {/* Colonne gauche */}
          <LeftSection>
            <a href="/" aria-label="Retour à l'accueil">
              <Logo src="/logo.svg" alt="Logo de l'entreprise" />
            </a>
            <Text>
              Créateur de sites vitrines performants, modernes et accessibles.
            </Text>
            <SocialIcons aria-label="Réseaux sociaux">
              <a href="https://twitter.com" aria-label="Twitter">
                <Twitch />
              </a>
              <a href="https://facebook.com" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <Instagram />
              </a>
            </SocialIcons>
          </LeftSection>

          {/* Colonne milieu */}
          <MiddleSection>
            <Title id="footer-heading">Navigation</Title>
            <nav aria-label="Menu principal">
              <ul>
                <li>
                  <FooterLink href="/about">À propos</FooterLink>
                </li>
                <li>
                  <FooterLink href="/services">Prestations</FooterLink>
                </li>
                <li>
                  <FooterLink href="/contact">Contact</FooterLink>
                </li>
              </ul>
            </nav>
          </MiddleSection>

          {/* Colonne droite */}
          <RightSection>
            <Title>Informations légales</Title>
            <nav aria-label="Mentions légales">
              <ul>
                <li>
                  <FooterLink href="/cgu">CGU</FooterLink>
                </li>
                <li>
                  <FooterLink href="/cgv">CGV</FooterLink>
                </li>
                <li>
                  <FooterLink href="/privacy">Confidentialité</FooterLink>
                </li>
              </ul>
            </nav>
          </RightSection>
        </GridContainer>

        <Divider />

        <BottomBar>
          <p>© {new Date().getFullYear()} Webtrine. Tous droits réservés.</p>
        </BottomBar>
      </FooterContainer>
    </footer>
  );
};

export default Footer;
