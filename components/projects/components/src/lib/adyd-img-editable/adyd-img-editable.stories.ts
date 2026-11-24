import { Meta, StoryObj } from '@storybook/angular';
import { AdydImgEditable } from './adyd-img-editable';

const meta: Meta<AdydImgEditable> = {
  title: 'Átomos/AdydImgEditable',
  component: AdydImgEditable,
  tags: ['autodocs'],
  args: {
    imageUrl: 'https://placehold.co/600x400',
    title: 'Imagen de ejemplo',
  },
  argTypes: {
    showButtons: {
      control: 'boolean',
      description: 'Muestra el botón de edición sobre la imagen',
    },
    imageUrl: {
      control: 'text',
      description: 'URL de la imagen que se muestra',
    },
    title: {
      control: 'text',
      description: 'Texto alternativo de la imagen',
    },
    fieldName: {
      control: 'text',
      description: 'Nombre del campo con el que se enviará el fichero',
    },
  },
};

export default meta;
type Story = StoryObj<AdydImgEditable>;

export const Editable: Story = {
  args: {
    showButtons: true,
  },
};

export const SoloLectura: Story = {
  args: {
    showButtons: false,
  },
};
