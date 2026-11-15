import {Directive, input, model, output} from '@angular/core';

/**
 * Contrato genérico para aportar valores extra al payload de `adyd-form`.
 *
 * Cualquier elemento o componente proyectado dentro de `<adyd-form>` puede usarlo:
 * ```html
 * <adyd-form ...>
 *   <mi-componente [adydFormField]="'campo'" [adydFormFieldValue]="valor()" />
 * </adyd-form>
 * ```
 * Los componentes que quieran gestionarlo internamente (como `adyd-img-editable`)
 * pueden aplicarlo con `hostDirectives` e inyectar esta directiva.
 */
@Directive({
    selector: '[adydFormField]',
})
export class AdydFormFieldDirective<T extends string | number | File = string | number | File> {
    /** Clave con la que el valor viajará en el payload del formulario. */
    public readonly fieldName = input.required<string>({alias: 'adydFormField'});

    /** Valor que se enviará al guardar. */
    public readonly fieldValue = model<T | null>(null, {alias: 'adydFormFieldValue'});

    /** Se emite cuando `adyd-form` descarta el valor tras un guardado correcto. */
    public readonly cleared = output<void>();

    public reset(): void {
        this.fieldValue.set(null);
        this.cleared.emit();
    }
}
