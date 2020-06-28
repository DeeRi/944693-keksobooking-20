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
  var MAX_PINS_NUMBER = 5;

  var changeFormState = function (array, value) {
    for (var i = 0; i < array.length; ++i) {
      array[i].disabled = value;
    }
  };

  changeFormState(adFormElements, true);
  changeFormState(mapFilters, true);

  var addPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_PINS_NUMBER; i++) {
      fragment.appendChild(window.pin.renderPin(data[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var pins = [];
  var successHandler = function (data) {
    pins = data;
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

  var updatePins = function () {
    var samePinType = pins.filter(function (pin) {
      return pin.type === housingType.options[housingType.selectedIndex].value;
    });
    addPins(samePinType);
  };

  var activatePage = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      changeFormState(adFormElements, false);
      changeFormState(mapFilters, false);
      addressInput.value = '';
      window.form.fillAddress();
      addPins(window.backend.load(successHandler, errorHandler));
    }
  };

  mapPinMain.addEventListener('mousedown', activatePage);
  mapPinMain.addEventListener('keydown', activatePage);

  housingType.addEventListener('onchange', function () {
    updatePins();
  });
})();
