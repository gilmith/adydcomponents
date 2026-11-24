import {Directive, InputSignal, signal} from "@angular/core";

/**
 * Clase base para los componentes proyectados dentro de `<adyd-form>` que
 * aportan valores extra al payload de guardado.
 *
 * El componente concreto debe declarar su propio input `fieldName` y, opcionalmente,
 * sobreescribir `reset()` para limpiar su estado interno:
 * ```ts
 * @Component({providers: [{provide: AdydFormField, useExisting: forwardRef(() => MiComponente)}]})
 * export class MiComponente extends AdydFormField<string> {
 *   public readonly fieldName = input<string>('extra');
 * }
 * ```
 */
@Directive()
export abstract class AdydFormField<T extends string | number | File = string | number> {
    /** Clave con la que el valor viajará en el payload del formulario. */
    public abstract readonly fieldName: InputSignal<string>;

    private readonly value = signal<T | null>(null);

    /** Valor actual que se enviará al guardar. */
    public readonly fieldValue = this.value.asReadonly();

    /** Actualiza el valor pendiente de enviar (uso interno del componente). */
    protected setFieldValue(value: T | null): void {
        this.value.set(value);
    }

    /** Descarta el valor pendiente tras un guardado correcto. */
    public reset(): void {
        this.value.set(null);
    }
}
