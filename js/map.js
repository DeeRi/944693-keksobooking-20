'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.children;
  var mapFilters = document.querySelector('.map__filters').children;
  var addressInput = document.querySelector('#address');

  var changeFormState = function (array, value) {
    for (var i = 0; i < array.length; ++i) {
      array[i].disabled = value;
    }
  };
  changeFormState(adFormElements, true);
  changeFormState(mapFilters, true);

  var activatePage = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      map.classList.remove('map--faded');
      window.pin.addPin(window.data.generateArray());
      adForm.classList.remove('ad-form--disabled');
      changeFormState(adFormElements, false);
      changeFormState(mapFilters, false);
      addressInput.value = '';
      window.form.fillAddress();
    }
  };

  mapPinMain.addEventListener('mousedown', activatePage);
  mapPinMain.addEventListener('keydown', activatePage);
})();
