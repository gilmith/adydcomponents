import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdydCarousel } from './adyd-carousel';
import { CardItem } from '../model/card-item';

const makeCards = (count: number): CardItem[] =>
  Array.from({ length: count }, (_, i) => ({
    title: `Card ${i}`,
    url: `https://picsum.photos/600/337?random=${i}`,
  }));

/**
 * jsdom does not implement the modal dialog methods, only the markup. Enough to
 * exercise the component: it only calls showModal() and close().
 */
const dialogPolyfill = () => {
  if (typeof HTMLDialogElement !== 'undefined' && !HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function () {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function () {
      this.open = false;
      this.dispatchEvent(new Event('close'));
    };
  }
};

describe('AdydCarousel', () => {
  let fixture: ComponentFixture<AdydCarousel>;

  const viewport = () =>
    fixture.nativeElement.querySelector('.adyd-carousel__viewport') as HTMLElement;
  const track = () => fixture.nativeElement.querySelector('.adyd-carousel__track') as HTMLElement;
  const items = () => fixture.nativeElement.querySelectorAll('.adyd-carousel__item');
  const controls = () => fixture.nativeElement.querySelectorAll('.adyd-carousel__control');
  const prev = () =>
    fixture.nativeElement.querySelector('.adyd-carousel__control--prev') as HTMLButtonElement;
  const next = () =>
    fixture.nativeElement.querySelector('.adyd-carousel__control--next') as HTMLButtonElement;
  const offset = () => (track().style.transform.match(/-?[\d.]+px/) ?? ['0px'])[0];

  const define = (el: Element, prop: string, value: number, writable = false) =>
    Object.defineProperty(el, prop, { value, writable, configurable: true });

  const create = async (count: number) => {
    fixture = TestBed.createComponent(AdydCarousel);
    fixture.componentRef.setInput('cardData', makeCards(count));
    await fixture.whenStable();
    return fixture;
  };

  const STRIDE = 236;

  /** Lays the strip out: 14 items, 236px apart, inside a 1000px viewport. */
  const layout = (count: number, clientWidth = 1000) => {
    define(viewport(), 'clientWidth', clientWidth);
    Array.from(track().children).forEach((child, i) => {
      define(child, 'offsetLeft', i * STRIDE);
      define(child, 'offsetWidth', 220);
    });
    define(track(), 'scrollWidth', count * STRIDE);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    dialogPolyfill();
    await TestBed.configureTestingModule({
      imports: [AdydCarousel],
    }).compileComponents();
  });

  it('should create', async () => {
    await create(3);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders every card once, without clones', async () => {
    await create(14);
    expect(items().length).toBe(14);
    expect(fixture.nativeElement.querySelectorAll('.adyd-carousel__item[aria-hidden]').length).toBe(
      0,
    );
  });

  it('hides the controls when there are 10 cards or fewer', async () => {
    await create(10);
    expect(controls().length).toBe(0);
  });

  it('shows the controls when there are more than 10 cards', async () => {
    await create(11);
    expect(controls().length).toBe(2);
  });

  it('starts at the first card', async () => {
    await create(14);
    layout(14);
    expect(offset()).toBe('0px');
  });

  it('moves one item forward on every next click', async () => {
    await create(14);
    layout(14);

    next().click();
    fixture.detectChanges();
    expect(offset()).toBe(`-${STRIDE}px`);

    next().click();
    fixture.detectChanges();
    expect(offset()).toBe(`-${STRIDE * 2}px`);
  });

  it('moves one item back on every prev click', async () => {
    await create(14);
    layout(14);

    next().click();
    fixture.detectChanges();
    prev().click();
    fixture.detectChanges();

    expect(offset()).toBe('0px');
  });

  it('wraps back to the first card when advancing past the last one', async () => {
    await create(14);
    layout(14);

    const lastIndex = Math.ceil((14 * STRIDE - 1000) / STRIDE);
    for (let i = 0; i < lastIndex; i++) {
      next().click();
      fixture.detectChanges();
    }
    expect(offset()).toBe(`-${STRIDE * lastIndex}px`);

    next().click();
    fixture.detectChanges();

    expect(offset()).toBe('0px');
  });

  it('wraps to the last reachable card when going back from the first one', async () => {
    await create(14);
    layout(14);

    prev().click();
    fixture.detectChanges();

    const lastIndex = Math.ceil((14 * STRIDE - 1000) / STRIDE);
    expect(offset()).toBe(`-${STRIDE * lastIndex}px`);
  });

  it('never scrolls past the end of the strip and never gets stuck', async () => {
    await create(14);
    layout(14);

    const lastIndex = Math.ceil((14 * STRIDE - 1000) / STRIDE);
    const maxOffset = lastIndex * STRIDE;
    const seen = new Set<number>();

    for (let i = 0; i < 40; i++) {
      next().click();
      fixture.detectChanges();
      const current = Math.abs(Number(offset().replace('px', '')));
      seen.add(current);
      expect(current).toBeLessThanOrEqual(maxOffset);
    }

    // A wrapping strip must visit several positions instead of sticking on one.
    expect(seen.size).toBeGreaterThan(5);
  });

  it('keeps every control enabled so the strip never blocks', async () => {
    await create(14);
    layout(14);

    for (let i = 0; i < 40; i++) {
      next().click();
      fixture.detectChanges();
      expect(prev().disabled).toBe(false);
      expect(next().disabled).toBe(false);
    }
  });

  it('does not move when everything already fits', async () => {
    await create(12);
    layout(12, 5000);

    next().click();
    fixture.detectChanges();

    expect(offset()).toBe('0px');
  });

  it('scales the item on hover', async () => {
    await create(14);
    const item = items()[0] as HTMLElement;

    expect(getComputedStyle(item).transform).toBe('scale(1)');
    expect(getComputedStyle(item).transition).toContain('transform 0.3s');
  });

  it('drives the item width from the itemWidth input', async () => {
    await create(14);

    // jsdom does not resolve var() in computed styles, so assert the custom property
    // the component sets plus the flex-basis that consumes it.
    expect(viewport().style.getPropertyValue('--adyd-carousel-item-width')).toBe('220px');
    expect(getComputedStyle(items()[0] as HTMLElement).flexBasis).toContain(
      '--adyd-carousel-item-width',
    );
  });

  it('respects a custom itemWidth', async () => {
    fixture = TestBed.createComponent(AdydCarousel);
    fixture.componentRef.setInput('cardData', makeCards(14));
    fixture.componentRef.setInput('itemWidth', 320);
    await fixture.whenStable();

    expect(viewport().style.getPropertyValue('--adyd-carousel-item-width')).toBe('320px');
  });

  it('respects a custom controlsThreshold', async () => {
    fixture = TestBed.createComponent(AdydCarousel);
    fixture.componentRef.setInput('cardData', makeCards(4));
    fixture.componentRef.setInput('controlsThreshold', 3);
    await fixture.whenStable();

    expect(controls().length).toBe(2);
  });

  describe('lightbox', () => {
    const dialog = () =>
      fixture.nativeElement.querySelector('.adyd-carousel__lightbox') as HTMLDialogElement;
    const trigger = (i: number) =>
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
        '.adyd-carousel__trigger',
      )[i];
    const closeButton = () =>
      fixture.nativeElement.querySelector('.adyd-carousel__lightbox-close') as HTMLButtonElement;
    const panelCard = () =>
      fixture.nativeElement.querySelector('.adyd-carousel__lightbox-panel adyd-card');

    it('stays closed until a card is clicked', async () => {
      await create(14);
      expect(dialog().open).toBe(false);
    });

    it('opens with the clicked card when a trigger is clicked', async () => {
      await create(14);

      trigger(3).click();
      fixture.detectChanges();

      expect(dialog().open).toBe(true);
      expect(panelCard()).toBeTruthy();
      const img = panelCard()!.querySelector('img')!;
      expect(img.getAttribute('src')).toContain('random=3');
    });

    it('keeps the clicked card mounted while it is open', async () => {
      await create(14);

      trigger(1).click();
      fixture.detectChanges();

      expect(panelCard()!.querySelector('img')!.getAttribute('src')).toContain('random=1');
    });

    it('closes from the close button', async () => {
      await create(14);
      trigger(0).click();
      fixture.detectChanges();

      closeButton().click();
      fixture.detectChanges();

      expect(dialog().open).toBe(false);
    });

    it('closes when the backdrop is clicked but not when the panel is', async () => {
      await create(14);
      trigger(0).click();
      fixture.detectChanges();

      // A click whose target is the panel must bubble without closing.
      fixture.nativeElement
        .querySelector('.adyd-carousel__lightbox-panel')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      expect(dialog().open).toBe(true);

      dialog().dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      expect(dialog().open).toBe(false);
    });

    it('swaps the card when a different one is clicked after closing', async () => {
      await create(14);

      trigger(2).click();
      fixture.detectChanges();
      closeButton().click();
      fixture.detectChanges();

      trigger(5).click();
      fixture.detectChanges();

      expect(panelCard()!.querySelector('img')!.getAttribute('src')).toContain('random=5');
    });

    it('labels every trigger for assistive technology', async () => {
      await create(14);
      expect(trigger(0).getAttribute('aria-label')).toBe('Ver Card 0');
      expect(trigger(1).getAttribute('aria-label')).toBe('Ver Card 1');
    });
  });
});
