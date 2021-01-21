const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const cardTemplate = document.querySelector('#card').content;

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
const cardConteiner = document.querySelector('.cards');

const popupTypeImage = document.querySelector('.popup_type_img');
const closePopupImageButton = popupTypeImage.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

function createCard(el) {
  const card = cardTemplate.cloneNode(true);
  const imageButton = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = el.name;
  imageButton.setAttribute('src', el.link);
  imageButton.setAttribute('alt', el.name);
  setListeners(card);
  return card;
}

function renderCard(card) {
  cardConteiner.prepend(card);
}

function setListeners(card) {
  card.querySelector('.card__like').addEventListener('click', () => handleLike(event) );
  card.querySelector('.card__trash').addEventListener('click', () => handleDelete(event));
  card.querySelector('.card__image').addEventListener('click', () => handleOpenPopup(popupTypeImage));
}

function handleLike(event) {
  event.target.classList.toggle('card__like_active');
}

function handleDelete(event) {
  event.target.closest('.card').remove();
}

initialCards.forEach(element => renderCard(createCard(element)));

function handleOpenPopup(popup) {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  const card = event.target.closest('.card');
  if (card) {
    overlay.classList.add('overlay_background-color_dark');
    popupImage.setAttribute('src', card.querySelector('.card__image').getAttribute('src'));
    popupCaption.textContent = card.querySelector('.card__title').textContent;
    card.closest('.overlay')
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
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleClosePopup(getSubmitPopup(evt));
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  });
  handleClosePopup(getSubmitPopup(evt));
}

function handleCloseOverlay(event) {
  if (event.target === event.currentTarget) {
    handleClosePopup(getActivePopup(event));
  }
}

//overlay.addEventListener('click', () => handleCloseOverlay(event));
closePopupProfileButton.addEventListener('click', () => handleClosePopup(popupTypeProfile));
closePopupCardButton.addEventListener('click', () => handleClosePopup(popupTypeCard));
closePopupImageButton.addEventListener('click', () => handleClosePopup(popupTypeImage));
editButton.addEventListener('click', () => handleOpenPopup(popupTypeProfile));
addButton.addEventListener('click', () => handleOpenPopup(popupTypeCard));
formProfile.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleCardFormSubmit);
