import { StorybookRoutes } from 'models/Storybook.model';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CopyToClipboard } from './CopyToClipboard';

export default {
  title: `${StorybookRoutes.UI.root}/CopyToClipboard`,
  component: CopyToClipboard,
} as ComponentMeta<typeof CopyToClipboard>;

const Template: ComponentStory<typeof CopyToClipboard> = (args) => <CopyToClipboard {...args} />;

export const Light = Template.bind({});

Light.args = {
  text: 'Successfully copied text',
  children: 'Text to be copied',
};

export const WithCopyText = Template.bind({});

WithCopyText.args = {
  ...Light.args,
  withCopyText: true,
};

export const Overlaid = Template.bind({});

Overlaid.args = {
  ...WithCopyText.args,
  isOverlay: true,
};
