import styled from "styled-components";

export const Container = styled.div`
  min-height: 95vh;
  background-color: var(--theme-color-background-2);

  &.single-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  section:nth-of-type(even) {
    background-color: var(--theme-color-background-1);
  }
  section:nth-of-type(odd) {
    background-color: var(--theme-color-background-2);
  }
`;
