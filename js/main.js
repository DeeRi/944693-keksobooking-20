'use strict';
var PRICES = [300, 400, 500, 600];
var ROOMS = [1, 2, 3, 4];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var GUESTS = [1, 2, 3, 4, 5, 6];
var CHECKTIME = ['12:00', '13:00', '14:00'];
/*
var PICTURES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
*/

var generateRandomNumber = function (array) {
  var arrayLength = array.length;
  return Math.floor(Math.random() * Math.floor(arrayLength));
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var generateArray = function () {
  var newArray = [];
  var arrayLength = 8;
  for (var i = 0; i < arrayLength; ++i) {
    var newItem = {
      'author': {
        'avatar': 'Address of the picture'
      },
      'offer': {
        'title': 'Some text',
        'address': '600, 350',
        'price': PRICES[generateRandomNumber(PRICES)],
        'type': TYPES[generateRandomNumber(TYPES)],
        'rooms': ROOMS[generateRandomNumber(PRICES)],
        'guests': GUESTS[generateRandomNumber(GUESTS)],
        'checkin': CHECKTIME[generateRandomNumber(CHECKTIME)],
        'checkout': CHECKTIME[generateRandomNumber(CHECKTIME)],
        'features': 'Some features',
        'description': 'Your room description',
        'photos': 'Some pictures'
      },
      'location': {
        'x': getRandomArbitrary(0, 300),
        'y': getRandomArbitrary(130, 630)
      }
    };
    newArray.push(newItem);
  }
  return newArray;
};

var places = generateArray();
// eslint-disable-next-line no-console
console.log(places);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins'); /* элемент, в котором будут находиться новые элементы на странице*/
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); /* шаблон для создания метки*/
var fragment = document.createDocumentFragment();

var renderPin = function (item) {
  var pinElement = similarPinTemplate.cloneNode(true); /* клонируем структуру элемента, далее наполняем его новыми данными*/
  /* код с добавлением данных x,y и аватар*/
  // eslint-disable-next-line no-console
  console.log(item);
  pinElement.style.left = item.location.x;
  pinElement.style.top = item.location.y;
  pinElement.querySelector('img').alt = item.offer.description;
  return pinElement;
};

var addPin = function (items) {
  for (var i = 0; i < items.length; i++) {
    fragment.appendChild(renderPin(items[i]));
  }
  similarListElement.appendChild(fragment);
};

addPin(places);
