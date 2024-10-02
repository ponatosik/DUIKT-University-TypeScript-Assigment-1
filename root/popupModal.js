export class PopupModal {
    popupModal;
    popupMessage;
    constructor(popupModal, popupMessage, closeModal) {
        this.popupModal = popupModal;
        this.popupMessage = popupMessage;
        closeModal.addEventListener('click', () => this.hideModal());
    }
    showMessage(message) {
        this.popupMessage.innerHTML = message;
        this.popupModal.classList.remove('hidden');
    }
    hideModal() {
        this.popupModal.classList.add('hidden');
    }
}
