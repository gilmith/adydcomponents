import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
  showButtons = input<boolean>(true);

  protected imageData = signal<File | null>(null);

  protected previewUrl = computed(() => {
    const file = this.imageData();
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return this.imageUrl();
  });

  private apiApplications = inject(API_APPLICATIONS);

  adminForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      descriptionInput: ['', [Validators.required]]
    });
    effect(() => {
      this.imageUrl(); // trigger on imageUrl change
      this.imageData.set(null);
      this.adminForm.reset();
    });
  }

  onSelect() {
    this.action()(this.id());
  }

  onSave(number: number) {
    const descriptionInput = this.adminForm.value.descriptionInput;
    const record: Record<string, string|number|File> = {
      campaignId: number,
      description: descriptionInput,
    };
    const image = this.imageData();
    if (image) {
      record['image'] = image;
    }
    this.apiApplications
        .executeService(ApiApplicationsEnum.CAMPAIGN, record, 'updateCampaign')
        .subscribe({
          next: (response) => {
            this.adminForm.reset();
            this.imageData.set(null);
          },
          error: error => {}
        });
  }

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


  protected onDelete(number: number) {
    console.log('onDelete', number);
    const record = {
      "campaignId": number,
    }
    this.apiApplications
        .executeService(ApiApplicationsEnum.CAMPAIGN, record, 'deleteCampaignId')
        .subscribe({next: (response) => {},
                    error: error => {
                      console.log(error);
                    }});
    
  }
}
