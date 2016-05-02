'use strict';

import colors from 'colors';

export default class Screen {

  show(data) {
    let instagram = {
      icon: '📷',
      status: colors.red('✗'),
      data: {},
    };
    let twitter = {
      icon: '🐦',
      status: colors.red('✗'),
      data: {},
    };
    if (data.instagram.length > 0) {
      instagram.status = colors.green('✓');
      instagram.data = data.instagram[0];
      console.log(`${instagram.status} - ${instagram.icon}` +
      `  ${instagram.data.fullName} - https://www.instagram.com/${instagram.data.username}`);
    } else {
      console.log(`${instagram.status} - ${instagram.icon}  Instagram`);
    }
    if (data.twitter.length > 0) {
      twitter.status = colors.green('✓');
      twitter.data = data.twitter[0];
      console.log(`${twitter.status} - ${twitter.icon}` +
      `  ${twitter.data.fullName} - https://twitter.com/${twitter.data.username}`);
    } else {
      console.log(`${twitter.status} - ${twitter.icon}  Twitter`);
    }

  }
}
