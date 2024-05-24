import styled from "styled-components";

export const Content = styled.div`
  section:nth-of-type(even) {
    background-color: var(--background-color-2);
  }
  section:nth-of-type(odd) {
    background-color: var(--background-color-1);
  }
`;
