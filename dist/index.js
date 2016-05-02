#!/usr/bin/env node --harmony

'use strict';

var _instagram = require('./instagram');

var _instagram2 = _interopRequireDefault(_instagram);

var _twitter = require('./twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ora = require('ora');

var searchUser = function searchUser() {
  var users = {
    instagram: [],
    twitter: []
  };
  var spinner = ora('Searching Instagram');
  spinner.color = 'yellow';
  _prompt2.default.message = '';
  _prompt2.default.delimiter = '';

  _prompt2.default.get([{
    description: 'Username - Empty to exit:',
    name: 'query'
  }], function (err, result) {

    if (result.query) {
      (function () {

        spinner.start();

        var instagram = new _instagram2.default(result.query);
        var twitter = new _twitter2.default(result.query);
        instagram.search().then(function (result) {
          users.instagram = result;
        }).then(function () {
          spinner.text = 'Searching Twitter';
          return twitter.search();
        }).then(function (result) {
          users.twitter = result;
        }).then(function () {
          spinner.stop();
          var screen = new _screen2.default();
          screen.show(users);
        });
      })();
    }
  });
};

searchUser();