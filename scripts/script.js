const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const elementTemplate = document.querySelector('#element').content;
const overlay = document.querySelector('.overlay');

const popupTypeProfile = overlay.querySelector('.popup_type_profile');
const closePopupProfileButton = popupTypeProfile.querySelector('.popup__close');
const formProfile = popupTypeProfile.querySelector('.form_type_profile');
const ProfileNameInput = popupTypeProfile.querySelector('.form__input-text_type_name');
const profileDescriptionInput = popupTypeProfile.querySelector('.form__input-text_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupTypeElement = overlay.querySelector('.popup_type_element');
const closePopupElementButton = popupTypeElement.querySelector('.popup__close');
const formElement = popupTypeElement.querySelector('.form_type_element');
const elementNameInput = popupTypeElement.querySelector('.form__input-text_type_element-name');
const elementLinkInput = popupTypeElement.querySelector('.form__input-text_type_element-link');
const elementConteiner = document.querySelector('.elements');

const popupTypeImage = overlay.querySelector('.popup_type_img');
const closePopupImageButton = popupTypeImage.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addElement(el) {
  const cardElement = elementTemplate.cloneNode(true);
  const imageButton = cardElement.querySelector('.element__image');
  const elementTitle = cardElement.querySelector('.element__title');
  elementTitle.textContent = el.name;
  imageButton.setAttribute('src', el.link);
  setListeners(cardElement);
  elementConteiner.prepend(cardElement);
}

function setListeners(cardElement) {
  cardElement.querySelector('.element__like').addEventListener('click', () => handleLike(event) );
  cardElement.querySelector('.element__trash').addEventListener('click', () => handleDelete(event));
  cardElement.querySelector('.element__image').addEventListener('click', () => handleOpenPopup(popupTypeImage));
}

function handleLike(event) {
  event.target.classList.toggle('element__like_active');
}

function handleDelete(event) {
  event.target.closest('.element').remove();
}

initialCards.forEach(element => addElement(element));

function handleOpenPopup(popup) {
  ProfileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  const element = event.target.closest('.element');
  if (element) {
    overlay.classList.add('overlay_background-color_dark');
    popupImage.setAttribute('src', element.querySelector('.element__image').getAttribute('src'));
    popupCaption.textContent = element.querySelector('.element__title').textContent;
    element.closest('.overlay')
  }
  overlay.classList.remove('overlay_inactive');
  overlay.classList.add('overlay_active');
  popup.classList.add('popup_active');
  popup.classList.remove('overlay_inactive');
}

function handleClosePopup(popup) {
  overlay.classList.add('overlay_inactive');
  overlay.classList.remove('overlay_active');
  popup.classList.remove('popup_active');
  popup.classList.add('overlay_inactive');
  resetPopupForm(popup);
}

function resetPopupForm(popup) {
  if (popup.querySelector('.form')) {
    popup.querySelector('.form').reset();
  }
  popup.closest('.overlay').classList.remove('overlay_background-color_dark');
}

function getSubmitPopup(evt) {
  return evt.target.closest('.popup');
}

function getActivePopup(evt) {
  return evt.target.querySelector('.popup_active');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = ProfileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleClosePopup(getSubmitPopup(evt));
}

function handleElementFormSubmit(evt) {
  evt.preventDefault();
  addElement({
    name: elementNameInput.value,
    link: elementLinkInput.value
  });
  handleClosePopup(getSubmitPopup(evt));
}

function handleCloseOverlay(event) {
  if (event.target === event.currentTarget) {
    handleClosePopup(getActivePopup(event));
  }
}

overlay.addEventListener('click', () => handleCloseOverlay(event));
closePopupProfileButton.addEventListener('click', () => handleClosePopup(popupTypeProfile));
closePopupElementButton.addEventListener('click', () => handleClosePopup(popupTypeElement));
closePopupImageButton.addEventListener('click', () => handleClosePopup(popupTypeImage));
editButton.addEventListener('click', () => handleOpenPopup(popupTypeProfile));
addButton.addEventListener('click', () => handleOpenPopup(popupTypeElement));
formProfile.addEventListener('submit', handleProfileFormSubmit);
formElement.addEventListener('submit', handleElementFormSubmit);
