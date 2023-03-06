import {WEBTORRENT_CLIENT_CONFIG} from '../constants.mjs';

export function torrentSeed(client, filePath) {
  return new Promise((resolve) => {
    client.seed(filePath, WEBTORRENT_CLIENT_CONFIG, torrent => {
      // console.log('Client is seeding ' + torrent.magnetURI);
      resolve();
    }); 
  });
};

