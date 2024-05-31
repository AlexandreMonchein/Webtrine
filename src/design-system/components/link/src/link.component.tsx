import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WithLink = styled(Link)`
  position: relative;
  width: 100%;
`;

export default function ConditionalLink({ children, condition, to, state }) {
  return !!condition && to ? (
    <WithLink to={to} state={state}>
      {children}
    </WithLink>
  ) : (
    <>{children}</>
  );
}
