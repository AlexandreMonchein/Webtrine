import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getClient, getSocials } from "../../store/state.selector";
import styles from "./bigLogosFooter.module.css";
import type { BigLogosFooterProps } from "./bigLogosFooter.types";

const componentFiles = import.meta.glob(
  "../../../assets/**/**/*.component.tsx",
);

const BigLogosFooter: React.FC<BigLogosFooterProps> = (datas) => {
  const [socialComponents, setSocialComponents] = useState<React.ReactNode[]>(
    [],
  );
  const socials: { [key: string]: { link: string; color: string } } =
    useSelector(getSocials);
  const { name: clientName } = useSelector(getClient);

  const { menuSection, brandInfo, logos } = datas;

  useEffect(() => {
    const loadSocialComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];

      if (socials) {
        const socialEntries = Object.entries(socials);
        const componentPromises = socialEntries.map(
          async ([name, { link }]) => {
            try {
              if (link) {
                const componentPath = `../../../assets/icons/${name}.component.tsx`;
                const module = componentFiles[componentPath];

                if (module) {
                  const resolvedModule = await module();
                  // @ts-expect-error TODO: to fix
                  const Component = resolvedModule.default;

                  return (
                    <li key={name}>
                      <a
                        className={styles.socialLink}
                        href={link}
                        aria-label={`Suivre sur ${name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Component />
                        <span className={styles.visuallyHidden}>{name}</span>
                      </a>
                    </li>
                  );
                }
              }
              return null;
            } catch (error) {
              console.error(`Error loading social component: ${name}`, error);
              return null;
            }
          },
        );

        const resolvedComponents = await Promise.all(componentPromises);
        loadedComponents.push(...resolvedComponents.filter(Boolean));
      }

      setSocialComponents(loadedComponents);
    };

    loadSocialComponents();
  }, [socials]);

  return (
    <footer
      className={styles.bigLogosFooterRoot}
      role="contentinfo"
      data-testid="bigLogosFooterRoot"
    >
      <div className={styles.footerContent}>
        <div
          className={classNames(styles.footerGrid, {
            [styles.isLogo]: logos && logos.length > 0,
          })}
        >
          {logos && logos.length > 0 ? (
            <div className={styles.logosSection}>
              <div className={styles.logosGrid}>
                {logos.map((logo) => (
                  <div className={styles.logoItem} key={`${logo.name}`}>
                    {logo.url ? (
                      <a
                        className={styles.logoLink}
                        href={logo.url}
                        aria-label={`Aller vers ${logo.alt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className={styles.logoImage}
                          src={`${import.meta.env.BASE_URL}assets/${clientName}/icons/${logo.name}.webp`}
                          alt={logo.alt}
                          loading="lazy"
                          width="128"
                          height="128"
                        />
                      </a>
                    ) : (
                      <img
                        className={styles.logoImage}
                        src={`${import.meta.env.BASE_URL}assets/${clientName}/icons/${logo.name}.webp`}
                        alt={logo.alt}
                        loading="lazy"
                        width="128"
                        height="128"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {menuSection ? (
            <div className={styles.menuSection}>
              <h2 className={styles.menuTitle}>{menuSection.title}</h2>
              <nav aria-label="Liens du footer">
                <ul className={styles.menuList}>
                  {menuSection.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className={styles.menuLink}
                        href={link.url}
                        aria-label={`Aller vers ${link.label}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ) : null}

          {brandInfo ? (
            <div className={styles.brandSection}>
              <h2 className={styles.brandTitle}>{brandInfo.title}</h2>
              <div
                className={styles.brandDescription}
                dangerouslySetInnerHTML={{
                  __html: brandInfo.description,
                }}
              />
              {brandInfo.additionalText && (
                <p className={styles.additionalText}>
                  {brandInfo.additionalText}
                </p>
              )}
            </div>
          ) : null}
        </div>

        {socialComponents.length > 0 && (
          <div className={styles.socialSection}>
            <nav aria-label="Liens vers les réseaux sociaux">
              <ul className={styles.socialList}>{socialComponents}</ul>
            </nav>
            <nav aria-label="© Réalisé par Webtrine 2025 - tout droit réservé">
              <a className={styles.siteRef} href="https://www.webtrine.fr">
                Webtrine 2025 - tous droits réservés.
              </a>
            </nav>
          </div>
        )}
      </div>
    </footer>
  );
};

export default BigLogosFooter;
