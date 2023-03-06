import {WEBTORRENT_CLIENT_CONFIG} from '../constants.js';

export function torrentAdd(client, torrentId) {
  return new Promise((resolve, reject) => {
    client.add(
      torrentId,
      WEBTORRENT_CLIENT_CONFIG,
      (torrent) => {
        const file = torrent.files[0];
        file.on('done', () => {
          resolve();
        });
        file.on('error', () => {
          reject();
        });
      },
    );
  });
}