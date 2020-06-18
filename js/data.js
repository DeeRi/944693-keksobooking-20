'use strict';
(function () {
  var prices = [300, 400, 500, 600];
  var rooms = [1, 2, 3, 4];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var guests = [1, 2, 3, 4, 5, 6];
  var checkOptions = ['12:00', '13:00', '14:00'];
  var pictures = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.data = {
    generateArray: function () {
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
            'price': prices[window.main.getRandomArrayIndex(prices)],
            'type': types[window.main.getRandomArrayIndex(types)],
            'rooms': rooms[window.main.getRandomArrayIndex(rooms)],
            'guests': guests[window.main.getRandomArrayIndex(guests)],
            'checkin': checkOptions[window.main.getRandomArrayIndex(checkOptions)],
            'checkout': checkOptions[window.main.getRandomArrayIndex(checkOptions)],
            'features': features.slice(0, window.main.getRandomArrayIndex(features)),
            'description': 'Your room description',
            'photos': pictures.slice(0, window.main.getRandomArrayIndex(pictures)),
          },
          'location': {
            'x': window.main.getRandomInteger(0, 1000),
            'y': window.main.getRandomInteger(130, 630)
          }
        };
        newArray.push(newItem);
      }
      return newArray;
    }
  };

})();
