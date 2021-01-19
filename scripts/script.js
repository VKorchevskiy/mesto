const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
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
const closeImageButton = popupTypeImage.querySelector('.popup__close');
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
  const elementTemplate = document.querySelector('#element').content;
  const cardElement = elementTemplate.cloneNode(true);
  cardElement.querySelector('.element__title').textContent = el.name;
  cardElement.querySelector('.element__image').setAttribute('src', el.link);
  elementConteiner.prepend(cardElement);
}

initialCards.forEach(element => addElement(element));

function openPopup(popup) {
  ProfileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  overlay.classList.add('overlay_active');
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  overlay.classList.remove('overlay_active');
  popupTypeProfile.classList.remove('popup_active');
  popupTypeElement.classList.remove('popup_active');
  popup.querySelector('.form').reset();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = ProfileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(evt.target.closest('.popup'));
}

function handleElementFormSubmit(evt) {
  evt.preventDefault();
  addElement({
    name: elementNameInput.value,
    link: elementLinkInput.value
  });
  closePopup(evt.target.closest('.popup'));
}

overlay.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    const popupActive = event.target.querySelector('.popup_active');
    const formActive = popupActive.querySelector('.form');
    if (formActive) {
      formActive.reset();
    }
    closePopup(popupActive);
  }

});
closePopupProfileButton.addEventListener('click', () => closePopup(popupTypeProfile));
closePopupElementButton.addEventListener('click', () => closePopup(popupTypeElement));
editButton.addEventListener('click', () => openPopup(popupTypeProfile));
addButton.addEventListener('click', () => openPopup(popupTypeElement));
formProfile.addEventListener('submit', handleProfileFormSubmit);
formElement.addEventListener('submit', handleElementFormSubmit);
