import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { getClient } from "../../store/state.selector";
import { getLogoDimensions } from "../utils/dimensions.utils";
import { useLoadComponent } from "../utils/useLoadComponents.hook";
import styles from "./clearGlassNavbar.module.css";
import type { ClearGlassNavbarProps } from "./clearGlassNavbar.types";

export const ClearGlassNavbar = ({
  logo,
  shape = "horizontal-wide",
  links,
  activePath,
  "data-testid": dataTestid,
}: ClearGlassNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPosition = useRef(0);
  const { i18n } = useTranslation();
  const location = useLocation();
  const { name: clientName } = useSelector(getClient);

  const CloseIcon = useLoadComponent("close");
  const FrenchFlag = useLoadComponent("frenchFlag");
  const EnglishFlag = useLoadComponent("englishFlag");

  const currentPath = activePath || location.pathname;
  const { width, height } = getLogoDimensions(shape);
  const logoSrc = `${import.meta.env.BASE_URL}assets/${clientName}/icons/${logo}.webp`;

  useEffect(() => {
    if (isMenuOpen) {
      scrollPosition.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollPosition.current);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    closeMenu();
  };

  return (
    <>
      <nav
        className={classNames(styles.clearGlassNavbarRoot)}
        data-testid={dataTestid}
      >
        <a href="/" className={styles.logoLink}>
          <img
            src={logoSrc}
            alt={logo}
            className={styles.logo}
            width={width}
            height={height}
          />
        </a>
        <button
          type="button"
          className={styles.burgerButton}
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>
      </nav>
      <div
        className={classNames(styles.menuOverlay, {
          [styles.menuOverlayOpen]: isMenuOpen,
        })}
        onClick={closeMenu}
      >
        <div
          className={classNames(styles.menuPanel, {
            [styles.menuPanelOpen]: isMenuOpen,
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            {CloseIcon && <CloseIcon size={32} color="currentColor" />}
          </button>
          <div className={styles.languageSelector}>
            <button
              type="button"
              className={classNames(styles.langButton, {
                [styles.langButtonActive]: i18n.language === "en",
              })}
              onClick={() => changeLanguage("en")}
              aria-label="Switch to English"
            >
              {EnglishFlag && <EnglishFlag size={28} />}
            </button>
            <button
              type="button"
              className={classNames(styles.langButton, {
                [styles.langButtonActive]: i18n.language === "fr",
              })}
              onClick={() => changeLanguage("fr")}
              aria-label="Passer en français"
            >
              {FrenchFlag && <FrenchFlag size={28} />}
            </button>
          </div>
          <ul className={styles.menuLinks}>
            {links.map((link) => {
              const isActive = link.path === currentPath;
              return (
                <li key={link.path} className={styles.menuLinkItem}>
                  <Link
                    to={link.path}
                    className={classNames(styles.menuLink, {
                      [styles.menuLinkActive]: isActive,
                    })}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                  {!isActive && <div className={styles.menuLinkUnderline} />}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ClearGlassNavbar;
