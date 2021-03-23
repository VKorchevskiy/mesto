/* import './index.css'; */
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

// экземпляр пользователя
const userInfo = new UserInfo(
  {
    selectorProfileName: selectorProfileName,
    selectorProfileDescription: selectorProfileDescription,
    selectorUserAvatar: selectorUserAvatar,
  },
  api
);

//1) Взятие данных пользователя
api.getUserInfo()
  .then(data => {
    console.log(data);
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
  })
  .catch(err => {
    console.log(err)
  });

//2+5) отрисовка карточек с сервера с лайками
const cardsList = new Section({
  renderer: (initialCard) => {
    const card = createCard(initialCard, cardTemplate);
    //console.log(initialCard);
    cardsList.addItem(card.generateCard());
  },
}, cardContainerSelector, api);

api.getInitialCards()
  .then(data => {
    //console.log(data);
    cardsList.renderItems(data);
  })
  .catch(err => console.log(err));

//3) Редактирование информации профиля
const popupWithFormProfile = new PopupWithForm(selectorPopupTypeProfile, {
  submitForm: ({ 'name-profile': name, 'job-profile': about }) => {
    api.setUserInfo({name, about})
    .then(({name, about}) => {
      userInfo.setUserInfo({ name, about });
      popupWithFormProfile.close();
    })
    .catch(err => console.log(err));
  },
});

popupWithFormProfile.setEventListeners();

function handleInitProfilePopup() {
  const { name, about } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = about;
  formProfileValidator.checkFormValidity();
  popupWithFormProfile.open();
}

//4) Добавление новой карточки
const popupWithFormCard = new PopupWithForm(selectorPopupTypeCard, {
  submitForm: ({ 'card-name': name, 'card-link': link }) => {
    api.setCard({name, link})
    .then(({name, link}) => {
      const card = createCard({ name, link }, cardTemplate);
      cardsList.addItem(card.generateCard());
      popupWithFormCard.close();
    })
    .catch(err => console.log(err));
  },
});

popupWithFormCard.setEventListeners();

function handleInitCardPopup() {
  formCardValidator.checkFormValidity();
  popupWithFormCard.open();
}

//Работа с попапом картинки
const popupWithImage = new PopupWithImage(selectorPopupTypeImage);

popupWithImage.setEventListeners();



function createCard(card, cardTemplate) {
  return new Card(
    card,
    cardTemplate,
    {
      handleCardClick: () => {
        popupWithImage.open(card);
      }
    }
  );
}

//9) Сменить аватар
const popupWithFormAvatar = new PopupWithForm(selectorPopupTypeAvatar, {
  submitForm: ({ 'user-avatar': avatar }) => {
    console.log({avatar});
    //userInfo.setUserAvatar( {link} );
    api.setAvatar( {avatar} )
    .then(( {avatar} ) => {
      userInfo.setUserAvatar( {avatar} );
      popupWithFormAvatar.close();
    })
    .catch(err => console.log(err));
  },
});

popupWithFormAvatar.setEventListeners();

function handleInitAvatarPopup() {
  formAvatarValidator.checkFormValidity();
  popupWithFormAvatar.open();
}

editButton.addEventListener('click', handleInitProfilePopup);
editButtonAvatar.addEventListener('click', handleInitAvatarPopup);
addButton.addEventListener('click', handleInitCardPopup);





/*
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
  api
);

//1) Взятие данных пользователя
api.getUserInfo()
  .then(data => {
    //console.log(data);
    userInfo.setUserInfo({ name: data.name, about: data.about });
    userInfo.setUserAvatar({ avatar: data.avatar });
  })
  .catch(err => {
    console.log(err)
  });

//2) отрисовка карточек с сервера
const cardsList = new Section({
  renderer: (initialCard) => {
    const card = createCard(initialCard, cardTemplate);
    cardsList.addItem(card.generateCard());
  },
}, cardContainerSelector);

api.getInitialCards()
  .then(data => {
    //console.log(data);
    cardsList.renderItems(data);
  })
  .catch(err => console.log(err));

//3) Редактирование информации профиля
const popupWithFormProfile = new PopupWithForm(selectorPopupTypeProfile, {
  submitForm: ({ 'name-profile': name, 'job-profile': about }) => {
    api.setUserInfo({name, about})
    .then(({name, about}) => {
      userInfo.setUserInfo({ name, about });
      popupWithFormProfile.close();
    })
    .catch(err => console.log(err));
  },
});

popupWithFormProfile.setEventListeners();

function handleInitProfilePopup() {
  const { name, about } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = about;
  formProfileValidator.checkFormValidity();
  popupWithFormProfile.open();
}

//4) Добавление новой карточки
const popupWithFormCard = new PopupWithForm(selectorPopupTypeCard, {
  submitForm: ({ 'card-name': name, 'card-link': link }) => {
    api.setCard({name, link})
    .then(({name, link}) => {
      const card = createCard({ name, link }, cardTemplate);
      cardsList.addItem(card.generateCard());
      popupWithFormCard.close();
    })
    .catch(err => console.log(err));
  },
});

popupWithFormCard.setEventListeners();

function handleInitCardPopup() {
  formCardValidator.checkFormValidity();
  popupWithFormCard.open();
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

const popupWithImage = new PopupWithImage(selectorPopupTypeImage);
popupWithImage.setEventListeners();

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









editButton.addEventListener('click', handleInitProfilePopup);
editButtonAvatar.addEventListener('click', handleInitAvatarPopup);
addButton.addEventListener('click', handleInitCardPopup);


*/
