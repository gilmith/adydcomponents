import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AdydCarousel } from './adyd-carousel';
import { AdydCard } from '../adyd-card/adyd-card';
import { AUTH_SERVICE, AuthService } from '../services/auth-service';

function createMockAuth(role: 'admin' | 'player'): AuthService {
  return {
    hasPermission: () => true,
    logout: () => console.log('logout'),
    getUser: () => 'test-user',
  };
}

const meta: Meta<AdydCarousel> = {
  title: 'Organismos/AdydCarousel',
  component: AdydCarousel,
  tags: ['autodocs'],
  argTypes: {
    itemWidth: { control: 'number', description: 'Ancho de cada item' },
    controlsThreshold: { control: 'number', description: 'Umbral para mostrar controles' },
  },
};

export default meta;
type Story = StoryObj<AdydCarousel>;

export const Default: Story = {
  render: () => ({
    component: AdydCarousel,
    componentProperties: {
      itemWidth: 220,
    },
    template: `
      <adyd-carousel>
        @for (item of cards; track item.id) {
          <adyd-card [id]="item.id" tooltipText="Card {{ item.id }}">
            <img [attr.aria-label]="item.title" [alt]="item.title" style="width: 100%; height: 200px; background: #ccc;" />
          </adyd-card>
        }
      </adyd-carousel>
    `,
  }),
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('player') },
      ],
    }),
  ],
};

export const SinControles: Story = {
  name: 'Sin controles (10 o menos)',
  render: () => ({
    component: AdydCarousel,
    componentProperties: {
      itemWidth: 220,
      controlsThreshold: 15,
    },
    template: `
      <adyd-carousel>
        @for (item of cards; track item.id) {
          <adyd-card [id]="item.id" tooltipText="Card {{ item.id }}">
            <img [attr.aria-label]="item.title" [alt]="item.title" style="width: 100%; height: 200px; background: #ccc;" />
          </adyd-card>
        }
      </adyd-carousel>
    `,
  }),
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('player') },
      ],
    }),
  ],
};

export const ItemAncho: Story = {
  name: 'Items mas anchos',
  render: () => ({
    component: AdydCarousel,
    componentProperties: {
      itemWidth: 320,
    },
    template: `
      <adyd-carousel>
        @for (item of cards; track item.id) {
          <adyd-card [id]="item.id" tooltipText="Card {{ item.id }}">
            <img [attr.aria-label]="item.title" [alt]="item.title" style="width: 100%; height: 200px; background: #ccc;" />
          </adyd-card>
        }
      </adyd-carousel>
    `,
  }),
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('player') },
      ],
    }),
  ],
};
