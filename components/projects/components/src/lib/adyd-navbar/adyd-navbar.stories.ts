import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AdydNavbar } from './adyd-navbar';
import { AUTH_SERVICE, AuthService } from '../services/auth-service';

const createMockAuth = (role: string): AuthService => ({
  hasPermission: (permissions: string[]) => permissions.includes(role),
  logout: () => console.log('logout called'),
  getUser: () => 'Test User',
});

const meta: Meta<AdydNavbar> = {
  title: 'Organismos/AdydNavbar',
  component: AdydNavbar,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('player') },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<AdydNavbar>;

export const Default: Story = {
  render: () => ({
    template: `<adyd-navbar></adyd-navbar>`,
  }),
};

export const AdminUser: Story = {
  render: () => ({
    template: `<adyd-navbar></adyd-navbar>`,
  }),
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('admin') },
      ],
    }),
  ],
};

export const PlayerUser: Story = {
  render: () => ({
    template: `<adyd-navbar></adyd-navbar>`,
  }),
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('player') },
      ],
    }),
  ],
};
