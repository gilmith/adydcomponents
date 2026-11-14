import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { AdydForm } from './adyd-form';

const formData: FormlyFieldConfig[] = [
  {
    key: 'nombre',
    type: 'input',
    props: { label: 'Nombre' },
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdydForm,
        ReactiveFormsModule,
        FormlyModule.forRoot(),
        FormlyBootstrapModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdydForm);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('initialModel', { nombre: 'Aragorn', activo: true });
    fixture.componentRef.setInput('formData', formData);
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
});
