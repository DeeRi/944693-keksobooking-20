'use strict';
(function () {
  var PIN_X_SHIFT = 50 / 2;
  var PIN_Y_SHIFT = 70;
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); /* шаблон для создания метки*/

  window.pin = {
    renderPin: function (item) {
      var pinElement = similarPinTemplate.cloneNode(true); /* клонируем структуру элемента, далее наполняем его новыми данными*/

      pinElement.style.left = (item.location.x) - PIN_X_SHIFT + 'px';
      pinElement.style.top = (item.location.y) - PIN_Y_SHIFT + 'px';

      var pinImage = pinElement.querySelector('img');
      pinImage.alt = item.offer.description;
      pinImage.src = item.author.avatar;
      return pinElement;
    },

    addCardOnClick: function (items, data) {
      for (var i = 1; i < items.length; ++i) {
        items[i].addEventListener('click', function () {
          window.card.createCard(data[i]);
        });
      }
    }
  };
})();
