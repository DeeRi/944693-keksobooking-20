'use strict';
(function () {
  var map = document.querySelector('.map');
  var fragment = document.createDocumentFragment();
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  window.card = {
    createCard: function (items) {
      var cardElement = similarCardTemplate.cloneNode(true);
      for (var i = 0; i < items.length; ++i) {
        var currentElement = items[i];
        cardElement.querySelector('.popup__title').textContent = currentElement.offer.title;
        cardElement.querySelector('.popup__text--address').textContent = currentElement.offer.address;
        cardElement.querySelector('.popup__text--price').textContent = currentElement.offer.price + '/ночь';
        switch (currentElement.offer.type) {
          case 'flat': cardElement.querySelector('.popup__type').textContent = 'Квартира';
            break;
          case 'bungalo': cardElement.querySelector('.popup__type').textContent = 'Бунгало';
            break;
          case 'house': cardElement.querySelector('.popup__type').textContent = 'Дом';
            break;
          case 'palace': cardElement.querySelector('.popup__type').textContent = 'Дворец';
            break;
        }
        cardElement.querySelector('.popup__text--capacity').textContent = currentElement.offer.rooms + ' комната для ' + currentElement.offer.guests + ' гостей';
        cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + currentElement.offer.checkin + ', выезд до ' + currentElement.offer.checkout;
        cardElement.querySelector('.popup__feature').textContent = currentElement.offer.features;
        cardElement.querySelector('.popup__description').textContent = currentElement.offer.description;
        cardElement.querySelector('.popup__avatar').src = currentElement.author.avatar;
        fragment.appendChild(cardElement);
      }
      map.insertBefore(fragment, mapFiltersContainer);
    }
  };
})();
