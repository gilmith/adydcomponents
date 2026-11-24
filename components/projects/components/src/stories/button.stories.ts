import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { ButtonComponent } from './button.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'Example/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

// Botón AD&D 2e con ornamentos SVG en las esquinas.
// Los estilos .adnd-* vienen de projects/components/src/styles/adyd-theme.css,
// que Storybook carga como style global.
export const AdndCrimson: Story = {
  name: 'AD&D · Carmesí',
  render: () => ({
    template: `
      <!-- Botón estilo AD&D 2e (Compatible con Bootstrap y Angular) -->
      <!-- Sprite oculto: se pega una sola vez al inicio de la app -->
      <svg width="0" height="0" style="display: none" aria-hidden="true">
        <defs>
          <symbol id="adnd-corner-ornament" viewBox="0 0 24 24">
            <path fill="currentColor" d="M2,2 L14,2 L11,5 L5,5 L5,11 L2,14 Z"/>
            <circle cx="8.5" cy="8.5" r="2" fill="currentColor"/>
            <path fill="none" stroke="currentColor" stroke-width="1.5" d="M2,18 C6,18 6,12 12,12 C12,6 18,6 18,2"/>
          </symbol>
        </defs>
      </svg>

      <button type="submit" class="adnd-btn adnd-btn-crimson">
        <svg class="adnd-corner tl"><use href="#adnd-corner-ornament"/></svg>
        <svg class="adnd-corner tr"><use href="#adnd-corner-ornament"/></svg>
        <svg class="adnd-corner bl"><use href="#adnd-corner-ornament"/></svg>
        <svg class="adnd-corner br"><use href="#adnd-corner-ornament"/></svg>

        <span>Forjar Registro</span>
      </button>
    `,
  }),
};
