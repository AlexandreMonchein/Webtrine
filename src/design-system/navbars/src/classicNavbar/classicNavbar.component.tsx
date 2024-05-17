import React from "react";
import { useSelector } from "react-redux";

import { getClient, getSocials } from "../../../../store/state.selector";
import { ToggleThemeMode } from "../../../buttons/mode-theme/src/modeTheme.component";

import {
  Category,
  Container,
  Content,
  Languages,
  Links,
  Logo,
  MainNavigation,
  SocialContent,
  SocialLogo,
  Socials,
  SubCategory,
  SubCategoryContainer,
} from "./classicNavbar.styled";

export const ClassicNavbar = ({ toggleTheme, theme }) => {
  const { facebook, instagram, x, linkedIn } = useSelector(getSocials);
  const client = useSelector(getClient);
  console.warn(">>> ClassicNavbar");

  return (
    <Container>
      <Logo>
        <a href="/">
          <img
            alt="LOGO"
            src={require(
              `../../../../assets/${client}/icons/white/logo-webtrine-white.png`
            )}
          />
        </a>
      </Logo>
      <MainNavigation>
        <Content>
          <Category className="deroulant">
            <Links href="#">Webtrine</Links>
            <SubCategoryContainer className="sous">
              <SubCategory>
                <Links href="#">Qui sommes-nous</Links>
              </SubCategory>
              <SubCategory>
                <Links href="#">Ils nous font confiance</Links>
              </SubCategory>
              <SubCategory>
                <Links href="#">L'équipe</Links>
              </SubCategory>
              <SubCategory>
                <Links href="#">Contact</Links>
              </SubCategory>
            </SubCategoryContainer>
          </Category><Category className="deroulant">
            <Links href="#">Webtrine</Links>
            <SubCategoryContainer className="sous">
              <SubCategory>
                <Links href="#">Qui sommes-nous</Links>
              </SubCategory>
              <SubCategory>
                <Links href="#">Ils nous font confiance</Links>
              </SubCategory>
              <SubCategory>
                <Links href="#">L'équipe</Links>
              </SubCategory>
              <SubCategory>
                <Links href="#">Contact</Links>
              </SubCategory>
            </SubCategoryContainer>
          </Category>

          <Category>
            <Links href="/display">Display</Links>
          </Category>
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
                    src={require(
                      `../../../../assets/${client}/icons/white/facebook-white.png`
                    )}
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
                    src={require(
                      `../../../../assets/${client}/icons/white/instagram-white.png`
                    )}
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
                    src={require(
                      `../../../../assets/${client}/icons/white/x-white.png`
                    )}
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
                    src={require(
                      `../../../../assets/${client}/icons/white/linkedin-white.png`
                    )}
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
