import { Carousel } from './carousel';
import { PopupModal } from './popupModal';

// Carousel functionality
const prevButton = document.getElementById('prev') as HTMLElement;
const nextButton = document.getElementById('next') as HTMLElement;
const carouselElement = document.querySelector('#carousel .flex') as HTMLElement;

const carousel = new Carousel(carouselElement, prevButton, nextButton, 5);
console.log(carousel);

// Popup modal functionality
const popupModal = document.getElementById('popupModal') as HTMLElement;
const popupContent = document.getElementById('popupContent') as HTMLElement;
const closeModal = document.getElementById('closeModal') as HTMLElement;
const popup = new PopupModal(popupModal, popupContent, closeModal);

const contactButton = document.getElementById('contactButton') as HTMLElement;
contactButton.addEventListener('click', () => popup.showMessage('Email: example.com'));
