import { Component, forwardRef, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { of } from 'rxjs';
import { AdydForm } from './adyd-form';
import { AdydImgEditable } from '../adyd-img-editable/adyd-img-editable';
import { AdydFormField } from '../model/AdydFormField';
import { API_APPLICATIONS } from '../services/api-applications';
import { ApiApplicationsEnum } from '../services/enum/enum-api-aplications';

const formData: FormlyFieldConfig[] = [
  {
    key: 'nombre',
    type: 'input',
    props: { label: 'Nombre', required: true },
  },
  {
    key: 'activo',
    type: 'checkbox',
    props: { label: 'Activo', locked: true },
  },
];

describe('AdydForm', () => {
  let component: AdydForm;
  let fixture: ComponentFixture<AdydForm>;
  let element: HTMLElement;
  const executeService = vi.fn(() => of({ ok: true }));

  beforeEach(async () => {
    executeService.mockClear();

    await TestBed.configureTestingModule({
      imports: [
        AdydForm,
        ReactiveFormsModule,
        FormlyModule.forRoot(),
        FormlyBootstrapModule,
      ],
      providers: [
        {
          provide: API_APPLICATIONS,
          useValue: { executeService },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdydForm);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('initialModel', { nombre: 'Aragorn', activo: true });
    fixture.componentRef.setInput('formData', formData);
    fixture.componentRef.setInput('saveConfig', {
      api: ApiApplicationsEnum.CAMPAIGN,
      operationId: 'saveCampaign',
    });
    await fixture.whenStable();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render every form field disabled by default', () => {
    const nombre = element.querySelector<HTMLInputElement>('input[type="text"]');
    const activo = element.querySelector<HTMLInputElement>('input[type="checkbox"]');

    expect(nombre?.disabled).toBe(true);
    expect(activo?.disabled).toBe(true);
  });

  it('should enable the fields unless they are locked when clicking edit', async () => {
    element.querySelectorAll<HTMLButtonElement>('button')[0].click();
    await fixture.whenStable();

    const nombre = element.querySelector<HTMLInputElement>('input[type="text"]');
    const activo = element.querySelector<HTMLInputElement>('input[type="checkbox"]');

    expect(nombre?.disabled).toBe(false);
    expect(activo?.disabled).toBe(true);
  });

  it('should execute the configured service when saving', async () => {
    const [editButton, saveButton] =
      element.querySelectorAll<HTMLButtonElement>('button');

    editButton.click();
    await fixture.whenStable();

    saveButton.click();
    await fixture.whenStable();

    expect(executeService).toHaveBeenCalledWith(
      ApiApplicationsEnum.CAMPAIGN,
      expect.objectContaining({ nombre: 'Aragorn', activo: true }),
      'saveCampaign',
    );
  });

  it('should return to read mode after a successful save', async () => {
    const [editButton, saveButton] =
      element.querySelectorAll<HTMLButtonElement>('button');

    editButton.click();
    await fixture.whenStable();

    saveButton.click();
    await fixture.whenStable();

    expect(component.editable()).toBe(false);
    const nombre = element.querySelector<HTMLInputElement>('input[type="text"]');
    expect(nombre?.disabled).toBe(true);
  });

  it('should not call the service when the form is invalid', async () => {
    fixture.componentRef.setInput('initialModel', { nombre: '', activo: true });
    await fixture.whenStable();

    const [editButton, saveButton] =
      element.querySelectorAll<HTMLButtonElement>('button');

    editButton.click();
    await fixture.whenStable();

    expect(component.form().invalid).toBe(true);

    saveButton.click();
    await fixture.whenStable();

    expect(executeService).not.toHaveBeenCalled();
  });
});

@Component({
  imports: [AdydForm, AdydImgEditable],
  template: `
    <adyd-form [initialModel]="initialModel" [formData]="formData" [saveConfig]="saveConfig">
      <adyd-img-editable fieldName="imagen" [imageUrl]="imageUrl" [showButtons]="true" />
    </adyd-form>
  `,
})
class HostComponent {
  initialModel = { nombre: 'Aragorn' };
  formData = formData;
  saveConfig = {
    api: ApiApplicationsEnum.CAMPAIGN,
    operationId: 'saveCampaign',
  };
  imageUrl = 'https://placehold.co/600x400';
}

describe('AdydForm with projected image', () => {
  let fixture: ComponentFixture<HostComponent>;
  const executeService = vi.fn(() => of({ ok: true }));

  beforeEach(() => {
    (URL as unknown as { createObjectURL: (file: File) => string }).createObjectURL =
      vi.fn(() => 'blob:mock');
    executeService.mockClear();

    TestBed.configureTestingModule({
      imports: [HostComponent, FormlyModule.forRoot(), FormlyBootstrapModule],
      providers: [
        {
          provide: API_APPLICATIONS,
          useValue: { executeService },
        },
      ],
    });

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should register the projected component as a form field', async () => {
    await fixture.whenStable();
    const field = fixture.debugElement.query(By.directive(AdydImgEditable))
      .componentInstance as AdydImgEditable;

    const file = new File(['fake'], 'foto.png', { type: 'image/png' });
    selectFile(fixture.nativeElement.querySelector('input[type="file"]'), file);
    await fixture.whenStable();

    expect(field.fieldName()).toBe('imagen');
    expect(field.fieldValue()).toBe(file);
  });

  it('should send the attachment with the form model when saving', async () => {
    await fixture.whenStable();
    const file = new File(['fake'], 'foto.png', { type: 'image/png' });
    selectFile(fixture.nativeElement.querySelector('input[type="file"]'), file);
    await fixture.whenStable();
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    clickButton(host, 'edit');
    await fixture.whenStable();
    clickButton(host, 'save');
    await fixture.whenStable();

    expect(executeService).toHaveBeenCalledWith(
      ApiApplicationsEnum.CAMPAIGN,
      expect.objectContaining({ nombre: 'Aragorn', imagen: file }),
      'saveCampaign',
    );
  });

  it('should reset the projected field after a successful save', async () => {
    await fixture.whenStable();
    const field = fixture.debugElement.query(By.directive(AdydImgEditable))
      .componentInstance as AdydImgEditable;
    selectFile(
      fixture.nativeElement.querySelector('input[type="file"]'),
      new File(['fake'], 'foto.png', { type: 'image/png' }),
    );
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    clickButton(host, 'edit');
    await fixture.whenStable();
    clickButton(host, 'save');
    await fixture.whenStable();

    expect(field.fieldValue()).toBeNull();
  });
});

function clickButton(host: HTMLElement, label: string): void {
  const button = Array.from(host.querySelectorAll('button')).find(
    candidate => candidate.textContent?.trim() === label,
  );
  button?.click();
}

function selectFile(input: HTMLInputElement, file: File): void {
  Object.defineProperty(input, 'files', { value: [file], configurable: true });
  input.dispatchEvent(new Event('change'));
}

@Component({
  selector: 'adyd-test-field',
  template: '<span>campo libre</span>',
  providers: [
    { provide: AdydFormField, useExisting: forwardRef(() => TestFieldComponent) },
  ],
})
class TestFieldComponent extends AdydFormField<string> {
  readonly fieldName = input<string>('extra');

  set(value: string): void {
    this.setFieldValue(value);
  }
}

@Component({
  imports: [AdydForm, TestFieldComponent],
  template: `
    <adyd-form [initialModel]="initialModel" [formData]="formData" [saveConfig]="saveConfig">
      <adyd-test-field fieldName="extra" />
    </adyd-form>
  `,
})
class GenericHostComponent {
  initialModel = { nombre: 'Aragorn' };
  formData = formData;
  saveConfig = {
    api: ApiApplicationsEnum.CAMPAIGN,
    operationId: 'saveCampaign',
  };
}

describe('AdydForm with any component implementing AdydFormField', () => {
  let fixture: ComponentFixture<GenericHostComponent>;
  const executeService = vi.fn(() => of({ ok: true }));

  beforeEach(() => {
    executeService.mockClear();

    TestBed.configureTestingModule({
      imports: [GenericHostComponent, FormlyModule.forRoot(), FormlyBootstrapModule],
      providers: [
        {
          provide: API_APPLICATIONS,
          useValue: { executeService },
        },
      ],
    });

    fixture = TestBed.createComponent(GenericHostComponent);
  });

  it('should include the value of any projected AdydFormField in the payload', async () => {
    await fixture.whenStable();
    const field = fixture.debugElement.query(By.directive(TestFieldComponent))
      .componentInstance as TestFieldComponent;
    field.set('valor libre');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    clickButton(host, 'edit');
    await fixture.whenStable();
    clickButton(host, 'save');
    await fixture.whenStable();

    expect(executeService).toHaveBeenCalledWith(
      ApiApplicationsEnum.CAMPAIGN,
      expect.objectContaining({ nombre: 'Aragorn', extra: 'valor libre' }),
      'saveCampaign',
    );
  });
});
