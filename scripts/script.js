const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const cardTemplate = document.querySelector('#card').content;
const popups = document.querySelectorAll('.popup');
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
  setListenersCard(card);
  return card;
}

function renderCard(card) {
  cardConteiner.prepend(card);
}

function setListenersCard(card) {
  card.querySelector('.card__like').addEventListener('click', handleLike);
  card.querySelector('.card__trash').addEventListener('click', handleDelete);
  card.querySelector('.card__image').addEventListener('click', () => handleInitImagePopup(popupTypeImage));
}

function handleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

function handleDelete(evt) {
  evt.target.closest('.card').remove();
}

initialCards.forEach(element => renderCard(createCard(element)));

function openPopup(popup) {
  popup.classList.add('popup_active');
}

function handleInitProfilePopup(popup) {
  formProfile.reset();
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(popup);
}

function handleProfileFormSubmit(popup) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  handleClosePopup(popup);
  formProfile.reset();
}

function handleInitCardPopup(popup) {
  formCard.reset();
  openPopup(popup);
}

function handleCardFormSubmit(popup) {
  event.preventDefault();
  renderCard(createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }));
  handleClosePopup(popup);
  formCard.reset();
}

function handleInitImagePopup(popup) {
  popupImage.setAttribute('src', event.target.getAttribute('src'));
  popupImage.setAttribute('alt', event.target.getAttribute('alt'));
  popupCaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
  openPopup(popup);
}

function handleClosePopup(popup) {
  popup.classList.remove('popup_active');
}

function handleCloseOverlay(event) {
  if (event.target === event.currentTarget) {
    handleClosePopup(event.target);
  }
}

function setListenersOverlay(el) {
  el.addEventListener('click', handleCloseOverlay)
}

popups.forEach((el) => setListenersOverlay(el));
editButton.addEventListener('click', () => handleInitProfilePopup(popupTypeProfile));
formProfile.addEventListener('submit', () => handleProfileFormSubmit(popupTypeProfile));
closePopupProfileButton.addEventListener('click', () => handleClosePopup(popupTypeProfile));
addButton.addEventListener('click', () => handleInitCardPopup(popupTypeCard));
formCard.addEventListener('submit', () => handleCardFormSubmit(popupTypeCard));
closePopupCardButton.addEventListener('click', () => handleClosePopup(popupTypeCard));
closePopupImageButton.addEventListener('click', () => handleClosePopup(popupTypeImage));
