'use strict';
(function () {
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_ARROW_HEIGHT = 22;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var roomNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');
  var addressInput = document.querySelector('#address');
  var priceSelect = document.querySelector('#price');
  var flatSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var guestsValue = guestsNumber.options[guestsNumber.selectedIndex].value;
  var roomsValue = roomNumber.options[roomNumber.selectedIndex].value;

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

  var syncTime = function (element1, element2) {
    var selectedValue = element1.options[element1.selectedIndex].value;
    var options = element2.getElementsByTagName('option');
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === selectedValue) {
        options[i].selected = true;
      }
    }
  };

  var checkFlatType = function (value) {
    switch (value) {
      case 'bungalo':
        priceSelect.min = '0';
        priceSelect.placeholder = '0';
        break;
      case 'flat':
        priceSelect.min = '1000';
        priceSelect.placeholder = '1000';
        break;
      case 'house':
        priceSelect.min = '5000';
        priceSelect.placeholder = '5000';
        break;
      case 'palace':
        priceSelect.min = '10000';
        priceSelect.placeholder = '10000';
        break;
    }
  };

  var checkSelectValidity = function () {
    if ((Number(guestsValue) > Number(roomsValue)) || (guestsValue !== '0' && roomsValue === '100')) {
      guestsNumber.setCustomValidity('Неверное количество гостей');
    }
    if (guestsValue === '0' && roomsValue !== '100') {
      roomNumber.setCustomValidity('Неверное количество комнат');
    } else {
      guestsNumber.setCustomValidity('');
      roomNumber.setCustomValidity('');
    }
  };

  var validateSelect = function (element, fun) {
    element.addEventListener('change', function () {
      if (fun()) {
        return true;
      } else {
        return false;
      }
    });
  };


  validateSelect(timeInSelect, function () {
    syncTime(timeInSelect, timeOutSelect);
  });

  validateSelect(timeOutSelect, function () {
    syncTime(timeOutSelect, timeInSelect);
  });

  validateSelect(flatSelect, function () {
    checkFlatType(flatSelect.options[flatSelect.selectedIndex].value);
  });

  validateSelect(guestsNumber, checkSelectValidity);
  validateSelect(roomNumber, checkSelectValidity);


  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(form), function () {
    });
    var elements = form.getElementsByTagName('input');
    // eslint-disable-next-line no-console
    console.log(elements);
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].id === 'address') {
        continue;
      }
      elements[i].value = '';
    }
  });
})();
