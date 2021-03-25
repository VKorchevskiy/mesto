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
  selectorPopupTypeDelete,
  popupTypeDelete,
  formDelete,
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
const formDeleteValidator = new FormValidator(formSelectors, formDelete);

//Включение валидации форм
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();
formDeleteValidator.enableValidation();

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

userInfo.getUserInfoOnServer();

//2+5) отрисовка карточек с сервера с лайками
const cardsList = new Section({
  renderer: (initialCard) => {
    const card = createCard(initialCard, cardTemplate);
    cardsList.addItemPrepend(card.renderMyLike(card.setLikeCount(card.generateCard())));
  },
}, cardContainerSelector, api);

cardsList.renderCardsFromServer();

//3) Редактирование информации профиля
const popupWithFormProfile = new PopupWithForm(selectorPopupTypeProfile, {
  submitForm: ({ 'name-profile': name, 'job-profile': about }) => {
    api.setUserInfo({ name, about })
      .then(({ name, about }) => {
        userInfo.setUserInfo({ name, about });
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupWithFormProfile.close();
      });
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
    api.setCard({ name, link })
      .then((data) => {
        const card = createCard(data, cardTemplate);
        cardsList.addItemAppend(card.setLikeCount(card.generateCard()));
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupWithFormCard.close();
      });
  },
});

popupWithFormCard.setEventListeners();

function handleInitCardPopup() {
  formCardValidator.checkFormValidity();
  popupWithFormCard.open();
}

//7) Удаление карточки
const popupDelete = new PopupWithForm(selectorPopupTypeDelete, {
  submitForm: () => {
    const card = popupDelete.data;

    api.deleteCard(card._id)
      .then(() => {
        card.removeCard();
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupDelete.close();
      });
  }
});

popupDelete.setEventListeners();

//Работа с попапом картинки
const popupWithImage = new PopupWithImage(selectorPopupTypeImage);

popupWithImage.setEventListeners();

/**
 * Создаёт карточку, готовую для вставки в DOM
 * @param {*} card - карточка
 * @param {*} cardTemplate - шаблон карточки
 */
function createCard(card, cardTemplate) {
  return new Card(
    card,
    cardTemplate,
    {
      handleCardClick: () => {
        popupWithImage.open(card);
      }
    },
    {
      handelDeleteIcon: (card) => {
        popupDelete.open(card)
      }
    },
    {
      handleLikeIcon: (card) => {
        if(card.toggleIsLiked()) {
          api.putLike(card.getId())
          .then(() => {
            card.renderToogleLikeCard();
            card.incrementLikeCount();
          })
          .catch(err => console.log(err));
        } else {
          api.deleteLike(card.getId())
          .then(() => {
            card.renderToogleLikeCard();
            card.decrementLikeCount();
          })
          .catch(err => console.log(err))
        }
      }
    },
    api,
    userInfo.getUserId(),
  );
}



//9) Сменить аватар
const popupWithFormAvatar = new PopupWithForm(selectorPopupTypeAvatar, {
  submitForm: ({ 'user-avatar': avatar }) => {
    api.setAvatar({ avatar })
      .then(({ avatar }) => {
        userInfo.setUserAvatar({ avatar });
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
