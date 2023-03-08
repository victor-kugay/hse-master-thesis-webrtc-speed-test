import prettierBytes from 'prettier-bytes';
import {WEBTORRENT_CLIENT_CONFIG} from '../constants.mjs';
import {createWebTorrentClient} from '../torrent/webtorrent.mjs';

export const WEBTORRENT_MAGNET_URI = 'magnet:?xt=urn:btih:65ab48776f4f1c3c79a92c1100d51c3135288d86&dn=test.pdf&tr=ws%3A%2F%2Ftorrent%3A8000';

const logs = {
  torrent: {
    download: [],
    done: 0,
    totalBytes: 0
  }
};

main().catch(console.log);

export default async function main() {  
  console.log('Add.Start');
  const addClient = createWebTorrentClient();

  const startTime = Date.now();

  addClient.on('error', (...args) => console.log(args));

  addClient.add(
    WEBTORRENT_MAGNET_URI,
    WEBTORRENT_CLIENT_CONFIG,
    (torrent) => {
      console.log('Add.Torrent');
      // torrent.on('upload', (bytes) => {
      //   logs.torrent.upload.push({
      //     downloaded: prettierBytes(bytes),
      //     progress: torrent.progress,
      //     downloadSpeed: prettierBytes(torrent.downloadSpeed)
      //   });
      // });
      torrent.on('download', (bytes) => {
        logs.torrent.download.push({
          downloaded: bytes,
          progress: torrent.progress,
          downloadSpeed: prettierBytes(torrent.downloadSpeed)
        });
        logs.torrent.totalBytes = logs.torrent.totalBytes + bytes;
      });
      torrent.on('done', () => {
        const nowTime = Date.now();
        logs.torrent.done = nowTime - startTime;
        console.log(JSON.stringify(logs, null, 2));
        console.log(prettierBytes(logs.torrent.totalBytes));
      });
    },
  );
}