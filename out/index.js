import { Carousel } from './carousel.js';
import { PopupModal } from './popupModal.js';
// Carousel functionality
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const carouselElement = document.querySelector('#carousel .flex');
const carousel = new Carousel(carouselElement, prevButton, nextButton, 5);
console.log(carousel);
// Popup modal functionality
const popupModal = document.getElementById('popupModal');
const popupContent = document.getElementById('popupContent');
const closeModal = document.getElementById('closeModal');
const popup = new PopupModal(popupModal, popupContent, closeModal);
const contactButton = document.getElementById('contactButton');
contactButton.addEventListener('click', () => popup.showMessage('Email: example.com'));
