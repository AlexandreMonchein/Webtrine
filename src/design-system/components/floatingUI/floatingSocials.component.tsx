import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { getSocials } from "../../../store/state.selector";
import { useLoadComponents } from "../../utils/useLoadComponents.hook";
import { FloatingContainer, SocialLogo } from "./floatingSocials.styled";

const FloatingSocials: React.FC = () => {
  const socials: { [key: string]: { link: string; color: string } } =
    useSelector(getSocials);

  const socialItems = useMemo(
    () =>
      socials
        ? Object.entries(socials)
            .filter(([_, { link }]) => link)
            .map(([name, { link }]) => ({ name, link }))
        : [],
    [socials],
  );

  const components = useLoadComponents(socialItems, {
    renderFn: (Component, data) => (
      <SocialLogo key={data.name}>
        <a aria-label={data.name} href={data.link}>
          <Component color="full" />
        </a>
      </SocialLogo>
    ),
  }) as React.ReactNode[];

  if (!socials) {
    return null;
  }

  return (
    <FloatingContainer
      role="complementary"
      aria-label="Liens vers les réseaux sociaux"
    >
      {components}
    </FloatingContainer>
  );
};

export default FloatingSocials;
