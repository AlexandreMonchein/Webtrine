import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { toggleModal } from "../../../store/state.action";
import {
  getClient,
  getModalState,
} from "../../../store/state.selector";
import { ToggleButton } from "../../buttons/src/classicButton.component";
import { ToggleThemeMode } from "../../buttons/src/modeTheme.component";

import { FocusTrapProvider } from "../../utils/focusTrap/focusTrap.provider";
import { MODAL_TYPES } from "../../utils/focusTrap/type";

import {
  BurgerMenuIcon,
  Category,
  Container,
  Content,
  Languages,
  Links,
  LogoContainer,
  Logo,
  MainNavigation,
  Settings,
  Sidebar,
  SubCategory,
  SubCategoryContainer,
} from "./classicNavbar.styled";
import { getLogoDimensions } from "../../utils/dimensions.utils";
import Calendly from "../../calendly/calendlyButton.component";

const ClassicNavbar = (props) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { name: clientName } = useSelector(getClient);
  const modal = useSelector(getModalState);

  const {
    features: { isFixed, hasHideOnScroll, trad, darkMode },
    categories,
    actionButton,
    content: {
      logo: { name, shape },
      calendly: { url: calendlyUrl } = { url: null },
    },
    toggleTheme,
    theme,
  } = props;

  const { width, height } = getLogoDimensions(shape);

  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;

    if (prevScrollPos > currentScrollPos) {
      // user has scrolled up
      document.getElementById("navbar")?.classList.add("show");
      document.getElementById("navbar")?.classList.remove("hide");
    } else {
      // user has scrolled down
      document.getElementById("navbar")?.classList.add("hide");
      document.getElementById("navbar")?.classList.remove("show");
    }

    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos, setPrevScrollPos]);

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const toggleSidebar = (e) => {
    setIsSidebarOpen(!isSidebarOpen);
    dispatch(
      toggleModal({ type: MODAL_TYPES.SIDE_NAV, active: isSidebarOpen })
    );
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

  const handleClickOutside = useCallback(
    (event) => {
      if (
        isSidebarOpen &&
        !document.getElementById("sidebar")?.contains(event.target) &&
        !document.getElementById("burgerMenuNavbarIcon")?.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    },
    [isSidebarOpen]
  );

  useEffect(() => {
    if (isFixed && hasHideOnScroll) {
      window.addEventListener("scroll", onScroll);
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    prevScrollPos,
    isSidebarOpen,
    isFixed,
    hasHideOnScroll,
    handleClickOutside,
    onScroll,
  ]);

  return (
    <FocusTrapProvider isVisible={modal?.active} type={modal?.type}>
      <Container
        id="navbar"
        className={classNames({
          isFixed: isFixed,
          hideOnScroll: hasHideOnScroll,
        })}
      >
        <BurgerMenuIcon
          tabIndex={isSidebarOpen ? -1 : 0}
          id="burgerMenuNavbarIcon"
          onClick={toggleSidebar}
          aria-label="Ouvrir le menu déroulant"
        >
          <div></div>
          <div></div>
          <div></div>
        </BurgerMenuIcon>
        <LogoContainer>
          <a href="/">
            <Logo
              alt={name}
              src={`${import.meta.env.BASE_URL}assets/${clientName}/icons/${name}.webp`}
              width={width}
              height={height}
            />
          </a>
        </LogoContainer>
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
          {calendlyUrl ? (
            <Calendly url={calendlyUrl} />
          ) : null}
          {actionButton ? (
            actionButton.type === "call" ? (
              <ToggleButton
                type="call"
                displayedText={actionButton.displayedText}
                hiddenText={actionButton.hiddenText}
              />
            ) : null
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
        <BurgerMenuIcon
          tabIndex={isSidebarOpen ? 0 : -1}
          id="burgerMenuSidebarIcon"
          onClick={toggleSidebar}
          aria-label="Fermer le menu déroulant"
        >
          <div></div>
          <div></div>
          <div></div>
        </BurgerMenuIcon>
        <Content>
          {categories.map((category) => {
            if (category.sub) {
              return (
                <Category className="deroulant" key={category.name}>
                  <Links
                    tabIndex={isSidebarOpen ? 0 : -1}
                    onClick={handleOnClick}
                  >
                    {category.name}
                  </Links>
                  <SubCategoryContainer className="sous">
                    {category.sub.map((sub) => (
                      <SubCategory key={sub.name}>
                        <Links
                          tabIndex={isSidebarOpen ? 0 : -1}
                          href={sub.link}
                          onClick={toggleSidebar}
                        >
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
                <Links
                  tabIndex={isSidebarOpen ? 0 : -1}
                  href={category.link}
                  onClick={toggleSidebar}
                >
                  {category.name}
                </Links>
              </Category>
            );
          })}
        </Content>
      </Sidebar>
    </FocusTrapProvider>
  );
};

export default ClassicNavbar;
