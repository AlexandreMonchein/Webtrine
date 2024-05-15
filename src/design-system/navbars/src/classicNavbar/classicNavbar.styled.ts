import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;

  background-color: var(--color-quaternary);
  color: var(--color-primary);
`;
export const Logo = styled.div`
  img {
    width: 40%;
  }
`;

export const MainNavigation = styled.div``;
export const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
export const SocialLogo = styled.div`
  img {
    width: 28px;
    height: 28px;
  }
`;
export const DefaultContent = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
`;

export const Links = styled.a`
  font-size: 110%;
  font-weight: bold;
  text-decoration: none;
  color: white;
  font-family: NexaBold;
  text-transform: uppercase;
  cursor: pointer;
`;

export const Content = styled(DefaultContent)`
  gap: 24px;
`;

export const SocialContent = styled(DefaultContent)`
  gap: 12px;
`;

export const Languages = styled.div`
  display: flex;
  align-items: center;

  font-size: 110%;
  font-weight: bold;
`;