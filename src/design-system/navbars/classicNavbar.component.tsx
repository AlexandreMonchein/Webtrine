import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { toggleModal } from "../../store/state.action";
import {
  getClient,
  getModalState,
  getSocials,
} from "../../store/state.selector";
import { ToggleButton } from "../buttons/src/classicButton.component";
import { ToggleThemeMode } from "../buttons/src/modeTheme.component";
import CalendlyButton from "../components/calendly/calendlyButton.component";
import { getLogoDimensions } from "../utils/dimensions.utils";
import { FocusTrapProvider } from "../utils/focusTrap/focusTrap.provider";
import { MODAL_TYPES } from "../utils/focusTrap/type";
import { useLoadComponents } from "../utils/useLoadComponents.hook";
import styles from "./classicNavbar.module.css";
import type { ClassicNavbarProps } from "./classicNavbar.types";

const ClassicNavbar = (props: ClassicNavbarProps) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { name: clientName } = useSelector(getClient);
  const socials = useSelector(getSocials);
  const modal = useSelector(getModalState);

  const socialItems = useMemo(
    () =>
      Object.entries(socials)
        .filter(([_, link]) => link)
        .map(([name, link]) => ({ name, link })),
    [socials],
  );

  const renderSocialIcon = useCallback(
    (Component: React.ComponentType, data: { name: string; link: unknown }) => (
      <li key={data.name}>
        <div className={styles.socialLogo}>
          <a aria-label={data.name} href={(data.link as any).link}>
            <Component />
          </a>
        </div>
      </li>
    ),
    [],
  );

  const components = useLoadComponents(socialItems, {
    renderFn: renderSocialIcon,
  }) as React.ReactNode[];

  const {
    features: {
      isFixed,
      hasHideOnScroll,
      trad,
      darkMode,
      shouldDisplaySocials = true,
    },
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

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    dispatch(
      toggleModal({ type: MODAL_TYPES.SIDE_NAV, active: isSidebarOpen }),
    );
  };

  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const nextSibling = (e.target as HTMLElement)
      .nextSibling as HTMLElement | null;
    if (nextSibling?.classList.contains("show")) {
      nextSibling.classList.remove("show");
      nextSibling.classList.add("hide");
    } else {
      nextSibling?.classList.add("show");
      nextSibling?.classList.remove("hide");
    }
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        !document.getElementById("sidebar")?.contains(event.target as Node) &&
        !document
          .getElementById("burgerMenuNavbarIcon")
          ?.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    },
    [isSidebarOpen],
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
      <header
        id="navbar"
        data-testid="classicNavbarRoot"
        className={classNames(styles.classicNavbarRoot, {
          [styles.isFixed]: isFixed,
          [styles.show]: hasHideOnScroll && isFixed,
          [styles.hide]: hasHideOnScroll && isFixed,
        })}
      >
        <button
          type="button"
          tabIndex={isSidebarOpen ? -1 : 0}
          id="burgerMenuNavbarIcon"
          onClick={toggleSidebar}
          aria-label="Ouvrir le menu déroulant"
          className={styles.burgerMenuIcon}
        >
          <div></div>
          <div></div>
          <div></div>
        </button>
        <div className={styles.logoContainer}>
          <a href="/">
            <img
              alt={name}
              src={`${import.meta.env.BASE_URL}assets/${clientName}/icons/${name}.webp`}
              width={width}
              height={height}
              className={styles.logo}
            />
          </a>
        </div>
        <nav className={styles.mainNavigation}>
          <ul className={styles.content}>
            {categories.map((category) => {
              if (category.sub) {
                return (
                  <li
                    key={category.name}
                    className={classNames(styles.category, "deroulant")}
                  >
                    <a onClick={handleOnClick} className={styles.link}>
                      {category.name}
                    </a>
                    <ul
                      className={classNames(
                        styles.subCategoryContainer,
                        "sous",
                      )}
                    >
                      {category.sub.map((sub) => (
                        <li key={sub.name} className={styles.subCategory}>
                          <a href={sub.link} className={styles.link}>
                            {sub.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={category.name} className={styles.category}>
                  <a href={category.link} className={styles.link}>
                    {category.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={styles.settings}>
          {trad ? (
            <div className={styles.languages}>
              <div>
                {i18n.language === "fr" ? (
                  <button
                    type="button"
                    onClick={() => handleChangeLanguage("en")}
                  >
                    EN
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleChangeLanguage("fr")}
                  >
                    FR
                  </button>
                )}
              </div>
            </div>
          ) : null}
          {darkMode ? (
            <ToggleThemeMode toggleTheme={toggleTheme} theme={theme} />
          ) : null}
          {calendlyUrl ? <CalendlyButton url={calendlyUrl} /> : null}
          {shouldDisplaySocials && components ? (
            <div className={styles.socials}>
              <ul className={styles.socialContent}>{components}</ul>
            </div>
          ) : null}
          {actionButton && actionButton.type === "call" ? (
            <ToggleButton
              type="call"
              displayedText={actionButton.displayedText}
              hiddenText={actionButton.hiddenText}
            />
          ) : null}
        </div>
      </header>
      <div
        id="sidebar"
        className={classNames(styles.sidebar, {
          [styles.isFixed]: isFixed,
          [styles.open]: isSidebarOpen,
        })}
      >
        <button
          type="button"
          tabIndex={isSidebarOpen ? 0 : -1}
          id="burgerMenuSidebarIcon"
          onClick={toggleSidebar}
          aria-label="Fermer le menu déroulant"
          className={styles.burgerMenuIcon}
        >
          <div></div>
          <div></div>
          <div></div>
        </button>
        <ul className={styles.content}>
          {categories.map((category) => {
            if (category.sub) {
              return (
                <li
                  className={classNames(styles.category, "deroulant")}
                  key={category.name}
                >
                  <a onClick={handleOnClick} className={styles.link}>
                    {category.name}
                  </a>
                  <ul
                    className={classNames(styles.subCategoryContainer, "sous")}
                  >
                    {category.sub.map((sub) => (
                      <li key={sub.name} className={styles.subCategory}>
                        <a
                          tabIndex={isSidebarOpen ? 0 : -1}
                          href={sub.link}
                          onClick={toggleSidebar}
                          className={styles.link}
                        >
                          {sub.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={category.name} className={styles.category}>
                <a
                  tabIndex={isSidebarOpen ? 0 : -1}
                  href={category.link}
                  onClick={toggleSidebar}
                  className={styles.link}
                >
                  {category.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </FocusTrapProvider>
  );
};

export default ClassicNavbar;
