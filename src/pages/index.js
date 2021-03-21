import './index.css';
//import { initialCards } from '../utils/initial-сards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  editButton,
  editButtonAvatar,
  addButton,
  cardContainerSelector,
  popupTypeProfile,
  formProfile,
  profileNameInput,
  profileDescriptionInput,
  popupTypeCard,
  formCard,
  selectorUserAvatar,
  selectorPopupTypeAvatar,
  popupTypeAvatar,
  formAvatar,
  formSelectors,
  optionsApi,
  selectorCloseButton,
  selectorPopupTypeImage,
  cardTemplate,
  selectorPopupTypeProfile,
  selectorPopupTypeCard,
  selectorProfileName,
  selectorProfileDescription,
} from '../utils/constant.js';

//Создание экземпляров форм
const formProfileValidator = new FormValidator(formSelectors, formProfile);
const formCardValidator = new FormValidator(formSelectors, formCard);
const formAvatarValidator = new FormValidator(formSelectors, formAvatar);

//Включение валидации форм
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();

//Экземпляр класса Api для работы с сервером
const api = new Api(optionsApi);

//экземпляр пользователя
const userInfo = new UserInfo(
  {
    selectorProfileName: selectorProfileName,
    selectorProfileDescription: selectorProfileDescription,
    selectorUserAvatar: selectorUserAvatar,
  },
);

//Отрисовка страницы данными с сервера
api.getUserInfo()
  .then(data => {
    //console.log(data);
    userInfo.setUserInfo({ name: data.name, about: data.about });
    userInfo.setUserAvatar({ avatar: data.avatar });
  })
  .catch(err => {
    console.log(err)
  });

api.getInitialCards()
  .then(data => {
    //console.log(data);
    const cardsList = new Section({
      cards: data,
      renderer: (initialCard) => {
        const card = createCard(initialCard, cardTemplate);
        cardsList.addItem(card.generateCard());
      },
    }, cardContainerSelector);
    cardsList.renderItems();
  })
  .catch(err => console.log(err));

//Редактирование профиля




const popupWithImage = new PopupWithImage(selectorPopupTypeImage);
popupWithImage.setEventListeners();


const popupWithFormProfile = new PopupWithForm(selectorPopupTypeProfile, {
  submitForm: ({ 'name-profile': userName, 'job-profile': userDescription }) => {
    userInfo.setUserInfo({ userName, userDescription });
    popupWithFormProfile.close();
  },
});

popupWithFormProfile.setEventListeners();

function handleInitProfilePopup() {
  const { userName, userDescription } = userInfo.getUserInfo();
  profileNameInput.value = userName;
  profileDescriptionInput.value = userDescription;
  formProfileValidator.checkFormValidity();
  popupWithFormProfile.open();
}

const popupWithFormAvatar = new PopupWithForm(selectorPopupTypeAvatar, {
  submitForm: () => {
    //userAvatar.src = ({ userName, userDescription });
    popupWithFormAvatar.close();
  },
});

popupWithFormAvatar.setEventListeners();

function handleInitAvatarPopup() {
  formAvatarValidator.checkFormValidity();
  popupWithFormAvatar.open();
}

function createCard({ name, link }, cardTemplate) {
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







const popupWithFormCard = new PopupWithForm(selectorPopupTypeCard, {
  submitForm: ({ 'card-name': name, 'card-link': link }) => {
    const card = createCard({ name, link }, cardTemplate);
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
editButtonAvatar.addEventListener('click', handleInitAvatarPopup);
addButton.addEventListener('click', handleInitCardPopup);

