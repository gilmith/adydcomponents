import type { Meta, StoryObj } from '@storybook/angular';
import { AdydError404 } from './adyd-error-404';

const meta: Meta<AdydError404> = {
  component: AdydError404,
  title: 'Error/404',
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `<adyd-error-404></adyd-error-404>`,
  }),
};

export default meta;
type Story = StoryObj<AdydError404>;

export const Default: Story = {
  args: {},
};
