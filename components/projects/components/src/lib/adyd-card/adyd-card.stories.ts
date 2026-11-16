import { Meta, StoryObj } from '@storybook/angular';
import { AdydCard } from './adyd-card';

const meta: Meta<AdydCard> = {
  title: 'Moléculas/AdydCard',
  component: AdydCard,
  tags: ['autodocs'],
  args: {
    id: 1,
    tooltipText: 'Información de la carta',
    theme: 'parchment',
  },
  render: (args) => ({
    props: args,
    template: `
      <adyd-card [id]="id" [tooltipText]="tooltipText" [theme]="theme">
        <img src="https://placehold.co/220x300" alt="Carta de ejemplo" />
      </adyd-card>
    `,
  }),
};

export default meta;
type Story = StoryObj<AdydCard>;

export const Default: Story = {};

export const SinTooltip: Story = {
  args: {
    tooltipText: '',
  },
};

export const Carmesi: Story = {
  name: 'Carmesí',
  args: {
    theme: 'crimson',
  },
};

export const Oro: Story = {
  name: 'Oro',
  args: {
    theme: 'gold',
  },
};

export const Arcano: Story = {
  name: 'Arcano',
  args: {
    theme: 'arcane',
  },
};
