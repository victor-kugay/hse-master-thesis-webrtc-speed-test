import {v4 as uuid} from 'uuid';
import {torrentSeed} from '../torrent/seed.js';
import {createWebTorrentClient} from '../torrent/webtorrent.js';

export const WEBTORRENT_MAGNET_URI = 'magnet:?xt=urn:btih:da679eb9cd964769d1af97ecd8553fcc147434f3&dn=cat.jpeg&tr=ws%3A%2F%2Flocalhost%3A8000';

const seedClient = createWebTorrentClient();

main().catch(console.log);

export default async function main() {
  const pid = uuid();
  console.log(`Seeding.${pid}.Start`);
  await torrentSeed(seedClient, 'src/data/cat.jpeg').then(() => {
    console.log(`Seeding.${pid}.Success`);
  });
}