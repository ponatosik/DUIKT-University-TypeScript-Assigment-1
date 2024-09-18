export class PopupModal {
  popupModal;
  popupMessage;
  closeModal;
  constructor(popupModal, popupMessage, closeModal) {
    this.popupModal = popupModal;
    this.popupMessage = popupMessage;
    this.closeModal = closeModal;
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
