import {Component, computed, inject, input, signal} from '@angular/core';
import {API_APPLICATIONS} from "../services/api-applications";
import {ApiApplicationsEnum} from "../services/enum/enum-api-aplications";

@Component({
  imports: [],
  selector: 'adyd-img-editable',
  styleUrl: './adyd-img-editable.css',
  templateUrl: './adyd-img-editable.html',
})
export class AdydImgEditable {

  public readonly showButtons = input.required<boolean>();
  private apiApplications = inject(API_APPLICATIONS);
  protected imageData = signal<File | null>(null);
  public readonly imageUrl = input.required<string>();
  public readonly title = input<string>('');

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
  }


}
