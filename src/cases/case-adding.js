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

main();

export default function main() {  
  const addClient = createWebTorrentClient();

  const startTime = Date.now();

  addClient.add(
    WEBTORRENT_MAGNET_URI,
    WEBTORRENT_CLIENT_CONFIG,
    (torrent) => {
      // torrent.on('ready', () => {
      //   const nowTime = Date.now();
      //   logs.torrent.ready = nowTime - startTime;
      // });
      // torrent.on('metadata', () => {
      //   const nowTime = Date.now();
      //   logs.torrent.metadata = nowTime - startTime;
      // });
      // torrent.on('infoHash', () => {
      //   const nowTime = Date.now();
      //   logs.torrent.infoHash = nowTime - startTime;
      // });
      torrent.on('upload', (bytes) => {
        logs.torrent.upload.push({
          downloaded: prettierBytes(bytes),
          progress: torrent.progress,
          downloadSpeed: prettierBytes(torrent.downloadSpeed)
        });
      });
      torrent.on('download', (bytes) => {
        logs.torrent.download.push({
          downloaded: prettierBytes(bytes),
          progress: torrent.progress,
          downloadSpeed: prettierBytes(torrent.downloadSpeed)
        });
      });
      torrent.on('done', () => {
        const nowTime = Date.now();
        logs.torrent.done = nowTime - startTime;
        console.log(JSON.stringify(logs, null, 2));
      });
    },
  );
}