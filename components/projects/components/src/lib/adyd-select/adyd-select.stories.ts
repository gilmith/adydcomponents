import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyModule,
} from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { AdydSelect } from './adyd-select';

const meta: Meta<AdydSelect> = {
  title: 'Moléculas/adyd-select',
  component: AdydSelect,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'adyd-select',
              component: AdydSelect,
            },
          ],
        }),
        FormlyBootstrapModule,
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<AdydSelect>;

export const BasicSelect: Story = {
  render: () => {
    const form = new FormGroup({});
    const model: Record<string, unknown> = {};

    const fields: FormlyFieldConfig[] = [
      {
        key: 'campaña',
        type: 'adyd-select',
        props: {
          label: 'Escenario de campaña',
          placeholder: 'Selecciona escenario',
          required: true,
          options: [
            { label: 'Dragonlance', value: 1 },
            { label: 'Dark Sun', value: 2 },
          ],
        },
      },
    ];

    return {
      props: {
        form,
        model,
        fields,
      },
      template: `
        <form [formGroup]="form">
          <formly-form
            [form]="form"
            [model]="model"
            [fields]="fields">
          </formly-form>

          <pre class="mt-3">{{ model | json }}</pre>
        </form>
      `,
    };
  },
};