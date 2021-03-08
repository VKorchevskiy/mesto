const popupTypeImage = document.querySelector('.popup_type_img');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const closePopupImageButton = document.querySelector('.popup_type_img').querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const cardContainerSelector = '.cards';
const popupTypeProfile = document.querySelector('.popup_type_profile');
const closePopupProfileButton = popupTypeProfile.querySelector('.popup__close');
const formProfile = popupTypeProfile.querySelector('.form_type_profile');
const profileNameInput = popupTypeProfile.querySelector('.form__input-text_type_name');
const profileDescriptionInput = popupTypeProfile.querySelector('.form__input-text_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupTypeCard = document.querySelector('.popup_type_card');
const closePopupCardButton = popupTypeCard.querySelector('.popup__close');
const formCard = popupTypeCard.querySelector('.form_type_card');
const cardNameInput = popupTypeCard.querySelector('.form__input-text_type_card-name');
const cardLinkInput = popupTypeCard.querySelector('.form__input-text_type_card-link');

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
  popupTypeImage,
  popupImage,
  popupCaption,
  closePopupImageButton,
  editButton,
  addButton,
  cardContainerSelector,
  popupTypeProfile,
  closePopupProfileButton,
  formProfile,
  profileNameInput,
  profileDescriptionInput,
  profileName,
  profileDescription,
  popupTypeCard,
  closePopupCardButton,
  formCard,
  cardNameInput,
  cardLinkInput,
  formSelectors,
  selectorCloseButton,
  selectorPopupTypeImage,
  cardTemplate,
  selectorPopupTypeProfile,
  selectorPopupTypeCard,
  selectorProfileName,
  selectorProfileDescription,
}
