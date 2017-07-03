import $ from 'jquery';

class Modal {
  constructor() {
    this.openModalButton = $('.open-modal');
    this.modal = $('.modal');
    this.closeModalButton = $('.modal__close');

    this.events();
  }

  events() {
    // open modal
    this.openModalButton.click( this.openModal.bind(this) );

    // close modal
    this.closeModalButton.click( this.closeModal.bind(this) );

    // pushes any key
    $(document).keyup( this.keyPressHandler.bind(this) );
  }

  keyPressHandler(event) {
    event.stopPropagation();
    if( event.keyCode === 27 ) {
      this.closeModal();
    } else {
      return false;
    }
  }

  openModal() {
    this.modal.addClass("modal--is-visible");
    return false;
  }

  closeModal() {
    this.modal.removeClass("modal--is-visible");
  }

}

export default Modal;
