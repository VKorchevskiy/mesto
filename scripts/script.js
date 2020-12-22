let editButton = document.querySelector('.button_edit');
let overlay = document.querySelector('.overlay');
let closeButton = overlay.querySelector('.button_close');

let togglePopup = function() {
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

function handleFormSubmit (evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.input-text_type_name');
  let jobInput = document.querySelector('.input-text_type_job');

 /*  let nameInputValue = nameInput.getAttribute('value');
  console.log(nameInputValue) */

  // Получите значение полей из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
