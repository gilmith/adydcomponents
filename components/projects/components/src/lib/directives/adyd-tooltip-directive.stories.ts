import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AdydTooltipDirective } from './adyd-tooltip-directive';

const meta: Meta = {
  title: 'Directivas/AdydTooltipDirective',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AdydTooltipDirective],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Top: Story = {
  render: () => ({
    template: `
      <div class="d-flex gap-3 p-4">
        <button tooltipText="Tooltip en la parte superior" tooltipPlacement="top">
          Hover aquí (top)
        </button>
        <button tooltipText="Tooltip a la derecha" tooltipPlacement="right">
          Hover aquí (right)
        </button>
        <button tooltipText="Tooltip a la izquierda" tooltipPlacement="left">
          Hover aquí (left)
        </button>
        <button tooltipText="Tooltip abajo" tooltipPlacement="bottom">
          Hover aquí (bottom)
        </button>
      </div>
    `,
  }),
};

export const DefaultTop: Story = {
  render: () => ({
    template: `
      <div class="p-4">
        <span tooltipText="Este es un tooltip con placement por defecto (top)">
          Pasa el mouse por aquí
        </span>
      </div>
    `,
  }),
};

export const ConBoton: Story = {
  render: () => ({
    template: `
      <div class="p-4">
        <button
          tooltipText="Click para guardar"
          tooltipPlacement="top"
          class="btn btn-primary">
          Guardar
        </button>
        <button
          tooltipText="Click para cancelar"
          tooltipPlacement="bottom"
          class="btn btn-secondary">
          Cancelar
        </button>
      </div>
    `,
  }),
};
