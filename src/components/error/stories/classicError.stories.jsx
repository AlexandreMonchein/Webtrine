import React from 'react';
import { ClassicError } from '../src/classicError.component.tsx';

export default {
  title: 'Error/ClassicError',
  component: ClassicError,
  args: {},
  argTypes: {},
};

const Template = () => (
    <ClassicError />
);
export const Playground = Template.bind({});
