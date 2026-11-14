import { Meta, StoryObj } from '@storybook/angular';
import { AdydCarousel } from './adyd-carousel';
import { AdydCard } from '../adyd-card/adyd-card';

const cards = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: `Carta ${index + 1}`,
}));

const meta: Meta<AdydCarousel> = {
  title: 'Moléculas/AdydCarousel',
  component: AdydCarousel,
  tags: ['autodocs'],
  render: (args) => ({
    props: { ...args, cards },
    moduleMetadata: {
      imports: [AdydCard],
    },
    template: `
      <adyd-carousel [itemWidth]="itemWidth" [controlsThreshold]="controlsThreshold">
        @for (card of cards; track card.id) {
          <adyd-card [id]="card.id" [tooltipText]="card.title">
            <div class="p-3">{{ card.title }}</div>
          </adyd-card>
        }
      </adyd-carousel>
    `,
  }),
};

export default meta;
type Story = StoryObj<AdydCarousel>;

export const Default: Story = {
  args: {
    itemWidth: 220,
    controlsThreshold: 10,
  },
};

export const SinControles: Story = {
  args: {
    itemWidth: 220,
    controlsThreshold: 20,
  },
};
