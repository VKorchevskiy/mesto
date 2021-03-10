const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const cardContainerSelector = '.cards';
const popupTypeProfile = document.querySelector('.popup_type_profile');
const formProfile = popupTypeProfile.querySelector('.form_type_profile');
const profileNameInput = popupTypeProfile.querySelector('.form__input-text_type_name');
const profileDescriptionInput = popupTypeProfile.querySelector('.form__input-text_type_job');
const popupTypeCard = document.querySelector('.popup_type_card');
const formCard = popupTypeCard.querySelector('.form_type_card');
const formSelectors = {
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__input-text_type_error',
  errorClass: 'form__input-error_active'
}

const selectorCloseButton = '.popup__close';
const selectorPopupTypeImage = '.popup_type_img';
const cardTemplate = '#card';

const selectorPopupTypeProfile = '.popup_type_profile';

const selectorPopupTypeCard = '.popup_type_card';

const selectorProfileName = '.profile__name';
const selectorProfileDescription = '.profile__description';

export {
  editButton,
  addButton,
  cardContainerSelector,
  formProfile,
  profileNameInput,
  profileDescriptionInput,
  formCard,
  formSelectors,
  selectorPopupTypeImage,
  cardTemplate,
  selectorPopupTypeProfile,
  selectorPopupTypeCard,
  selectorProfileName,
  selectorProfileDescription,
}
