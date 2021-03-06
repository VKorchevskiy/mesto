export function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', handleCloseEscOverlay);
  document.addEventListener('click', handleCloseOverlay);
}

function handleCloseEscOverlay() {
  const popupActive = document.querySelector('.popup_active');
  if (event.key === 'Escape') {
    handleClosePopup(popupActive);
  }
}

function handleCloseOverlay(event) {
  if (event.target.classList.contains('popup')) {
    handleClosePopup(event.target);
  }
}

export function handleClosePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', handleCloseEscOverlay);
  document.removeEventListener('.click', handleCloseOverlay);
}

