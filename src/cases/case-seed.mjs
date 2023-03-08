
import {v4 as uuid} from 'uuid';
import prettierBytes from 'prettier-bytes';
import {WEBTORRENT_CLIENT_CONFIG} from '../constants.mjs';
import {createWebTorrentClient} from '../torrent/webtorrent.mjs';

main().catch(console.log);

export default async function main() {
  const seedClient = createWebTorrentClient();

  const pid = uuid();
  console.log(`Seeding.${pid}.Start`);

  seedClient.seed(
    'src/data/test.pdf',
    WEBTORRENT_CLIENT_CONFIG,
    torrent => {
      console.log(torrent.magnetURI);

      // torrent.on('upload', (bytes) => {
      //   console.log(JSON.stringify({
      //     downloaded: prettierBytes(bytes),
      //     progress: torrent.progress,
      //     downloadSpeed: prettierBytes(torrent.downloadSpeed)
      //   }, null, 2));
      // });

      // torrent.on('download', (bytes) => {
      //   console.log(JSON.stringify({
      //     downloaded: prettierBytes(bytes),
      //     progress: torrent.progress,
      //     downloadSpeed: prettierBytes(torrent.downloadSpeed)
      //   }, null, 2));
      // });
    }
  );
}