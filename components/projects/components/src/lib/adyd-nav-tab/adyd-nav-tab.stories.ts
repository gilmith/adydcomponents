import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AdydNavTab } from './adyd-nav-tab';
import { AdydTab } from './adyd-tab';

const meta: Meta<AdydNavTab> = {
  title: 'Moléculas/AdydNavTab',
  component: AdydNavTab,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AdydTab],
    }),
  ],
};

export default meta;
type Story = StoryObj<AdydNavTab>;

export const Default: Story = {
  render: () => ({
    template: `
      <adyd-nav-tab>
        <ng-template adydTab title="Inicio">
          <h3>Inicio</h3>
          <p>Contenido de la pestaña Inicio.</p>
        </ng-template>

        <ng-template adydTab title="Perfil">
          <h3>Perfil</h3>
          <p>Datos del usuario.</p>
        </ng-template>

        <ng-template adydTab title="Proyectos">
          <h3>Proyectos</h3>
          <ul>
            <li>Proyecto A</li>
            <li>Proyecto B</li>
          </ul>
        </ng-template>

        <ng-template adydTab title="Equipo">
          <h3>Equipo</h3>
          <p>Miembros del equipo.</p>
        </ng-template>

        <ng-template adydTab title="Ajustes">
          <h3>Ajustes</h3>
          <p>Configuración de la cuenta.</p>
        </ng-template>
      </adyd-nav-tab>
    `,
  }),
};
