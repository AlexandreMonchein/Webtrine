import styled from "styled-components";

export const Container = styled.div`
  section:nth-of-type(even) {
    background-color: var(--back-color-2);
  }
  section:nth-of-type(odd) {
    background-color: var(--back-color-1);
  }
`;
