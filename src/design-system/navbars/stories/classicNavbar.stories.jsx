import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import { stateReducer, initialState } from "../../../store/state.reducer";
import ClassicNavbar from "../src/classicNavbar.component";

// Store mocké pour Storybook avec les données client
const mockStore = configureStore({
  reducer: stateReducer,
  preloadedState: {
    ...initialState,
    client: {
      name: "webtrine", // Nom du client pour les assets
    },
  },
});

export default {
  title: "Design System/Navbars/ClassicNavbar",
  component: ClassicNavbar,
  args: {
    features: {
      isFixed: false,
      hasHideOnScroll: false,
      trad: false,
      darkMode: false,
    },
    categories: [
      {
        name: "Webtrine",
        link: "/",
      },
      {
        name: "prestation",
        link: "/prestation",
      },
      {
        name: "Contact",
        link: "/contact",
      },
    ],
    content: {
      logo: { name: "webtrine_logo_2_blanc_noTitle" },
    },
    toggleTheme: () => {},
    theme: "light",
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
};

const Template = (args) => <ClassicNavbar {...args} />;
export const Playground = Template.bind({});
