/* import './pages/index.css'; */
import { initialCards } from '../utils/initial-сards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  editButton,
  addButton,
  cardContainerSelector,
  formProfile,
  profileNameInput,
  profileDescriptionInput,
  formCard,
  formSelectors,
  selectorPopupTypeImage,
  cardTemplate,
  selectorPopupTypeProfile,
  selectorPopupTypeCard,
  selectorProfileName,
  selectorProfileDescription,
}
  from '../utils/constant.js';

const formProfileValidator = new FormValidator(formSelectors, formProfile);
const formCardValidator = new FormValidator(formSelectors, formCard);

const popupWithImage = new PopupWithImage(selectorPopupTypeImage);

popupWithImage.setEventListeners();

const userInfo = new UserInfo({ selectorProfileName: selectorProfileName, selectorProfileDescription: selectorProfileDescription });

const popupWithFormProfile = new PopupWithForm(selectorPopupTypeProfile, {
  submitForm: ({'name-profile': userName, 'job-profile': userDescription }) => {
    userInfo.setUserInfo({ userName, userDescription });
    popupWithFormProfile.close();
  },
});

popupWithFormProfile.setEventListeners();

function handleInitProfilePopup() {
  const {userName, userDescription} = userInfo.getUserInfo();
  profileNameInput.value = userName;
  profileDescriptionInput.value = userDescription;
  formProfileValidator.checkFormValidity();
  popupWithFormProfile.open();
}

function createCard ({name, link}, cardTemplate) {
  return new Card(
    { name, link },
     cardTemplate,
     {
       handleCardClick: () => {
         popupWithImage.open({ name, link });
       }
     }
   );
}

const cardsList = new Section({
  cards: initialCards,
  renderer: (initialCard) => {
    const card = createCard(initialCard, cardTemplate);
    cardsList.addItem(card.generateCard());
  },
}, cardContainerSelector);

cardsList.renderItems();

formProfileValidator.enableValidation();
formCardValidator.enableValidation();

const popupWithFormCard = new PopupWithForm(selectorPopupTypeCard, {
  submitForm: ({ 'card-name': name, 'card-link': link }) => {
    const card = createCard({ name, link }, cardTemplate);
    /* new Card(
     { name, link },
      cardTemplate,
      {
        handleCardClick: () => {
          popupWithImage.open({ name, link });
        }
      }
    ); */
    cardsList.addItem(card.generateCard());
    popupWithFormCard.close();
  },
});

popupWithFormCard.setEventListeners();

function handleInitCardPopup() {
  formCardValidator.checkFormValidity();
  popupWithFormCard.open();
}

editButton.addEventListener('click', handleInitProfilePopup);
addButton.addEventListener('click', handleInitCardPopup);

