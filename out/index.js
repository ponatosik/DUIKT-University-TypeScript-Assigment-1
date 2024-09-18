"use strict";
// Carousel functionality
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const carousel = document.querySelector('#carousel .flex');
let index = 0;
function showSlide(n) {
    const totalSlides = 5;
    if (n >= totalSlides)
        index = 0;
    else if (n < 0)
        index = totalSlides - 1;
    else
        index = n;
    carousel.style.transform = `translateX(-${index * 100}%)`;
}
prevButton.addEventListener('click', () => showSlide(index - 1));
nextButton.addEventListener('click', () => showSlide(index + 1));
// Popup modal functionality
const contactButton = document.getElementById('contactButton');
const popupModal = document.getElementById('popupModal');
const closeModal = document.getElementById('closeModal');
contactButton.addEventListener('click', () => popupModal.classList.remove('hidden'));
closeModal.addEventListener('click', () => popupModal.classList.add('hidden'));
