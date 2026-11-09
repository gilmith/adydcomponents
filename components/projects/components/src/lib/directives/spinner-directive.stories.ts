import { Meta, StoryObj } from '@storybook/angular';
import { SpinnerDirective } from './spinner-directive';

const meta: Meta = {
  title: 'Directivas/SpinnerDirective',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Mostrar: Story = {
  render: () => ({
    template: `
      <div class="p-4">
        <div spinner>
          <p>Contenido con spinner visible</p>
        </div>
      </div>
    `,
  }),
};

export const Ocultar: Story = {
  render: () => ({
    template: `
      <div class="p-4">
        <div [spinner]="false">
          <p>Contenido sin spinner</p>
        </div>
      </div>
    `,
  }),
};
