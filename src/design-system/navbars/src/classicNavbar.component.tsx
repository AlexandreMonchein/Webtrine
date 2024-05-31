import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getClient } from "../../../store/state.selector";
import { ToggleThemeMode } from "../../buttons/mode-theme/src/modeTheme.component";

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
  const { name: clientName } = useSelector(getClient);

  const {
    features: { isFixed, hasHideOnScroll },
    categories,
    content: {
      logo: { name },
    },
  } = template;

  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;

    if (prevScrollPos > currentScrollPos) {
      // user has scrolled up
      document.getElementById("navbar").classList.add("show");
      document.getElementById("navbar").classList.remove("hide");
    } else {
      // user has scrolled down
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
            src={require(`../../../assets/${clientName}/icons/${name}.png`)}
          />
        </a>
      </Logo>
      <MainNavigation>
        <Content>
          {categories.map((category) => {
            if (category.sub) {
              return (
                <Category className="deroulant">
                  <Links onClick={handleOnClick}>{category.name}</Links>
                  <SubCategoryContainer className="sous">
                    {category.sub.map((sub) => (
                      <SubCategory>
                        <Links href={sub.link}>{sub.name}</Links>
                      </SubCategory>
                    ))}
                  </SubCategoryContainer>
                </Category>
              );
            }

            return (
              <Category>
                <Links href={category.link}>{category.name}</Links>
              </Category>
            );
          })}
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
      <Sidebar
        className={classNames({
          isFixed: isFixed,
          open: isSidebarOpen,
          hideOnScroll: hasHideOnScroll,
        })}
      >
        <BurgerMenuIcon onClick={toggleSidebar}>
          <div></div>
          <div></div>
          <div></div>
        </BurgerMenuIcon>
        <Content>
          {categories.map((category) => {
            if (category.sub) {
              return (
                <Category className="deroulant">
                  <Links onClick={handleOnClick}>{category.name}</Links>
                  <SubCategoryContainer className="sous">
                    {category.sub.map((sub) => (
                      <SubCategory>
                        <Links href={sub.link} onClick={toggleSidebar}>
                          {sub.name}
                        </Links>
                      </SubCategory>
                    ))}
                  </SubCategoryContainer>
                </Category>
              );
            }

            return (
              <Category>
                <Links href={category.link} onClick={toggleSidebar}>
                  {category.name}
                </Links>
              </Category>
            );
          })}
        </Content>
      </Sidebar>
    </Container>
  );
};
