import { Meta, StoryObj } from '@storybook/angular';
import { AdydCarousel } from './adyd-carousel';
import { CardItem } from '../model/card-item';

const meta: Meta<AdydCarousel> = {
  title: 'Organismos/AdydCarousel',
  component: AdydCarousel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AdydCarousel>;

const makeCards = (count: number): CardItem[] =>
  Array.from({ length: count }, (_, i) => ({
    title: `Card ${i + 1}`,
    url: `https://picsum.photos/600/337?random=${i + 1}`,
  }));

export const Default: Story = {
  args: {
    cardData: makeCards(14),
  },
};

export const SinControles: Story = {
  name: 'Sin controles (10 o menos)',
  args: {
    cardData: makeCards(8),
  },
};

export const ItemAncho: Story = {
  name: 'Items mas anchos',
  args: {
    cardData: makeCards(20),
    itemWidth: 320,
  },
};
