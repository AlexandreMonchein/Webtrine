import { useSelector } from "react-redux";

import { getSocials } from "../../../store/state.selector";

import {
  FooterContainer,
  LeftSection,
  Logo,
  MiddleSection,
  RightSection,
  SocialContent,
  SocialLogo,
  Socials,
} from "./classicFooter.styled";

export const ClassicFooter = ({ template, toggleTheme, theme }) => {
  const { facebook, instagram, x, linkedIn } = useSelector(getSocials);

  return (
    <FooterContainer>
      <LeftSection>
        <Logo src="https://via.placeholder.com/50" alt="Logo 1" />
        <Logo src="https://via.placeholder.com/50" alt="Logo 2" />
      </LeftSection>
      <MiddleSection>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </MiddleSection>
      <RightSection>
        <Socials>
          <SocialContent>
            {facebook ? (
              <li>
                <SocialLogo>
                  <a
                    href={`https://www.facebook.com/profile.php?id=${facebook?.profileId}`}
                  >
                    <img
                      alt="facebook"
                      src={require(
                        `../../../assets/default/icons/white/facebook-white.png`
                      )}
                    />
                  </a>
                </SocialLogo>
              </li>
            ) : null}
            {instagram ? (
              <li>
                <SocialLogo>
                  <a href={`https://www.instagram.com/${instagram?.profileId}`}>
                    <img
                      alt="instagram"
                      src={require(
                        `../../../assets/default/icons/white/instagram-white.png`
                      )}
                    />
                  </a>
                </SocialLogo>
              </li>
            ) : null}
            {x ? (
              <li>
                <SocialLogo>
                  <a href={`https://twitter.com/${x?.profileId}`}>
                    <img
                      alt="x"
                      src={require(
                        `../../../assets/default/icons/white/x-white.png`
                      )}
                    />
                  </a>
                </SocialLogo>
              </li>
            ) : null}
            {linkedIn ? (
              <li>
                <SocialLogo>
                  <a
                    href={`https://www.linkedin.com/in/${linkedIn?.profileId}`}
                  >
                    <img
                      alt="linkedin"
                      src={require(
                        `../../../assets/default/icons/white/linkedin-white.png`
                      )}
                    />
                  </a>
                </SocialLogo>
              </li>
            ) : null}
          </SocialContent>
        </Socials>
      </RightSection>
    </FooterContainer>
  );
};
