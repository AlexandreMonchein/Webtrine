import styled from "styled-components";

export const DisplayWrapper = styled.section`
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  gap: 32px;
  padding: 40px 40px;
`;

export const MainColumn = styled.div`
  flex: 1;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 32px;
  padding-bottom: 32px;
`;

export const CardWrapper = styled.div`
  min-width: 275px;
  flex: 1;
`;
