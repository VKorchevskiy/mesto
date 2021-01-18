const editButton = document.querySelector('.profile__edit');
const overlay = document.querySelector('.overlay');
const closeButton = overlay.querySelector('.popup__close');
const formElement = overlay.querySelector('.form');
const nameInput = document.querySelector('.form__input-text_type_name');
const jobInput = document.querySelector('.form__input-text_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
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

function addElement (el) {
  const elementTemplate = document.querySelector('#element').content;
  const cardElement = elementTemplate.cloneNode(true);
  cardElement.querySelector('.element__title').textContent = el.name;
  cardElement.querySelector('.element__image').setAttribute('src', el.link);
  elementConteiner.appendChild(cardElement);
}

initialCards.forEach(element => addElement(element));

const openPopup = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  overlay.classList.add('overlay_active');
}

const closePopup = function () {
  overlay.classList.remove('overlay_active');
  nameInput.value = '';
  jobInput.value = '';
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

overlay.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});
closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', handleFormSubmit);
