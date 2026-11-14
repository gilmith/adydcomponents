import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { AdydImgEditable } from './adyd-img-editable';
import { API_APPLICATIONS } from '../services/api-applications';

const meta: Meta<AdydImgEditable> = {
  title: 'Átomos/AdydImgEditable',
  component: AdydImgEditable,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: API_APPLICATIONS,
          useValue: {
            executeService: () => of({}),
          },
        },
      ],
    }),
  ],
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
