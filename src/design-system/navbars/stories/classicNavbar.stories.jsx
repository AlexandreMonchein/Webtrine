import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../../../store";
import ClassicNavbar from "../src/classicNavbar.component";

export default {
  title: "Navbars/ClassicNavbar",
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
      logo: { name: "logo-webtrine-white" },
    },
    toggleTheme: () => {},
    theme: "light",
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
};

const Template = (args) => <ClassicNavbar {...args} />;
export const Playground = Template.bind({});
