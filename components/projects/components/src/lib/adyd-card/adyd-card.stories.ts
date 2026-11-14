import { Meta, StoryObj } from '@storybook/angular';
import { AdydCard } from './adyd-card';

const meta: Meta = {
  title: 'Moléculas/AdydCard',
  component: 'AdydCard',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};
