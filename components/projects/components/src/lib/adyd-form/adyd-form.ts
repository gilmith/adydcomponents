import {
    Component,
    computed,
    contentChildren,
    DestroyRef,
    inject,
    input,
    linkedSignal,
    output,
    signal
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormlyFieldConfig, FormlyModule} from "@ngx-formly/core";
import {finalize} from "rxjs";
import {API_APPLICATIONS} from "../services/api-applications";
import {AdydFormConfig} from "../model/AdydFormConfig";
import {AdydFormField} from "../model/AdydFormField";


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
    public saveConfig = input.required<AdydFormConfig>();
    public editable = signal<boolean>(false);
    public saving = signal<boolean>(false);
    public form = linkedSignal(() => {
        this.initialModel(); // Creamos dependencia con el input
        return new FormGroup({});
    });

    private readonly apiApplications = inject(API_APPLICATIONS);
    private readonly destroyRef = inject(DestroyRef);
    /** Componentes proyectados que aportan valores extra al payload de guardado. */
    private readonly fields = contentChildren(AdydFormField, {descendants: true});

    protected readonly formlyFields = computed<FormlyFieldConfig[]>(() =>
        this.applyEditable(this.formData(), this.editable())
    );

    protected setEditable() {
        this.editable.update(value => !value);
    }

    protected save(): void {
        const form = this.form();
        if (form.invalid) {
            form.markAllAsTouched();
            return;
        }

        const {api, operationId} = this.saveConfig();
        const data: Record<string, string | number | File> = {...this.editableModel()};
        for (const field of this.fields()) {
            const value = field.fieldValue();
            if (value !== null) {
                data[field.fieldName()] = value;
            }
        }

        this.saving.set(true);
        this.apiApplications
            .executeService(api, data, operationId)
            .pipe(
                finalize(() => this.saving.set(false)),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe({
                next: response => {
                    this.fields().forEach(field => field.reset());
                    this.editable.set(false);
                }
            });
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
