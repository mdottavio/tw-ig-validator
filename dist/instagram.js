'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Instagram = function () {
  function Instagram() {
    var q = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var l = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

    _classCallCheck(this, Instagram);

    this.query = q;
    this.limit = l;
  }

  /**
   * Procces a instagram response object to extract valuable information
   *
   * @param  {Object} data
   * @return {Object} Promise
   */


  _createClass(Instagram, [{
    key: 'proccessIG',
    value: function proccessIG(data, query) {
      return new Promise(function (resolve) {
        var users = [];
        if (data.status === 'ok') {
          Array.from(data.users).forEach(function (u) {
            if (u.user.username === query) {
              users.push({
                username: u.user.username,
                avatar: u.user.profile_pic_url,
                fullName: u.user.full_name
              });
            }
          });
        }
        resolve(users);
      });
    }
  }, {
    key: '_searchUri',
    value: function _searchUri() {
      return 'https://www.instagram.com/web/search/topsearch/?query=' + this.query + '&count=' + this.limit;
    }
  }, {
    key: 'search',
    value: function search() {
      var _this = this;

      return _request2.default.request(this._searchUri(), 'get').then(function (data) {
        return _this.proccessIG(data, _this.query);
      });
    }
  }]);

  return Instagram;
}();

exports.default = Instagram;