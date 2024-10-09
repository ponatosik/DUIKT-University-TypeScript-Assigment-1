import { ServicePlan } from './servicePlan';
import { PopupModal } from './popupModal';

export class ServicePlanCard {
  constructor(servicePlan: ServicePlan, card: HTMLElement, popupModal: PopupModal) {
    const planName = card.querySelector('.planName') as HTMLElement;
    const planDescription = card.querySelector('.planDescription') as HTMLElement;
    const planPrice = card.querySelector('.planPrice') as HTMLElement;
    const planPeriod = card.querySelector('.planPeriod') as HTMLElement;
    const detailsButton = card.querySelector('.planDetailsButton') as HTMLElement;

    planName.innerHTML = servicePlan.name;
    planDescription.innerHTML = servicePlan.description;
    planPrice.innerHTML = `$${servicePlan.price}`;
    planPeriod.innerHTML = ` / ${servicePlan.period}`;
    detailsButton?.addEventListener('click', () => popupModal.showMessage(servicePlan.details));
  }
}
