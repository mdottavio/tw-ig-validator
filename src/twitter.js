'use strict';

import cli from './request';

export default class Twitter {

  constructor(q='', l=1) {
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
  proccessTW(data, query) {
    return new Promise((resolve) => {
      let users = [];
      if (data.num_results > 0) {
        Array.from(data.users).forEach((user) => {
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

  _searchUri() {
    return `https://twitter.com/i/search/typeahead.json?q=${this.query}&count=${this.limit}`;
  }

  search() {
    return cli.request(this._searchUri(), 'get')
      .then((data) => {
        return this.proccessTW(data, this.query);
      });
  }
}
