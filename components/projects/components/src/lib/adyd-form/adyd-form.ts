import {Component, computed, input, linkedSignal, signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormlyFieldConfig, FormlyModule} from "@ngx-formly/core";

@Component({
    imports: [
        ReactiveFormsModule,
        FormlyModule
    ],
  selector: 'adyd-form',
  styleUrl: './adyd-form.css',
  templateUrl: './adyd-form.html',
})
export class AdydForm<T extends Record<string, any> = Record<string, any>> {
    public initialModel = input.required<T>();
    public editableModel = linkedSignal(() => structuredClone(this.initialModel()));
    public formData = input.required<FormlyFieldConfig[]>();
    public editable = signal<boolean>(false);
    public form = linkedSignal(() => {
        this.initialModel(); // Creamos dependencia con el input
        return new FormGroup({});
    });

    protected readonly formlyFields = computed<FormlyFieldConfig[]>(() =>
        this.applyEditable(this.formData(), this.editable())
    );

    protected setEditable() {
        this.editable.update(value => !value);
    }

    private applyEditable(fields: FormlyFieldConfig[], editing: boolean): FormlyFieldConfig[] {
        return fields.map(field => ({
            ...field,
            props: {
                ...field.props,
                disabled: !editing || field.props?.['locked'] === true,
            },
            ...(field.fieldGroup
                ? {fieldGroup: this.applyEditable(field.fieldGroup, editing)}
                : {}),
        }));
    }
}
