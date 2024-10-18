import { Carousel } from './components/carousel.js';
import { PopupModal } from './components/popupModal.js';
import { ServicePlan } from './types/servicePlan.js';
import { ServicePlanCard } from './components/servicePlanCard.js';

// Carousel functionality
const prevButton = document.getElementById('prev') as HTMLElement;
const nextButton = document.getElementById('next') as HTMLElement;
const carouselElement = document.querySelector('#carousel .flex') as HTMLElement;

new Carousel(carouselElement, prevButton, nextButton, 5);

// Popup modal functionality
const popupModal = document.getElementById('popupModal') as HTMLElement;
const popupContent = document.getElementById('popupContent') as HTMLElement;
const closeModal = document.getElementById('closeModal') as HTMLElement;
const popup = new PopupModal(popupModal, popupContent, closeModal);

const contactButton = document.getElementById('contactButton') as HTMLElement;
contactButton.addEventListener('click', () => popup.showMessage('Email: example.com'));

const servicePlanElements: HTMLElement[] = [
  document.getElementById('servicePlan-1') as HTMLElement,
  document.getElementById('servicePlan-2') as HTMLElement,
  document.getElementById('servicePlan-3') as HTMLElement
];

// Fetch service plan data
fetch(
  'https://raw.githubusercontent.com/ponatosik/DUIKT-University-TypeScript-Assigments/feature/tsconfig/mockData/servicePlans.json'
)
  .then(async (res) => res.json())
  .then((objs) => objs as ServicePlan[])
  .then((plans) =>
    plans.map((value, index) => new ServicePlanCard(value, servicePlanElements[index]!, popup))
  );
