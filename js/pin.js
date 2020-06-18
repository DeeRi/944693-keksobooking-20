'use strict';
(function () {
  var PIN_X_SHIFT = 50 / 2;
  var PIN_Y_SHIFT = 70;
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

  window.pin = {
    addPin: function (items) {
      for (var i = 0; i < items.length; i++) {
        fragment.appendChild(renderPin(items[i]));
      }
      similarListElement.appendChild(fragment);
    }
  };
})();
