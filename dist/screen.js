'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screen = function () {
  function Screen() {
    _classCallCheck(this, Screen);
  }

  _createClass(Screen, [{
    key: 'show',
    value: function show(data) {
      var instagram = {
        icon: '📷',
        status: _colors2.default.red('✗'),
        data: {}
      };
      var twitter = {
        icon: '🐦',
        status: _colors2.default.red('✗'),
        data: {}
      };
      if (data.instagram.length > 0) {
        instagram.status = _colors2.default.green('✓');
        instagram.data = data.instagram[0];
        console.log(instagram.status + ' - ' + instagram.icon + ('  ' + instagram.data.fullName + ' - https://www.instagram.com/' + instagram.data.username));
      } else {
        console.log(instagram.status + ' - ' + instagram.icon + '  Instagram');
      }
      if (data.twitter.length > 0) {
        twitter.status = _colors2.default.green('✓');
        twitter.data = data.twitter[0];
        console.log(twitter.status + ' - ' + twitter.icon + ('  ' + twitter.data.fullName + ' - https://twitter.com/' + twitter.data.username));
      } else {
        console.log(twitter.status + ' - ' + twitter.icon + '  Twitter');
      }
    }
  }]);

  return Screen;
}();

exports.default = Screen;