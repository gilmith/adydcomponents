import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { CardItem } from '../model/card-item';
import { AdydCard } from '../adyd-card/adyd-card';

@Component({
  imports: [AdydCard],
  selector: 'lib-adyd-carousel',
  styleUrl: './adyd-carousel.css',
  templateUrl: './adyd-carousel.html',
})
export class AdydCarousel {
  readonly cardData = input.required<CardItem[]>();
  readonly itemWidth = input(220);
  readonly controlsThreshold = input(10);

  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly index = signal(0);
  protected readonly offset = signal(0);

  /**
   * Only written on open, never on close. That keeps the card in the DOM while the
   * closing animation plays, so it does not vanish before it can fade out.
   */
  protected readonly selected = signal<CardItem | null>(null);

  protected readonly showControls = computed(
    () => this.cardData().length > this.controlsThreshold(),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const viewport = this.viewport().nativeElement;
      const track = this.track().nativeElement;
      const sync = () => this.sync();

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

  protected prev(): void {
    this.goTo(this.index() - 1);
  }

  protected next(): void {
    this.goTo(this.index() + 1);
  }

  protected open(card: CardItem): void {
    this.selected.set(card);

    const dialog = this.dialog().nativeElement;
    if (!dialog.open) dialog.showModal();
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  /** A click on the dialog element itself is a click on the backdrop. */
  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.close();
  }

  /**
   * Moving is driven by the slide index, so the buttons always land somewhere
   * predictable. Advancing past the last reachable page wraps back to the first card,
   * and going back from the first one jumps to the last page.
   */
  private goTo(target: number): void {
    const last = this.lastIndex();
    const pages = last + 1;
    if (pages < 2) return;

    const wrapped = ((target % pages) + pages) % pages;
    this.index.set(wrapped);
    this.offset.set(wrapped * this.stride());
  }

  private lastIndex(): number {
    if (this.cardData().length < 2) return 0;
    const stride = this.stride();
    if (stride <= 0) return 0;
    return Math.ceil(this.maxOffset() / stride);
  }

  private stride(): number {
    const kids = this.track().nativeElement.children;
    if (kids.length < 2) return 0;
    return (kids[1] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft;
  }

  private maxOffset(): number {
    const viewport = this.viewport().nativeElement;
    return Math.max(0, this.track().nativeElement.scrollWidth - viewport.clientWidth);
  }

  private sync(): void {
    const next = Math.min(this.index(), this.lastIndex());
    this.index.set(next);
    this.offset.set(next * this.stride());
  }
}
