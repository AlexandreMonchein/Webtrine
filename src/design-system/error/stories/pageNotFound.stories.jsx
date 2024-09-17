import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";

import store from "../../../store";
import { PageNotFound } from "../src/pageNotFound.component";

const Wrapper = styled.div`
  background-color: lightgray;
`;

export default {
  title: "Error/PageNotFound",
  component: PageNotFound,
  args: {},
  argTypes: {},
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <Wrapper>
            <Story />
          </Wrapper>
        </BrowserRouter>
      </Provider>
    ),
  ],
};

const Template = () => <PageNotFound />;
export const Playground = Template.bind({});
