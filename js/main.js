'use strict';
var PRICES = [300, 400, 500, 600];
var ROOMS = [1, 2, 3, 4];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var GUESTS = [1, 2, 3, 4, 5, 6];
var CHECKTIME = ['12:00', '13:00', '14:00'];
var PICTURES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


var getRandomArrayIndex = function (array) {
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
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Some text',
        'address': '600, 350',
        'price': PRICES[getRandomArrayIndex(PRICES)],
        'type': TYPES[getRandomArrayIndex(TYPES)],
        'rooms': ROOMS[getRandomArrayIndex(PRICES)],
        'guests': GUESTS[getRandomArrayIndex(GUESTS)],
        'checkin': CHECKTIME[getRandomArrayIndex(CHECKTIME)],
        'checkout': CHECKTIME[getRandomArrayIndex(CHECKTIME)],
        'features': FEATURES.slice(0, getRandomArrayIndex(FEATURES)),
        'description': 'Your room description',
        'photos': PICTURES.slice(0, getRandomArrayIndex(PICTURES)),
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins'); /* элемент, в котором будут находиться новые элементы на странице*/
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); /* шаблон для создания метки*/
var fragment = document.createDocumentFragment();

var renderPin = function (item) {
  var pinElement = similarPinTemplate.cloneNode(true); /* клонируем структуру элемента, далее наполняем его новыми данными*/
  // eslint-disable-next-line no-console
  console.log(item);
  pinElement.style.left = item.location.x;
  pinElement.style.top = item.location.y;
  pinElement.querySelector('img').alt = item.offer.description;
  pinElement.querySelector('img').src = item.author.avatar;
  return pinElement;
};

var addPin = function (items) {
  for (var i = 0; i < items.length; i++) {
    fragment.appendChild(renderPin(items[i]));
  }
  similarListElement.appendChild(fragment);
};

addPin(places);
