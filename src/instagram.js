'use strict';

import cli from './request';

export default class Instagram {

  constructor(q='', l=1) {
    this.query = q;
    this.limit = l;
  }

  /**
   * Procces a instagram response object to extract valuable information
   *
   * @param  {Object} data
   * @param  {String}
   * @return {Object} Promise
   */
  proccessIG(data, query) {
    return new Promise((resolve) => {
      let users = [];
      if (data.status === 'ok') {
        Array.from(data.users).forEach((u) => {
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

  _searchUri() {
    return `https://www.instagram.com/web/search/topsearch/?query=${this.query}&count=${this.limit}`;
  }

  search() {
    return cli.request(this._searchUri(), 'get')
      .then((data) => {
        return this.proccessIG(data, this.query);
      });
  }
}
