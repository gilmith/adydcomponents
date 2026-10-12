import { Meta, StoryObj } from '@storybook/angular';
import { AdydCard } from './adyd-card';
import { action } from 'storybook/actions';

const meta: Meta<AdydCard> = {
  title: 'Moléculas/AdydCard',
  component: AdydCard,
  tags: ['autodocs'],
  argTypes: {
    // Permite editar los inputs dinámicamente en el panel de Storybook
    imageUrl: { control: 'text', description: 'URL de la imagen (ngSrc)' },
    title: { control: 'text', description: 'Título / texto alternativo' },
  },
};

export default meta;
type Story = StoryObj<AdydCard>;

// Historia principal con datos de prueba
export const BasicAdydCard: Story = {
  args: {
    imageUrl:
      'http://localhost:8888/buckets/campaigns/141-1413474_dungeons-dragons-advanced-dungeons-and-dragons-logo.png',
    title: 'Poster de prueba',
    description: 'descripcion de lo que sea',
    id: 1,
    action: action('click'),
  },
};
