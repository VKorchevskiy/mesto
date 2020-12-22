let editButton = document.querySelector('.button_edit');
let overlay = document.querySelector('.overlay');
let closeButton = overlay.querySelector('.button_close');

let togglePopup = function () {
  overlay.classList.toggle('overlay_active');
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

overlay.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});

let formElement = overlay.querySelector('.form');

function handleFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.input-text_type_name');
  let jobInput = document.querySelector('.input-text_type_job');

  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;

  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  togglePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
