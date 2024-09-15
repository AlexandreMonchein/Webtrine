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

const ClassicNavbar = (props) => {
  const { t, i18n } = useTranslation();
  const { name: clientName } = useSelector(getClient);

  const {
    features: { isFixed, hasHideOnScroll, trad, darkMode },
    categories,
    content: {
      logo: { name },
    },
    toggleTheme,
    theme,
  } = props;

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

  const handleChangeLanguage = (lang) => {
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

  const handleClickOutside = (event) => {
    if (
      isSidebarOpen &&
      !document.getElementById("sidebar").contains(event.target) &&
      !document.getElementById("burgerMenuIcon").contains(event.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isFixed && hasHideOnScroll) {
      window.addEventListener("scroll", onScroll);
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [prevScrollPos, isSidebarOpen]);

  return (
    <>
      <Container
        id="navbar"
        className={classNames({
          isFixed: isFixed,
          hideOnScroll: hasHideOnScroll,
        })}
      >
        <BurgerMenuIcon id="burgerMenuIcon" onClick={toggleSidebar}>
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
                        <SubCategory key={sub.name}>
                          <Links href={sub.link}>{sub.name}</Links>
                        </SubCategory>
                      ))}
                    </SubCategoryContainer>
                  </Category>
                );
              }

              return (
                <Category key={category.name}>
                  <Links href={category.link}>{category.name}</Links>
                </Category>
              );
            })}
          </Content>
        </MainNavigation>
        <Settings>
          {trad ? (
            <Languages>
              <div>
                {i18n.language === "fr" ? (
                  <button onClick={() => handleChangeLanguage("en")}>EN</button>
                ) : (
                  <button onClick={() => handleChangeLanguage("fr")}>FR</button>
                )}
              </div>
            </Languages>
          ) : null}
          {darkMode ? (
            <ToggleThemeMode toggleTheme={toggleTheme} theme={theme} />
          ) : null}
        </Settings>
      </Container>
      <Sidebar
        id="sidebar"
        className={classNames({
          isFixed: isFixed,
          open: isSidebarOpen,
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
                <Category className="deroulant" key={category.name}>
                  <Links onClick={handleOnClick}>{category.name}</Links>
                  <SubCategoryContainer className="sous">
                    {category.sub.map((sub) => (
                      <SubCategory key={sub.name}>
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
              <Category key={category.name}>
                <Links href={category.link} onClick={toggleSidebar}>
                  {category.name}
                </Links>
              </Category>
            );
          })}
        </Content>
      </Sidebar>
    </>
  );
};

export default ClassicNavbar;
