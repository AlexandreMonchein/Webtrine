import React from "react";
import { useSelector } from "react-redux";

import { getSocials } from "../../../../store/state.selector";
import { ToggleThemeMode } from "../../../buttons/mode-theme/src/modeTheme.component";

import {
  Container,
  Content,
  Languages,
  Links,
  Logo,
  MainNavigation,
  SocialContent,
  SocialLogo,
  Socials,
} from "./classicNavbar.styled";

export const ClassicNavbar = ({ toggleTheme, theme }) => {
  const { facebook, instagram, x, linkedIn } = useSelector(getSocials);
  console.warn(">>> ClassicNavbar");

  return (
    <Container>
      <Logo>
        <a href="/">
          <img
            alt="LOGO"
            src={require("../../../../assets/icons/white/logo-webtrine-white.png")}
          />
        </a>
      </Logo>
      <MainNavigation>
        <Content>
          <li>
            <Links href="#">Presentation</Links>
          </li>
          <li>
            <Links href="#">Qui sommes-nous</Links>
          </li>
          <li>
            <Links href="#">Ils nous font confiance</Links>
          </li>
          <li>
            <Links href="#">Contact</Links>
          </li>
        </Content>
      </MainNavigation>
      <Socials>
        <SocialContent>
          {facebook ? (
            <li>
              <SocialLogo>
                <a
                  href={`https://www.facebook.com/profile.php?id=${facebook?.profileId}`}
                >
                  <img
                    alt="facebook"
                    src={require("../../../../assets/icons/white/facebook-white.png")}
                  />
                </a>
              </SocialLogo>
            </li>
          ) : null}
          {instagram ? (
            <li>
              <SocialLogo>
                <a href={`https://www.instagram.com/${instagram?.profileId}`}>
                  <img
                    alt="instagram"
                    src={require("../../../../assets/icons/white/instagram-white.png")}
                  />
                </a>
              </SocialLogo>
            </li>
          ) : null}
          {x ? (
            <li>
              <SocialLogo>
                <a href={`https://twitter.com/${x?.profileId}`}>
                  <img
                    alt="x"
                    src={require("../../../../assets/icons/white/x-white.png")}
                  />
                </a>
              </SocialLogo>
            </li>
          ) : null}
          {linkedIn ? (
            <li>
              <SocialLogo>
                <a href={`https://www.linkedin.com/in/${linkedIn?.profileId}`}>
                  <img
                    alt="linkedin"
                    src={require("../../../../assets/icons/white/linkedin-white.png")}
                  />
                </a>
              </SocialLogo>
            </li>
          ) : null}
        </SocialContent>
        <Languages>
          <p>FR</p>
          <span>/</span>
          <p>EN</p>
        </Languages>
        <ToggleThemeMode toggleTheme={toggleTheme} theme={theme} />
      </Socials>
    </Container>
  );
};
