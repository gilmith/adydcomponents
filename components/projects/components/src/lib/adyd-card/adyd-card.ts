import {Component, computed, inject, input, signal, Signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminDirective} from "../directives/admin-directive";
import {PlayerDirective} from "../directives/player-directive";
import {API_APPLICATIONS} from "../services/api-applications";
import {ApiApplicationsEnum} from "../services/enum/enum-api-aplications";

@Component({
    imports: [
        ReactiveFormsModule,
        AdminDirective,
        PlayerDirective
    ],
  selector: 'adyd-card',
  templateUrl: './adyd-card.html',
  styleUrls: [
    './adyd-card.css',
    '../adyd-forms.css'
  ],
  standalone: true
})
export class AdydCard {
  imageUrl = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
  id = input.required<number>();
  action = input.required<(id: number) => void>();

  protected imageData = signal<string | null>(null);

  protected previewUrl = computed(() => {
    return this.imageData() ?? this.imageUrl();
  });

  private apiApplications = inject(API_APPLICATIONS);

  adminForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      descriptionInput: ['', [Validators.required]]
    });
  }





  onSelect() {
    this.action()(this.id());
  }

  onSave(number: number) {
    const value = this.adminForm.value.descriptionInput;
    console.log('onSave', value);
    const record: Record<string, unknown> = {
      id: number,
      description: value,
    };

    const image = this.imageData();
    if (image) {
      record['image'] = image;
    }
    console.log('Guardar:', record);
    this.apiApplications.executeService(ApiApplicationsEnum.CAMPAING, record, '')
    this.adminForm.reset();
    this.imageData.set(null);
  }

  protected onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.uploadImage(file);
    }
  }

  protected uploadImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageData.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }


  protected onDelete(number: number) {
    console.log('onDelete', number);
    const record = {
      "campaignId": number,
    }
    this.apiApplications.executeService(ApiApplicationsEnum.CAMPAING, record, 'deleteCampaignId');
    
  }
}
