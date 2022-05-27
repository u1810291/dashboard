import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StorybookRoutes } from 'models/Storybook.model';
import React from 'react';
import { RangeSlider } from './RangeSlider';

export default {
  title: `${StorybookRoutes.UI.root}/RangeSlider`,
  component: RangeSlider,
} as ComponentMeta<typeof RangeSlider>;

const Template: ComponentStory<typeof RangeSlider> = (args) => <RangeSlider {...args} />;

export const Light = Template.bind({});

Light.args = {
};
