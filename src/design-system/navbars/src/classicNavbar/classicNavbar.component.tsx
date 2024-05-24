import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
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

export const ClassicNavbar = ({ template, toggleTheme, theme }) => {
  const { t, i18n } = useTranslation();
  const { name } = useSelector(getClient);
  const { facebook, instagram, x, linkedIn } = useSelector(getSocials);

  const {
    features: { isFixed, hasHideOnScroll },
    content,
  } = template;

  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  const onScroll = useCallback(() => {
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

    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos, setPrevScrollPos]);

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (isFixed && hasHideOnScroll) {
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
        isFixed: isFixed,
        hideOnScroll: hasHideOnScroll,
      })}
    >
      <Logo>
        <a href="/">
          <img
            alt="LOGO"
            src={require(
              `../../../../assets/${name}/icons/white/logo-webtrine-white.png`
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
                <a href={`https://www.facebook.com/profile.php?id=${facebook}`}>
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
                <a href={`https://www.instagram.com/${instagram}`}>
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
                <a href={`https://twitter.com/${x}`}>
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
                <a href={`https://www.linkedin.com/in/${linkedIn}`}>
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
          <div>
            {i18n.language === "fr" ? (
              <button onClick={() => handleChangeLanguage("en")}>EN</button>
            ) : (
              <button onClick={() => handleChangeLanguage("fr")}>FR</button>
            )}
          </div>
        </Languages>
        <ToggleThemeMode toggleTheme={toggleTheme} theme={theme} />
      </Socials>
    </Container>
  );
};
