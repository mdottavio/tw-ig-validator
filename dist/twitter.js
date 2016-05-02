'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Twitter = function () {
  function Twitter() {
    var q = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var l = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

    _classCallCheck(this, Twitter);

    this.query = q;
    this.limit = l;
  }

  /**
   * Procces a twitter response object to extract valuable information
   *
   * @param  {Object} data
   * @param  {String}
   * @return {Object} Promise
   */


  _createClass(Twitter, [{
    key: 'proccessTW',
    value: function proccessTW(data, query) {
      return new Promise(function (resolve) {
        var users = [];
        if (data.num_results > 0) {
          Array.from(data.users).forEach(function (user) {
            if (user.screen_name === query) {
              users.push({
                username: user.screen_name,
                avatar: user.profile_image_url,
                fullName: user.name
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
      return 'https://twitter.com/i/search/typeahead.json?q=' + this.query + '&count=' + this.limit;
    }
  }, {
    key: 'search',
    value: function search() {
      var _this = this;

      return _request2.default.request(this._searchUri(), 'get').then(function (data) {
        return _this.proccessTW(data, _this.query);
      });
    }
  }]);

  return Twitter;
}();

exports.default = Twitter;