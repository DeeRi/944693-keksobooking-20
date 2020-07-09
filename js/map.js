'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.children;
  var similarListElement = document.querySelector('.map__pins'); /* элемент, в котором будут находиться новые элементы на странице*/
  var mapFilters = document.querySelector('.map__filters').children;
  var addressInput = document.querySelector('#address');
  var housingType = document.querySelector('#housing-type');
  var fragment = document.createDocumentFragment();
  var MAX_PINS_NUMBER = 5;

  var changeFormState = function (array, value) {
    for (var i = 0; i < array.length; ++i) {
      array[i].disabled = value;
    }
  };

  changeFormState(adFormElements, true);
  changeFormState(mapFilters, true);

  var addPins = function (data) {
    var numberOfElements = data.length >= MAX_PINS_NUMBER ? data.slice(0, MAX_PINS_NUMBER) : data;
    for (var i = 0; i < numberOfElements.length; i++) {
      fragment.appendChild(window.pin.renderPin(numberOfElements[i]));
    }
    similarListElement.appendChild(fragment);
  };

  // переменная для сохранения данных с сервера
  var pins = [];
  var successHandler = function (data) {
    pins = data;
    window.card.createCard(pins[0]);
    addPins(pins);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


  var updatePins = function (array) {
    similarListElement.innerHTML = '';
    similarListElement.appendChild(mapPinMain);
    var samePinType = array.filter(function (item) {
      if (item.offer.type.toString() === housingType.options[housingType.selectedIndex].value.toString()) {
        return true;
      } else if (housingType.options[housingType.selectedIndex].value.toString() === 'any') {
        return true;
      } else {
        return false;
      }
    });
    addPins(samePinType);
  };

  var activatePage = function (evt) {
    if ((evt.button === 0 || evt.key === 'Enter') && !map.classList.contains('map--faded')) {
      return;
    } else if (evt.button === 0 || evt.key === 'Enter') {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      changeFormState(adFormElements, false);
      changeFormState(mapFilters, false);
      addressInput.value = '';
      window.form.fillAddress();
      window.backend.load(successHandler, errorHandler);
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    activatePage(evt);
  }
  );

  mapPinMain.addEventListener('keydown', function (evt) {
    activatePage(evt);
  });

  housingType.addEventListener('change', function () {
    updatePins(pins);
  });
})();
