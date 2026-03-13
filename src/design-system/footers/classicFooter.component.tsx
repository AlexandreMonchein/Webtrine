import { useMemo } from "react";
import { useSelector } from "react-redux";

import {
  getClient,
  getSocials,
  getTemplates,
} from "../../store/state.selector";
import { getLogoDimensions } from "../utils/dimensions.utils";
import { useLoadComponents } from "../utils/useLoadComponents.hook";
import styles from "./classicFooter.module.css";
import type {
  ClassicFooterProps,
  LegalItem,
  SocialItem,
} from "./classicFooter.types";

const ClassicFooter = (props: ClassicFooterProps) => {
  const { name: clientName } = useSelector(getClient);
  const socials: { [key: string]: { link: string; color: string } } =
    useSelector(getSocials);
  const legals: LegalItem[] = useSelector(getTemplates).filter(
    (template: LegalItem) => template.type === "legals",
  );

  const { logo } = props || {};
  const { name, alt, link, shape } = logo || {};
  const { width, height } = getLogoDimensions(shape);

  const socialItems: SocialItem[] = useMemo(
    () =>
      socials
        ? Object.entries(socials)
            .filter(([_, { link }]) => link)
            .map(([name, { link, color }]) => ({ name, link, color }))
        : [],
    [socials],
  );

  const components = useLoadComponents(socialItems, {
    renderFn: (Component, data) => (
      <li key={data.name}>
        <div className={styles.socialLogo}>
          <a aria-label={data.name} href={data.link}>
            <Component color={data.color} />
          </a>
        </div>
      </li>
    ),
  }) as React.ReactNode[];

  return (
    <footer
      className={styles.classicFooterRoot}
      data-testid="classicFooterRoot"
    >
      <div className={styles.leftSection}>
        {logo && (
          <a href={link} key={name}>
            <img
              className={styles.logo}
              alt={alt}
              src={`${import.meta.env.BASE_URL}assets/${clientName}/icons/${name}.webp`}
              width={width}
              height={height}
            />
          </a>
        )}
      </div>
      <div className={styles.middleSection}>
        <div className={styles.topSection}>
          <a
            className={styles.siteRef}
            href="https://www.webtrine.fr"
            style={{ color: "var(--theme-color-foreground-1)" }}
          >
            Webtrine 2025 - tous droits réservés.
          </a>
        </div>
        <div className={styles.bottomSection}>
          {legals.map((legal) => (
            <a
              className={styles.siteRef}
              key={legal.datas.type}
              href={legal.datas.type}
            >
              {legal.datas.type}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.socials}>
          <ul className={styles.socialContent}>{components}</ul>
        </div>
      </div>
    </footer>
  );
};

export default ClassicFooter;
