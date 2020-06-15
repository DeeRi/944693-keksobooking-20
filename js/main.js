'use strict';
var PIN_X_SHIFT = 50 / 2;
var PIN_Y_SHIFT = 70;
var MAIN_PIN_SIZE = 65;
var MAIN_PIN_ARROW_HEIGHT = 22;
var prices = [300, 400, 500, 600];
var rooms = [1, 2, 3, 4];
var types = ['palace', 'flat', 'house', 'bungalo'];
var guests = [1, 2, 3, 4, 5, 6];
var checkOptions = ['12:00', '13:00', '14:00'];
var pictures = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


var getRandomArrayIndex = function (array) {
  var arrayLength = array.length;
  return Math.floor(Math.random() * Math.floor(arrayLength));
};

function getRandomInteger(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

var generateArray = function () {
  var newArray = [];
  var arrayLength = 8;
  for (var i = 0; i < arrayLength; ++i) {
    var newItem = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Some text',
        'address': '600, 350',
        'price': prices[getRandomArrayIndex(prices)],
        'type': types[getRandomArrayIndex(types)],
        'rooms': rooms[getRandomArrayIndex(rooms)],
        'guests': guests[getRandomArrayIndex(guests)],
        'checkin': checkOptions[getRandomArrayIndex(checkOptions)],
        'checkout': checkOptions[getRandomArrayIndex(checkOptions)],
        'features': features.slice(0, getRandomArrayIndex(features)),
        'description': 'Your room description',
        'photos': pictures.slice(0, getRandomArrayIndex(pictures)),
      },
      'location': {
        'x': getRandomInteger(0, 1000),
        'y': getRandomInteger(130, 630)
      }
    };
    newArray.push(newItem);
  }
  return newArray;
};

var places = generateArray();

var similarListElement = document.querySelector('.map__pins'); /* элемент, в котором будут находиться новые элементы на странице*/
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); /* шаблон для создания метки*/
var fragment = document.createDocumentFragment();

var renderPin = function (item) {
  var pinElement = similarPinTemplate.cloneNode(true); /* клонируем структуру элемента, далее наполняем его новыми данными*/

  pinElement.style.left = (item.location.x) - PIN_X_SHIFT + 'px';
  pinElement.style.top = (item.location.y) - PIN_Y_SHIFT + 'px';

  var pinImage = pinElement.querySelector('img');
  pinImage.alt = item.offer.description;
  pinImage.src = item.author.avatar;

  return pinElement;
};

var addPin = function (items) {
  for (var i = 0; i < items.length; i++) {
    fragment.appendChild(renderPin(items[i]));
  }
  similarListElement.appendChild(fragment);
};

// Активация страницы
var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.children;
var mapFilters = document.querySelector('.map__filters').children;

var changeFormState = function (array, value) {
  for (var i = 0; i < array.length; ++i) {
    array[i].disabled = value;
  }
};
changeFormState(adFormElements, true);
changeFormState(mapFilters, true);

// заполнение поля адрес
var addressInput = document.querySelector('#address');

var fillAddress = function () {
  if (map.classList.contains('map--faded')) {
    addressInput.value = Math.round(mapPinMain.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.round(mapPinMain.offsetTop + MAIN_PIN_SIZE / 2);
  } else {
    addressInput.value = Math.round(mapPinMain.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.round(mapPinMain.offsetTop + MAIN_PIN_SIZE + MAIN_PIN_ARROW_HEIGHT);
  }
};

mapPinMain.addEventListener('mousemove', function () {
  addressInput.value = Math.round(mapPinMain.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.round(mapPinMain.offsetTop + MAIN_PIN_ARROW_HEIGHT);
});

fillAddress();

var activatePage = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    map.classList.remove('map--faded');
    addPin(places);
    adForm.classList.remove('ad-form--disabled');
    changeFormState(adFormElements, false);
    changeFormState(mapFilters, false);
    addressInput.value = '';
    fillAddress();
  }
};

mapPinMain.addEventListener('mousedown', activatePage);
mapPinMain.addEventListener('keydown', activatePage);

// Валидация формы
var roomNumber = document.querySelector('#room_number');
var guestsNumber = document.querySelector('#capacity');

var checkSelectValidity = function () {
  if (guestsNumber.options[guestsNumber.selectedIndex].value !== roomNumber.options[roomNumber.selectedIndex].value) {
    guestsNumber.setCustomValidity('Неверное количество гостей');
  } else {
    guestsNumber.setCustomValidity('');
  }
};

var validateSelect = function (element) {
  element.addEventListener('change', function () {
    if (checkSelectValidity()) {
      return true;
    } else {
      return false;
    }
  });
};

validateSelect(roomNumber);
validateSelect(guestsNumber);
