let editButton = document.querySelector('.profile__edit');
let overlay = document.querySelector('.overlay');
let closeButton = overlay.querySelector('.popup__close');
let formElement = overlay.querySelector('.form');
let nameInput = document.querySelector('.form__input-text_type_name');
let jobInput = document.querySelector('.form__input-text_type_job');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let openPopup = function () {
/*   console.log(nameInput.value); */
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
/*   console.log(nameInput.value); */
  overlay.classList.add('overlay_active');
}

let closePopup = function () {
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
