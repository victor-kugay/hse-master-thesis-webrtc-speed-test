import {v4 as uuid} from 'uuid';
import prettierBytes from 'prettier-bytes';
import {WEBTORRENT_CLIENT_CONFIG} from '../constants.js';
import {createWebTorrentClient} from '../torrent/webtorrent.js';

export const WEBTORRENT_MAGNET_URI = 'magnet:?xt=urn:btih:65ab48776f4f1c3c79a92c1100d51c3135288d86&dn=test.pdf&tr=ws%3A%2F%2Flocalhost%3A8000';

const logs = {
  torrent: {
    download: [],
    upload: [],
    done: 0,
    infoHash: 0,
    metadata: 0,
    ready: 0
  }
};

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

      torrent.on('upload', (bytes) => {
        console.log(JSON.stringify({
          downloaded: prettierBytes(bytes),
          progress: torrent.progress,
          downloadSpeed: prettierBytes(torrent.downloadSpeed)
        }), null, 2);
      });

      torrent.on('download', (bytes) => {
        console.log(JSON.stringify({
          downloaded: prettierBytes(bytes),
          progress: torrent.progress,
          downloadSpeed: prettierBytes(torrent.downloadSpeed)
        }), null, 2);
      });
    }
  );
}