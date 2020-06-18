'use strict';
(function () {

  window.main = {
    getRandomArrayIndex: function (array) {
      var arrayLength = array.length;
      return Math.floor(Math.random() * Math.floor(arrayLength));
    },

    getRandomInteger: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
  };
})();
