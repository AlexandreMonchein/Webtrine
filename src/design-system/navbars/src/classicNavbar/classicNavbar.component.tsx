import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
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

  const features = { isFixed: true, hasHideOnScroll: false };

  // keep track of previous scroll position
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  const onScroll = useCallback(() => {
    // current scroll position
    const currentScrollPos = window.scrollY;

    if (prevScrollPos > currentScrollPos) {
      // user has scrolled up
      document.getElementById("navbar").classList.add("show");
      document.getElementById("navbar").classList.remove("hide");
      console.warn(">>> up", prevScrollPos, currentScrollPos);
    } else {
      // user has scrolled down
      console.warn(">>> down", prevScrollPos, currentScrollPos);
      document.getElementById("navbar").classList.add("hide");
      document.getElementById("navbar").classList.remove("show");
    }

    // update previous scroll position
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos, setPrevScrollPos]);

  useEffect(() => {
    if (features.isFixed && features.hasHideOnScroll) {
      window.addEventListener("scroll", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [prevScrollPos]);

  return (
    <Container
      id="navbar"
      className={classNames({
        isFixed: features.isFixed,
        hideOnScroll: features.hasHideOnScroll,
      })}
    >
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
            <Links href="/#banner">Webtrine</Links>
            <SubCategoryContainer className="sous">
              <SubCategory>
                <Links href="/#description">Qui sommes-nous</Links>
              </SubCategory>
              <SubCategory>
                <Links href="/#showcase">L'équipe</Links>
              </SubCategory>
              <SubCategory>
                <Links href="/#showcase">Ils nous font confiance</Links>
              </SubCategory>
              <SubCategory>
                <Links href="/#contact">Contact</Links>
              </SubCategory>
            </SubCategoryContainer>
          </Category>
          <Category>
            <Links href="/display">Display</Links>
          </Category>
          <Category>
            <Links href="/display2">Display2</Links>
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
                      `../../../../assets/default/icons/white/facebook-white.png`
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
                      `../../../../assets/default/icons/white/instagram-white.png`
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
                      `../../../../assets/default/icons/white/x-white.png`
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
                      `../../../../assets/default/icons/white/linkedin-white.png`
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
