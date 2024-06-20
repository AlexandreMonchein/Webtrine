import React from "react";

import {
  ErrorContainer,
  ErrorGif,
  ErrorText,
  HomeButton,
} from "./pageNotFound.styled";

export const PageNotFound: React.FC = () => {
  return (
    <ErrorContainer>
      <ErrorGif
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
        alt="404 Not Found"
      />
      <ErrorText>Page Not Found</ErrorText>
      <HomeButton to={{ pathname: "/" }}>Go to Home</HomeButton>
    </ErrorContainer>
  );
};
