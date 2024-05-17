import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  height: 48px;
  position: relative;
  z-index: var(--z-index-navbars);
  font-size: var(--navbar-font-size);

  background-color: var(--color-quaternary);
  color: var(--color-primary);
`;
export const Logo = styled.div`
  img {
    width: 150px;
  }
`;

export const MainNavigation = styled.nav`
  width: 100%;
  margin: 0 auto;
  position: sticky;
  top: 0px;

  ul li:hover .sous {
    display: block;
    width: 200%;
  }

  .deroulant > a::after {
    content: " >";
    font-size: 12px;
  }
`;
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
  align-items: center;
  justify-content: center;
`;

export const Links = styled.a`
  display: block;

  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;

  color: var(--color-primary);
  border-bottom: 2px solid transparent;
  padding: 10px 0px;

  &:hover {
    color: orange;
    border-bottom: 2px solid gold;
  }
`;

export const Content = styled(DefaultContent)`
  gap: 24px;

  &::after {
    content: "";
    display: table;
    clear: both;
  }
`;

export const Category = styled.li`
  float: left;
  width: 100px;
  text-align: center;
  position: relative;
`;

export const SubCategory = styled.li``;

export const SubCategoryContainer = styled.ul`
  display: none;
  list-style-type: none;
  box-shadow: 0px 1px 2px #ccc;
  background-color: var(--color-secondary);
  position: absolute;
  width: 100%;
  z-index: var(--z-index-navbars);

  ${SubCategory} {
    float: none;
    width: 100%;
    text-align: left;
  }

  ${Links} {
    color: var(--color-quinary);
    padding: 10px;
    border-bottom: none;

    &:hover {
      border-bottom: none;
      background-color: rgba(200, 200, 200, 0.1);
    }
  }
`;

export const SocialContent = styled(DefaultContent)`
  gap: 12px;
`;

export const Languages = styled.div`
  display: flex;
  align-items: center;

  font-weight: bold;
`;
