'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request2 = require('request');

var _request3 = _interopRequireDefault(_request2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A set of utlity methods.
 * @abstract
 */

var BaseRequest = function () {
  function BaseRequest() {
    _classCallCheck(this, BaseRequest);
  }

  _createClass(BaseRequest, null, [{
    key: 'request',


    /**
     * Perform a request, return a promise
     *
     * @param  {String} endopoint
     * @param  {String} method
     * @param  {Object} data
     * @return {Object} Promise
     */
    value: function request(uri, method, data) {
      return new Promise(function (resolve, reject) {
        data = data || {};
        var options = {
          uri: uri,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          method: method,
          form: data
        };

        (0, _request3.default)(options, function (err, res, body) {
          body = JSON.parse(body);
          if (err) {
            reject(err);
          } else if (res.statusCode < 400) {
            resolve(body);
          } else {
            reject({
              error: body.error,
              warnings: body.warnings || {}
            });
          }
        });
      });
    }
  }]);

  return BaseRequest;
}();

exports.default = BaseRequest;