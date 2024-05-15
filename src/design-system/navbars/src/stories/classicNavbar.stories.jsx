import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../../../../store";
import { ClassicNavbar } from "../classicNavbar/classicNavbar.component";


export default {
  title: "Navbars/ClassicNavbar",
  component: ClassicNavbar,
  args: {},
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

const Template = () => <ClassicNavbar />;
export const Playground = Template.bind({});
