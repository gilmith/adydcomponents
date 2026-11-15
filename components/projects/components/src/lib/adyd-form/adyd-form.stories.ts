import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { expect, fn, userEvent, within } from 'storybook/test';
import { of } from 'rxjs';
import { AdydForm } from './adyd-form';
import { AdydImgEditable } from '../adyd-img-editable/adyd-img-editable';
import { API_APPLICATIONS } from '../services/api-applications';
import { ApiApplicationsEnum } from '../services/enum/enum-api-aplications';

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

const executeService = fn(() => of({ ok: true }));

const saveConfig = {
  api: ApiApplicationsEnum.CAMPAIGN,
  operationId: 'saveCampaign',
};

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
      providers: [
        {
          provide: API_APPLICATIONS,
          useValue: { executeService },
        },
      ],
    }),
  ],
  args: {
    initialModel,
    formData,
    saveConfig,
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

    const saveButton = canvas.getByRole('button', { name: /save/i });
    await expect(saveButton).toBeEnabled();

    await userEvent.click(saveButton);

    await expect(executeService).toHaveBeenCalledWith(
      ApiApplicationsEnum.CAMPAIGN,
      expect.objectContaining({ nombre: 'Aragorn' }),
      'saveCampaign',
    );
    await expect(editButton).toBeEnabled();
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

export const ConImagen: Story = {
  decorators: [
    moduleMetadata({
      imports: [AdydImgEditable],
    }),
  ],
  render: args => ({
    props: args,
    template: `
      <adyd-form
        #adydForm
        [initialModel]="initialModel"
        [formData]="formData"
        [saveConfig]="saveConfig"
      >
        <adyd-img-editable
          fieldName="imagen"
          imageUrl="https://placehold.co/600x400"
          [showButtons]="adydForm.editable()"
          title="Imagen del formulario"
        />
      </adyd-form>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const file = new File(['fake'], 'foto.png', { type: 'image/png' });
    const fileInput = canvasElement.querySelector<HTMLInputElement>(
      'input[type="file"]',
    );

    await userEvent.click(canvas.getByRole('button', { name: /edit/i }));
    await userEvent.upload(fileInput!, file);
    await userEvent.click(canvas.getByRole('button', { name: /save/i }));

    await expect(executeService).toHaveBeenCalledWith(
      ApiApplicationsEnum.CAMPAIGN,
      expect.objectContaining({ imagen: file }),
      'saveCampaign',
    );
  },
};
