#!/usr/bin/env node --harmony
'use strict';

import Instagram from './instagram';
import Twitter from './twitter';
import Screen from './screen';
import prompt from 'prompt';

const ora = require('ora');

let searchUser = () => {
  let users = {
    instagram: [],
    twitter: [],
  };
  const spinner = ora('Searching Instagram');
  spinner.color = 'yellow';
  prompt.message = '';
  prompt.delimiter = '';

  prompt.get([{
    description: 'Username - Empty to exit:',
    name: 'query'
  }], function(err, result) {

    if (result.query) {

      spinner.start();

      let instagram = new Instagram(result.query);
      let twitter = new Twitter(result.query);
      instagram.search()
      .then((result) => {
        users.instagram = result;
      })
      .then(() => {
        spinner.text = 'Searching Twitter';
        return twitter.search();
      })
      .then((result) => {
        users.twitter = result;
      })
      .then(() => {
        spinner.stop();
        let screen = new Screen();
        screen.show(users);
      });

    }
  });
};

searchUser();
