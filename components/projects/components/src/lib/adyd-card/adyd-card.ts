import {Component, inject, input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminDirective} from "../directives/admin-directive";
import {PlayerDirective} from "../directives/player-directive";
import {API_APPLICATIONS} from "../services/api-applications";

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

  private apiApplications = inject(API_APPLICATIONS);

  adminForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      descriptionInput: ['', [Validators.required]]
    });
  }

  protected imageData: string | null = null;




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

    if (this.imageData) {
      record['image'] = this.imageData;
    }

    console.log('Guardar:', record);
    this.adminForm.reset();
    this.imageData = null;
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
      this.imageData = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }


}
