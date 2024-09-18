export class Carousel {
  private index: number = 0;

  constructor(
    private carousel: HTMLElement,
    private prevButton: HTMLElement,
    private nextButton: HTMLElement,
    private slides: number
  ) {
    nextButton.addEventListener('click', () => this.nextSlide());
    prevButton.addEventListener('click', () => this.prevSlide());
  }

  nextSlide() {
    this.index = (this.index + 1) % this.slides;
    this.carousel.style.transform = `translateX(-${this.index * 100}%)`;
  }

  prevSlide() {
    this.index = (this.index - 1 + this.slides) % this.slides;
    this.carousel.style.transform = `translateX(-${this.index * 100}%)`;
  }
}
