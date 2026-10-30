import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  effect,
} from '@angular/core';
import { AdydCard } from "../adyd-card/adyd-card";

@Component({
  selector: 'adyd-carousel',
  styleUrl: './adyd-carousel.css',
  templateUrl: './adyd-carousel.html',
  standalone: true,
})
export class AdydCarousel {
  readonly itemWidth = input(220);
  readonly controlsThreshold = input(10);

  readonly itemSelected = output<any>();

  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  protected readonly index = signal(0);
  protected readonly offset = signal(0);

  // Señal para los controles
  protected readonly showControls = signal<boolean>(false);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const viewport = this.viewport().nativeElement;
      const track = this.track().nativeElement;
      const sync = () => {
        this.sync();
        this.updateControls();
      };

      let observer: ResizeObserver | undefined;
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(sync);
        observer.observe(viewport);
        observer.observe(track);
      }

      sync();
      destroyRef.onDestroy(() => observer?.disconnect());
    });
  }

  private updateControls(): void {
    const trackEl = this.track()?.nativeElement;
    if (!trackEl) return;

    // Contamos los hijos reales que se han proyectado en el DOM
    const totalChildren = trackEl.children.length;
    this.showControls.set(totalChildren > this.controlsThreshold());
  }

  protected prev(): void {
    this.goTo(this.index() - 1);
  }

  protected next(): void {
    this.goTo(this.index() + 1);
  }

  private goTo(target: number): void {
    const last = this.lastIndex();
    const pages = last + 1;
    if (pages < 2) return;

    const wrapped = ((target % pages) + pages) % pages;
    this.index.set(wrapped);
    this.offset.set(wrapped * this.stride());
  }

  private lastIndex(): number {
    const kids = this.track().nativeElement.children;
    if (kids.length < 2) return 0;

    const stride = this.stride();
    if (stride <= 0) return 0;
    const viewport = this.viewport().nativeElement;
    return Math.ceil(Math.max(0, this.track().nativeElement.scrollWidth - viewport.clientWidth) / stride);
  }

  private stride(): number {
    const kids = this.track().nativeElement.children;
    if (kids.length < 2) return 0;
    return (kids[1] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft;
  }

  private sync(): void {
    const next = Math.min(this.index(), this.lastIndex());
    this.index.set(next);
    this.offset.set(next * this.stride());
    this.updateControls(); // Aseguramos que se actualice aquí también
  }
}