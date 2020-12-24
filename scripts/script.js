let editButton = document.querySelector('.button_edit');
let overlay = document.querySelector('.overlay');
let closeButton = overlay.querySelector('.button_close');
let formElement = overlay.querySelector('.form');
let nameInput = document.querySelector('.input-text_type_name');
let jobInput = document.querySelector('.input-text_type_job');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let togglePopup = function () {
  overlay.classList.toggle('overlay_active');
}



overlay.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
});


function handleFormSubmit(evt) {
  evt.preventDefault();



  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  togglePopup();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', handleFormSubmit);
