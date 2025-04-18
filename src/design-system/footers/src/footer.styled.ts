import styled from "styled-components";

export const FooterContainer = styled.div`
  background-color: #f8f8f8;
  padding: 2rem 1rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MiddleSection = styled.div``;

export const RightSection = styled.div``;

export const Logo = styled.img`
  width: 120px;
  height: auto;
`;

export const Text = styled.p`
  font-size: 0.9rem;
  color: #333;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  a {
    color: #333;
    transition: color 0.3s;
    &:hover {
      color: #0077cc;
    }
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const FooterLink = styled.a`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #000;
  }
`;

export const Divider = styled.hr`
  margin: 2rem 0 1rem;
  border: none;
  border-top: 1px solid #000;
`;

export const BottomBar = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: #666;
`;
