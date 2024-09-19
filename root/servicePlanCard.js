export class ServicePlanCard {
    constructor(servicePlan, card, popupModal) {
        const planName = card.querySelector('.planName');
        const planDescription = card.querySelector('.planDescription');
        const planPrice = card.querySelector('.planPrice');
        const planPeriod = card.querySelector('.planPeriod');
        const detailsButton = card.querySelector('.planDetailsButton');
        planName.innerHTML = servicePlan.name;
        planDescription.innerHTML = servicePlan.description;
        planPrice.innerHTML = `$${servicePlan.price}`;
        planPeriod.innerHTML = ` / ${servicePlan.period}`;
        detailsButton?.addEventListener('click', () => popupModal.showMessage(servicePlan.details));
    }
}
