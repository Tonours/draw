import type { Meta, StoryObj } from '@storybook/react';

import { Toolbar } from './Toolbar';
import IconCircle from '~/icons/icon-circle.svg?react';
import IconTrash from '~/icons/icon-trash.svg?react';

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

export const WithItems: Story = {
  args: {
    children: (
      <>
        <Toolbar.Item>
          <IconCircle className="w-[6px] h-[6px]" />
        </Toolbar.Item>
        <Toolbar.Item>
          <IconCircle className="w-[10px] h-[10px]" />
        </Toolbar.Item>
        <Toolbar.Item className="col-span-2">
          <IconTrash className="w-3 h-[auto]" />
        </Toolbar.Item>
      </>
    ),
  },
};
