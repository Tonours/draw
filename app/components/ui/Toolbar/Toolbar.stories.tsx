import type { Meta, StoryObj } from '@storybook/react';

import { Toolbar } from './Toolbar';

const meta = {
  title: 'UI/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Toolbar',
  },
};