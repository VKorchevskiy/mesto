const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const cardTemplate = document.querySelector('#card').content;
const cardContainer = document.querySelector('.cards');

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
  return card;
}

function renderCard(card) {
  cardContainer.prepend(card);
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like_active');
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

initialCards.forEach(element => renderCard(createCard(element)));

function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', handleCloseEscOverlay);
}

function handleInitProfilePopup() {
  formProfile.reset();
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openValidateForm(formProfile, 'form__save_inactive', 'form__input-text_type_error', 'form__input-error_active');
  openPopup(popupTypeProfile);
}

function handleProfileFormSubmit() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleClosePopup(popupTypeProfile);
}

function handleInitCardPopup() {
  formCard.reset();
  openValidateForm(formCard, 'form__save_inactive', 'form__input-text_type_error', 'form__input-error_active');
  openPopup(popupTypeCard);
}

function handleCardFormSubmit() {
  renderCard(createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }));
  handleClosePopup(popupTypeCard);
}

function initImagePopup(event) {
  popupImage.setAttribute('src', event.target.src);
  popupImage.setAttribute('alt', event.target.alt);
  popupCaption.textContent = event.target.alt;
  openPopup(popupTypeImage);
}

function handleClosePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', handleCloseEscOverlay);
}

function handleCloseOverlay(event) {
  if (event.target.classList.contains('popup')) {
    handleClosePopup(event.target);
  }
}

function handleCloseEscOverlay() {
  const popupActive = document.querySelector('.popup_active');
  if (event.key === 'Escape') {
    handleClosePopup(popupActive);
  }
}

function handleCardContainer(event) {
  if (event.target.classList.contains('card__like')) likeCard(event);
  if (event.target.classList.contains('card__trash')) deleteCard(event);
  if (event.target.classList.contains('card__image')) initImagePopup(event);
}

document.addEventListener('click', handleCloseOverlay);
cardContainer.addEventListener('click', handleCardContainer);
editButton.addEventListener('click', handleInitProfilePopup);
formProfile.addEventListener('submit', handleProfileFormSubmit);
closePopupProfileButton.addEventListener('click', () => handleClosePopup(popupTypeProfile));
addButton.addEventListener('click', handleInitCardPopup);
formCard.addEventListener('submit', handleCardFormSubmit);
closePopupCardButton.addEventListener('click', () => handleClosePopup(popupTypeCard));
closePopupImageButton.addEventListener('click', () => handleClosePopup(popupTypeImage));
