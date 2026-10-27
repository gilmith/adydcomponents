import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AdydCard } from './adyd-card';
import { AdminDirective } from '../directives/admin-directive';
import { PlayerDirective } from '../directives/player-directive';
import { AUTH_SERVICE, AuthService } from '../services/auth-service';
import { API_APPLICATIONS } from '../services/api-applications';

const createMockAuth = (role: string): AuthService => ({
  hasPermission: (permissions: string[]) => permissions.includes(role),
});

const meta: Meta<AdydCard> = {
  title: 'Moléculas/AdydCard',
  component: AdydCard,
  tags: ['autodocs'],
  argTypes: {
    imageUrl: { control: 'text', description: 'URL de la imagen (ngSrc)' },
    title: { control: 'text', description: 'Título / texto alternativo' },
    description: { control: 'text', description: 'Descripción de la tarjeta' },
    id: { control: 'number', description: 'ID del card' },
    showButtons: {control: 'boolean', description: 'mostrar o no los botones segun este o no maximada la card' },
  },
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('player') },
        {
          provide: API_APPLICATIONS,
          useValue: {
            executeService: (api: any, data: Record<string, unknown>) => {
              console.log('API call:', api, data);
            },
          },
        },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<AdydCard>;

export const BasicAdydCard: Story = {
  args: {
    imageUrl:
      'https://picsum.photos/600/337?random=1',
    title: 'Poster de prueba',
    description: 'descripcion de lo que sea',
    id: 1,
    showButtons: true
  },
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('player') },
        {
          provide: API_APPLICATIONS,
          useValue: {
            executeService: (api: any, data: Record<string, unknown>) => {
              console.log('API call:', api, data);
            },
          },
        },
      ],
    }),
  ],
};

export const BasicAdydCardAdmin: Story = {
  args: {
    imageUrl:
      'https://picsum.photos/600/337?random=2',
    title: 'Poster de prueba Admin',
    description: 'descripcion de lo que sea',
    id: 2,
    showButtons: true
  },
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('admin') },
        {
          provide: API_APPLICATIONS,
          useValue: {
            executeService: (api: any, data: Record<string, unknown>) => {
              console.log('API call:', api, data);
            },
          },
        },
      ],
    }),
  ],
};

export const BasicAdydCardPlayer: Story = {
  args: {
    imageUrl:
      'https://picsum.photos/600/337?random=3',
    title: 'Poster de prueba Player',
    description: 'descripcion de lo que sea',
    id: 3,
    showButtons: true
  },
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('player') },
        {
          provide: API_APPLICATIONS,
          useValue: {
            executeService: (api: any, data: Record<string, unknown>) => {
              console.log('API call:', api, data);
            },
          },
        },
      ],
    }),
  ],
};
