import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { expect, userEvent, within } from 'storybook/test';
import { AdydForm } from './adyd-form';

const formData: FormlyFieldConfig[] = [
  {
    key: 'id',
    type: 'input',
    props: {
      label: 'ID',
      description: 'Campo bloqueado: no se habilita porque tiene locked: true',
      locked: true,
    },
  },
  {
    key: 'nombre',
    type: 'input',
    props: {
      label: 'Nombre',
      placeholder: 'Introduce el nombre',
      required: true,
    },
  },
  {
    key: 'email',
    type: 'input',
    props: {
      label: 'Email',
      type: 'email',
      placeholder: 'correo@ejemplo.com',
      required: true,
    },
  },
  {
    key: 'descripcion',
    type: 'textarea',
    props: {
      label: 'Descripción',
      placeholder: 'Escribe una descripción',
      rows: 3,
    },
  },
  {
    key: 'activo',
    type: 'checkbox',
    props: {
      label: 'Activo',
      description: 'Campo bloqueado: no se habilita porque tiene locked: true',
      locked: true,
    },
  },
];

const initialModel = {
  id: 1,
  nombre: 'Aragorn',
  email: 'aragorn@example.com',
  descripcion: 'Montaraz del Norte y heredero de Gondor.',
  activo: true,
};

const meta: Meta<AdydForm> = {
  title: 'Moléculas/AdydForm',
  component: AdydForm,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        FormlyModule.forRoot(),
        FormlyBootstrapModule,
      ],
    }),
  ],
  args: {
    initialModel,
    formData,
  },
};

export default meta;
type Story = StoryObj<AdydForm>;

export const SoloLectura: Story = {};

export const Editable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editButton = canvas.getByRole('button', { name: /edit/i });
    const id = canvas.getByLabelText(/^id$/i);
    const nombre = canvas.getByLabelText(/nombre/i);
    const activo = canvas.getByLabelText(/activo/i);

    await expect(id).toBeDisabled();
    await expect(nombre).toBeDisabled();
    await expect(activo).toBeDisabled();

    await userEvent.click(editButton);

    await expect(id).toBeDisabled();
    await expect(nombre).toBeEnabled();
    await expect(activo).toBeDisabled();
    await expect(canvas.getByRole('button', { name: /save/i })).toBeEnabled();
  },
};

export const ModeloVacio: Story = {
  args: {
    initialModel: {
      id: null,
      nombre: '',
      email: '',
      descripcion: '',
      activo: false,
    },
  },
};
