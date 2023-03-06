import {WEBTORRENT_CLIENT_CONFIG} from '../constants.mjs';
import fs from 'fs';

export function torrentAdd(client, torrentId) {
  return new Promise((resolve, reject) => {
    client.add(
      torrentId,
      WEBTORRENT_CLIENT_CONFIG,
      (torrent) => {
        torrent.on('done', () => {
          resolve();
        });
        // const file = torrent.files[0];
        // const source = file.createReadStream();
        // const destination = fs.createWriteStream(file.name);
        // source.on('end', resolve).on('error', reject).pipe(destination);
      },
    );
  });
}
