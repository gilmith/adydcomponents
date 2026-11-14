import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AdminDirective } from './admin-directive';
import { AUTH_SERVICE, AuthService } from '../services/auth-service';

const createMockAuth = (role: string): AuthService => ({
  hasPermission: (permissions: string[]) => permissions.includes(role),
  logout: () => console.log('logout called'),
  getUser: () => 'Test User',
});

const meta: Meta = {
  title: 'Directivas/AdminDirective',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AdminDirective],
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('admin') },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const AdminVisible: Story = {
  render: () => ({
    template: `
      <div>
        <p *AdminDirective>Este contenido es visible solo para admin</p>
        <h3>Panel de Administración</h3>
        <ul>
          <li *AdminDirective>Gestión de usuarios</li>
          <li *AdminDirective>Configuración del sistema</li>
          <li *AdminDirective>Logs y auditorías</li>
        </ul>
      </div>
    `,
  }),
};

export const SinPermiso: Story = {
  render: () => ({
    template: `
      <div>
        <p *AdminDirective>Este contenido es visible solo para admin</p>
        <h3>Panel de Administración</h3>
      </div>
    `,
    props: {},
  }),
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('player') },
      ],
    }),
  ],
};
