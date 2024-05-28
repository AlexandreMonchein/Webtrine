import styled from "styled-components";

import { Card } from "./card.component";

export const Display = ({ template }) => {
  console.warn(">>> template", template);
  return (
    <DisplayWrapper>
      <MainColumn>
        <Wrapper>
          {template.datas.inventory.map((data) => (
            <CardWrapper key={data.slug}>
              <Card {...data} />
            </CardWrapper>
          ))}
        </Wrapper>
      </MainColumn>
    </DisplayWrapper>
  );
};

const DisplayWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  gap: 32px;
  padding: 120px 40px;
`;

const MainColumn = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

const CardWrapper = styled.div`
  min-width: 275px;
  flex: 1;
`;
