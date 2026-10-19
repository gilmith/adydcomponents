import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {FieldType, FieldTypeConfig, FormlyModule} from "@ngx-formly/core";

@Component({
  imports: [CommonModule,ReactiveFormsModule, FormlyModule],
  selector: 'adyd-select',
  styleUrl: './adyd-select.css',
  templateUrl: './adyd-select.html',
})
export class AdydSelect extends FieldType<FieldTypeConfig> {


}
