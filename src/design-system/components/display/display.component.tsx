import { useMemo } from "react";

import { useLoadComponents } from "../../utils/useLoadComponents.hook";
import {
  ContentGrid,
  ContentItem,
  Section,
  SvgIcon,
  Text,
  Title,
} from "./display.styled";
import { Datas } from "./display.types";

const FeatureSection = (datas: Datas) => {
  const { title, content } = datas || {};

  const contentItems = useMemo(
    () =>
      Object.entries(content)
        .filter(([_, data]) => data)
        .map(([_, data]) => ({ name: data.name, text: data.text })),
    [content],
  );

  const components = useLoadComponents(contentItems, {
    renderFn: (Component, data) => (
      <ContentItem key={data.name}>
        <SvgIcon>
          <Component color="orange" size={64} />
        </SvgIcon>
        <Text>{data.text}</Text>
      </ContentItem>
    ),
  });

  return (
    <Section>
      <Title>{title}</Title>
      <ContentGrid>{components}</ContentGrid>
    </Section>
  );
};

export default FeatureSection;
