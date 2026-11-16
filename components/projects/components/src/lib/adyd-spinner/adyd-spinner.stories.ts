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

export const Astrolabio: Story = {
  name: 'Astrolabio arcano',
  args: { variant: 'astrolabe' },
};

export const D20: Story = {
  name: 'D20 rúnico',
  args: { variant: 'd20' },
};

export const Pequeno: Story = {
  name: 'Pequeño',
  args: { size: 'sm' },
};

export const Grande: Story = {
  name: 'Grande',
  args: { size: 'lg' },
};
