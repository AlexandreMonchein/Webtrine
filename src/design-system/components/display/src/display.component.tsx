import styled from "styled-components";

import { Card } from "./card.component";
import {
  CardWrapper,
  DisplayWrapper,
  MainColumn,
  Wrapper,
} from "./display.styled";

export const Display = ({ template }) => {
  console.warn(">>> template", template);
  return (
    <DisplayWrapper>
      <MainColumn>
        <Wrapper>
          {template.inventory.map((data) => (
            <CardWrapper key={data.slug}>
              <Card {...data} />
            </CardWrapper>
          ))}
        </Wrapper>
      </MainColumn>
    </DisplayWrapper>
  );
};
