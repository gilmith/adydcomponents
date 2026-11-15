import {Component, computed, ElementRef, forwardRef, input, output, signal, viewChild} from '@angular/core';
import {AdydFormField} from "../model/AdydFormField";

@Component({
  imports: [],
  selector: 'adyd-img-editable',
  styleUrl: './adyd-img-editable.css',
  templateUrl: './adyd-img-editable.html',
  providers: [
    {provide: AdydFormField, useExisting: forwardRef(() => AdydImgEditable)},
  ],
})
export class AdydImgEditable extends AdydFormField<File> {

  public readonly showButtons = input.required<boolean>();
  public readonly title = input<string>('');
  /** Nombre con el que el fichero se enviará en el payload del formulario. */
  public readonly fieldName = input<string>('imagen');
  /** URL de la imagen actual, usada como preview mientras no hay fichero nuevo. */
  public readonly imageUrl = input.required<string>();
  protected readonly imageData = signal<File | null>(null);
  private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  protected previewUrl = computed(() => {
    const file = this.imageData();
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return this.imageUrl();
  });

  protected onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.uploadImage(file);
    }
  }

  protected uploadImage(file: File) {
    this.imageData.set(file);
    this.setFieldValue(file);
  }

    /** Descarta el fichero pendiente y vuelve a mostrar la `imageUrl`. */
    override reset(): void {
      super.reset();
      this.imageData.set(null);
      const input = this.fileInput()?.nativeElement;
      if (input) {
        input.value = '';
      }
    }
}
