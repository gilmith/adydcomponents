import { Meta, StoryObj } from '@storybook/angular';
import { AdydSpinner } from './adyd-spinner';

const meta: Meta<AdydSpinner> = {
  title: 'Moléculas/AdydSpinner',
  component: AdydSpinner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AdydSpinner>;

export const Default: Story = {
  args: {},
};
