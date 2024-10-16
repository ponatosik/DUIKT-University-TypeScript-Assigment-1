export class PopupModal {
  constructor(
    private popupModal: HTMLElement,
    private popupMessage: HTMLElement,
    closeModal: HTMLElement
  ) {
    closeModal.addEventListener('click', () => this.hideModal());
  }

  public showMessage(message: string) {
    this.popupMessage.innerHTML = message;
    this.popupModal.classList.remove('hidden');
  }

  public hideModal() {
    this.popupModal.classList.add('hidden');
  }
}
