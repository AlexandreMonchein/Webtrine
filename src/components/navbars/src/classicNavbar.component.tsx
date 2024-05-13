import React from "react";
import { NavbarContainer, NavbarLogoContainer } from "./classicNavbar.styled";

export const ClassicNavbar = () => {
  console.warn(">>> ClassicNavbar");

  return (
    <NavbarContainer>
      <NavbarLogoContainer>
        <img alt="LOGO" src="" />
      </NavbarLogoContainer>
      <div>
        <ul>
          <li>Qui Sommes-nous</li>
          <li>Ils nous font confiances</li>
          <li>Nous contacter</li>
        </ul>
      </div>
    </NavbarContainer>
  );
};
