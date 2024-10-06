import Component from "./abstract-component.js";
export default class ModalWindowComponent extends Component {
    closeButtonId = `${this.id}-submit`;
    modalContentId = `${this.id}-text`;
    constructor(htmlElement) {
        super(htmlElement);
    }
    render() {
        this.htmlElement.outerHTML = this.renderToString();
        this.htmlElement = document.getElementById(this.id);
        const closeButton = document.getElementById(this.closeButtonId);
        const handleClose = () => this.hideModal();
        closeButton?.removeEventListener('click', handleClose);
        closeButton?.addEventListener('click', handleClose);
    }
    hideModal() {
        const modal = document.getElementById(this.id);
        modal?.classList.add('hidden');
    }
    showMessage(message) {
        const modal = document.getElementById(this.id);
        const modalContent = document.getElementById(this.modalContentId);
        modalContent.textContent = message;
        modal.classList.remove('hidden');
    }
    renderToString() {
        return `
      <div id="${this.id}" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 hidden">
          <div class="bg-white p-8 rounded-lg w-1/3">
              <h2 id ="${this.modalContentId}" class="text-2xl font-bold mb-4" id="modal-content"></h2>
              <button id="${this.closeButtonId}" class="bg-red-500 text-white py-2 px-4 rounded float-right">Ok</button>
          </div>
      </div>`;
    }
}
