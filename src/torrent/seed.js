import {WEBTORRENT_CLIENT_CONFIG} from '../constants.js';

export function torrentSeed(client, filePath) {
  return new Promise((resolve) => {
    client.seed(
      filePath, 
      WEBTORRENT_CLIENT_CONFIG,
      torrent => {
        torrent.on('upload', (...args) => {
          console.log(args);
        })

        torrent.on('wire', (wire, addr) => {
          console.log('connected to peer with address ' + addr)
        });

        resolve(torrent.magnetURI);
      }
    );
  });
};

