import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AdydMenu } from './adyd-menu';
import { MenuItem } from '../model/menu-item';
import { AUTH_SERVICE, AuthService } from '../services/auth-service';

const createMockAuth = (role: string): AuthService => ({
  hasPermission: (permissions: string[]) => permissions.includes(role),
  logout: () => console.log('logout called'),
  getUser: () => 'Test User',
});

const menuItems: MenuItem[] = [
  { link: '/dashboard', text: 'Dashboard' },
  { link: '/profile', text: 'Profile' },
  { link: '/settings', text: 'Settings' },
];

const meta: Meta<AdydMenu> = {
  title: 'Moléculas/AdydMenu',
  component: AdydMenu,
  tags: ['autodocs'],
  argTypes: {
    menuName: { control: 'text', description: 'Nombre del menú' },
    menuElements: { control: 'object', description: 'Lista de elementos del menú' },
    logout: { control: 'boolean', description: 'Mostrar opción de logout' },
  },
  decorators: [
    moduleMetadata({
      imports: [],
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('player') },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<AdydMenu>;

export const ConLogout: Story = {
  args: {
    menuName: 'User',
    menuElements: menuItems,
    logout: true,
  },
};

export const SinLogout: Story = {
  args: {
    menuName: 'Guest',
    menuElements: menuItems,
    logout: false,
  },
};

export const UnItem: Story = {
  args: {
    menuName: 'Nav',
    menuElements: [{ link: '/', text: 'Home' }],
    logout: false,
  },
};

export const VariosItems: Story = {
  args: {
    menuName: 'Admin',
    menuElements: [
      { link: '/users', text: 'Users' },
      { link: '/roles', text: 'Roles' },
      { link: '/permissions', text: 'Permissions' },
      { link: '/reports', text: 'Reports' },
      { link: '/analytics', text: 'Analytics' },
    ],
    logout: true,
  },
};
