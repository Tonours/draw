---
to: app/components/ui/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.stories.tsx
---

import type { Meta, StoryObj } from '@storybook/react';

import { <%= h.changeCase.pascal(name) %> } from './<%= h.changeCase.pascal(name) %>';

const meta = {
  title: 'UI/<%= h.changeCase.pascal(name) %>',
  component: <%= h.changeCase.pascal(name) %>,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof <%= h.changeCase.pascal(name) %>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default <%= h.changeCase.pascal(name) %>',
  },
};