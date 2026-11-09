import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PlayerDirective } from './player-directive';
import { AUTH_SERVICE, AuthService } from '../services/auth-service';

const createMockAuth = (role: string): AuthService => ({
  hasPermission: (permissions: string[]) => permissions.includes(role),
  logout: () => console.log('logout called'),
  getUser: () => 'Test User',
});

const meta: Meta = {
  title: 'Directivas/PlayerDirective',
  tags: ['autodocs'],
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
type Story = StoryObj;

export const PlayerVisible: Story = {
  render: () => ({
    template: `
      <div>
        <p *PlayerDirective>Zona visible para jugadores</p>
        <h3>Panel de Jugador</h3>
        <ul>
          <li *PlayerDirective>Mis campañas</li>
          <li *PlayerDirective>Historial de partidas</li>
          <li *PlayerDirective>Perfil de personaje</li>
        </ul>
      </div>
    `,
  }),
};

export const SinPermiso: Story = {
  render: () => ({
    template: `
      <div>
        <p *PlayerDirective>Zona visible para jugadores</p>
        <h3>Panel de Jugador</h3>
      </div>
    `,
    props: {},
  }),
  decorators: [
    moduleMetadata({
      providers: [
        { provide: AUTH_SERVICE, useValue: createMockAuth('admin') },
      ],
    }),
  ],
};
