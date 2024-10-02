export class Carousel {
    carousel;
    prevButton;
    nextButton;
    slides;
    index = 0;
    constructor(carousel, prevButton, nextButton, slides) {
        this.carousel = carousel;
        this.prevButton = prevButton;
        this.nextButton = nextButton;
        this.slides = slides;
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
