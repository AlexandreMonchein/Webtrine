import styled from "styled-components";

export const Container = styled.div`
  section:nth-of-type(even) {
    background-color: var(--theme-color-background-1);
  }
  section:nth-of-type(odd) {
    background-color: var(--theme-color-background-2);
  }
`;
