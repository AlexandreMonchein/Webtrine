import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WithLink = styled(Link)`
  position: relative;
  width: 100%;
`;

type ConditionalLinkProps = {
  children: ReactNode;
  condition?: boolean;
  to?: string;
  state?: unknown;
};

export default function ConditionalLink({
  children,
  condition,
  to,
  state,
}: ConditionalLinkProps) {
  return !!condition && to ? (
    <WithLink to={to} state={state}>
      {children}
    </WithLink>
  ) : (
    <>{children}</>
  );
}
