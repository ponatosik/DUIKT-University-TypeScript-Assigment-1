import { Carousel } from './carousel';
import { PopupModal } from './popupModal';
import { ServicePlanCard } from './servicePlanCard';
// Carousel functionality
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const carouselElement = document.querySelector('#carousel .flex');
new Carousel(carouselElement, prevButton, nextButton, 5);
// Popup modal functionality
const popupModal = document.getElementById('popupModal');
const popupContent = document.getElementById('popupContent');
const closeModal = document.getElementById('closeModal');
const popup = new PopupModal(popupModal, popupContent, closeModal);
const contactButton = document.getElementById('contactButton');
contactButton.addEventListener('click', () => popup.showMessage('Email: example.com'));
const servicePlanElements = [
    document.getElementById('servicePlan-1'),
    document.getElementById('servicePlan-2'),
    document.getElementById('servicePlan-3')
];
// Fetch service plan data
fetch('https://raw.githubusercontent.com/ponatosik/DUIKT-University-TypeScript-Assigments/feature/tsconfig/mockData/servicePlans.json')
    .then(async (res) => res.json())
    .then((objs) => objs)
    .then((plans) => plans.map((value, index) => new ServicePlanCard(value, servicePlanElements[index], popup)));
