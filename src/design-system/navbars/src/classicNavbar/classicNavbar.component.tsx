import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getClient } from "../../../../store/state.selector";
import { ToggleThemeMode } from "../../../buttons/mode-theme/src/modeTheme.component";

import {
  BurgerMenuIcon,
  Category,
  Container,
  Content,
  Languages,
  Links,
  Logo,
  MainNavigation,
  Settings,
  Sidebar,
  SubCategory,
  SubCategoryContainer,
} from "./classicNavbar.styled";

export const ClassicNavbar = ({ template, toggleTheme, theme }) => {
  const { t, i18n } = useTranslation();
  const { name } = useSelector(getClient);

  const {
    features: { isFixed, hasHideOnScroll },
    content,
  } = template;

  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOnClick = (e) => {
    if (e.target.nextSibling.classList.contains("show")) {
      e.target.nextSibling.classList.remove("show");
      e.target.nextSibling.classList.add("hide");
    } else {
      e.target.nextSibling.classList.add("show");
      e.target.nextSibling.classList.remove("hide");
    }
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
      <BurgerMenuIcon onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </BurgerMenuIcon>
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
            <Links>Webtrine</Links>
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
      <Settings>
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
      </Settings>
      <Sidebar className={isSidebarOpen ? "open" : ""}>
        <Content>
          <Category className="deroulant">
            <Links onClick={handleOnClick}>Webtrine</Links>
            <SubCategoryContainer className="sous">
              <SubCategory>
                <Links href="/#description" onClick={toggleSidebar}>
                  Qui sommes-nous
                </Links>
              </SubCategory>
              <SubCategory>
                <Links href="/#showcase" onClick={toggleSidebar}>
                  L'équipe
                </Links>
              </SubCategory>
              <SubCategory>
                <Links href="/#showcase" onClick={toggleSidebar}>
                  Ils nous font confiance
                </Links>
              </SubCategory>
              <SubCategory>
                <Links href="/#contact" onClick={toggleSidebar}>
                  Contact
                </Links>
              </SubCategory>
            </SubCategoryContainer>
          </Category>
          <Category>
            <Links href="/display" onClick={toggleSidebar}>
              Display
            </Links>
          </Category>
          <Category>
            <Links href="/display2" onClick={toggleSidebar}>
              Display2
            </Links>
          </Category>
        </Content>
      </Sidebar>
    </Container>
  );
};
