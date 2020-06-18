'use strict';
(function () {
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_ARROW_HEIGHT = 22;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var roomNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');
  var addressInput = document.querySelector('#address');

  window.form = {
    fillAddress: function () {
      if (map.classList.contains('map--faded')) {
        addressInput.value = Math.round(mapPinMain.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.round(mapPinMain.offsetTop + MAIN_PIN_SIZE / 2);
      } else {
        addressInput.value = Math.round(mapPinMain.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.round(mapPinMain.offsetTop + MAIN_PIN_SIZE + MAIN_PIN_ARROW_HEIGHT);
      }
    }
  };

  window.addEventListener('load', function () {
    window.form.fillAddress();
  });

  mapPinMain.addEventListener('mousemove', function () {
    addressInput.value = Math.round(mapPinMain.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.round(mapPinMain.offsetTop + MAIN_PIN_ARROW_HEIGHT);
  });

  mapPinMain.addEventListener('mousemove', function () {
    addressInput.value = Math.round(mapPinMain.offsetLeft + MAIN_PIN_SIZE / 2) + ', ' + Math.round(mapPinMain.offsetTop + MAIN_PIN_ARROW_HEIGHT);
  });

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
})();
