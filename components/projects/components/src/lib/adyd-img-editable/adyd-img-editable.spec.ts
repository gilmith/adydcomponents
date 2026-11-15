import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdydImgEditable } from './adyd-img-editable';

function selectFile(input: HTMLInputElement, file: File): void {
  Object.defineProperty(input, 'files', { value: [file], configurable: true });
  input.dispatchEvent(new Event('change'));
}

describe('AdydImgEditable', () => {
  let component: AdydImgEditable;
  let fixture: ComponentFixture<AdydImgEditable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdydImgEditable],
    }).compileComponents();

    (URL as unknown as { createObjectURL: (file: File) => string }).createObjectURL =
      vi.fn(() => 'blob:mock');

    fixture = TestBed.createComponent(AdydImgEditable);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('showButtons', true);
    fixture.componentRef.setInput('imageUrl', 'https://placehold.co/600x400');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the selected file as field value', () => {
    const file = new File(['fake'], 'foto.png', { type: 'image/png' });

    selectFile(fixture.nativeElement.querySelector('input[type="file"]'), file);

    expect(component.fieldValue()).toBe(file);
  });

  it('should clear the pending image on reset', () => {
    const file = new File(['fake'], 'foto.png', { type: 'image/png' });
    selectFile(fixture.nativeElement.querySelector('input[type="file"]'), file);

    component.reset();

    expect(component.fieldValue()).toBeNull();
  });
});
