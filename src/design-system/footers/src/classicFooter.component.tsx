import { useMemo } from "react";
import { useSelector } from "react-redux";

import {
  getClient,
  getSocials,
  getTemplates,
} from "../../../store/state.selector";
import { getLogoDimensions } from "../../utils/dimensions.utils";
import { useLoadComponents } from "../../utils/useLoadComponents.hook";
import {
  BottomSection,
  FooterContainer,
  LeftSection,
  Logo,
  MiddleSection,
  RightSection,
  SiteRef,
  SocialContent,
  SocialLogo,
  Socials,
  TopSection,
} from "./classicFooter.styled";

const ClassicFooter = (props) => {
  const { name: clientName } = useSelector(getClient);
  const socials: { [key: string]: { link: string; color: string } } =
    useSelector(getSocials);
  const legals = useSelector(getTemplates).filter(
    (template) => template.type === "legals",
  );

  const { logo } = props || {};
  const { name, alt, link, shape } = logo || {};
  const { width, height } = getLogoDimensions(shape);

  const socialItems = useMemo(
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
        <SocialLogo>
          <a aria-label={data.name} href={data.link}>
            <Component color={data.color} />
          </a>
        </SocialLogo>
      </li>
    ),
  });

  return (
    <FooterContainer>
      <LeftSection>
        {logo && (
          <a href={link} key={name}>
            <Logo
              alt={alt}
              src={`${import.meta.env.BASE_URL}assets/${clientName}/icons/${name}.webp`}
              width={width}
              height={height}
            />
          </a>
        )}
      </LeftSection>
      <MiddleSection>
        <TopSection>
          <SiteRef href="https://www.webtrine.fr" style={{ color: "unset" }}>
            Webtrine 2025 - tous droits réservés.
          </SiteRef>
        </TopSection>
        <BottomSection>
          {legals.map((legal) => (
            <SiteRef key={legal.datas.type} href={legal.datas.type}>
              {legal.datas.type}
            </SiteRef>
          ))}
        </BottomSection>
      </MiddleSection>
      <RightSection>
        <Socials>
          <SocialContent>{components}</SocialContent>
        </Socials>
      </RightSection>
    </FooterContainer>
  );
};

export default ClassicFooter;
