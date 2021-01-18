const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const overlay = document.querySelector('.overlay');

const popupProfile = overlay.querySelector('.popup_type_profile');
const closeProfileButton = popupProfile.querySelector('.popup__close');
const formProfile = popupProfile.querySelector('.form_type_profile');
const ProfileNameInput = popupProfile.querySelector('.form__input-text_type_name');
const profileDescriptionInput = popupProfile.querySelector('.form__input-text_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupElement = overlay.querySelector('.popup_type_element');
const closeElementButton = popupElement.querySelector('.popup__close');
const formElement = popupElement.querySelector('.form_type_element');
const elementNameInput = popupElement.querySelector('.form__input-text_type_element-name');
const elementLinkInput = popupElement.querySelector('.form__input-text_type_element-link');
const elementConteiner = document.querySelector('.elements');
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
  elementConteiner.appendChild(cardElement);
}

initialCards.forEach(element => addElement(element));

const openProfilePopup = function () {
  ProfileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  overlay.classList.add('overlay_active');
  popupProfile.classList.add('popup_active');
}

const openElementPopup = function () {
  overlay.classList.add('overlay_active');
  popupElement.classList.add('popup_active');
}

const closePopup = function () {
  overlay.classList.remove('overlay_active');
  popupProfile.classList.remove('popup_active');
  popupElement.classList.remove('popup_active');
  ProfileNameInput.value = '';
  profileDescriptionInput.value = '';
  elementNameInput.value = '';
  elementLinkInput.value = '';
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = ProfileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}
function handleElementFormSubmit(evt) {
  evt.preventDefault();
  //console.log(elementNameInput.value + ' / ' + elementLinkInput.value);
  addElement({
    name: elementNameInput.value,
    link: elementLinkInput.value
  });
  closePopup();
}

overlay.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});
closeProfileButton.addEventListener('click', closePopup);
closeElementButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openElementPopup);
formProfile.addEventListener('submit', handleProfileFormSubmit);
formElement.addEventListener('submit', handleElementFormSubmit);
