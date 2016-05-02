'use strict';

import request from 'request';

export default class BaseRequest {

  /**
   * Perform a request, return a promise
   *
   * @param  {String} endopoint
   * @param  {String} method
   * @param  {Object} data
   * @return {Object} Promise
   */
  static request(uri, method, data) {
    return new Promise((resolve, reject) => {
      data = data || {};
      var options = {
        uri: uri,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: method,
        form: data
      };

      request(options, function(err, res, body) {
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
}
