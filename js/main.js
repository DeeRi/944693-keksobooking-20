'use strict';
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins'); /* элемент, в котором будут находиться новые элементы на странице*/
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); /* шаблон для создания метки*/
var fragment = document.createDocumentFragment();

var renderPin = function (item) {
  var pinElement = similarPinTemplate.cloneNode(true); /* клонируем структуру элемента, далее наполняем его новыми данными*/

  pinElement.style.left = (item.location.x + 40) + 'px';
  pinElement.style.top = (item.location.y + 44) + 'px';

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

addPin(places);
