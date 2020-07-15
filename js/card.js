'use strict';
(function () {
  var map = document.querySelector('.map');
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  window.card = {
    createCard: function (item) {
      if (map.querySelector('.map__card')) {
        return;
      }
      var cardElement = similarCardTemplate.cloneNode(true);
      var currentElement = item;
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
      var picturesArray = cardElement.querySelector('.popup__photos').children;
      var srcArray = currentElement.offer.photos;
      for (var index = 0; index < srcArray.length; ++index) {
        if (index > 0) {
          var imgElement = picturesArray[0].cloneNode(true);
          imgElement.src = srcArray[index];
          cardElement.querySelector('.popup__photos').appendChild(imgElement);
        } else {
          imgElement = picturesArray[0];
          imgElement.src = srcArray[index];
        }
      }

      var closePopup = cardElement.querySelector('.popup__close');
      closePopup.addEventListener('click', function () {
        cardElement.remove();
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
          cardElement.remove();
        }
      });
      map.insertBefore(cardElement, mapFiltersContainer);
    }
  };
})();
