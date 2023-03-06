import prettierBytes from 'prettier-bytes';
import {WEBTORRENT_CLIENT_CONFIG} from '../constants.js';
import {createWebTorrentClient} from '../torrent/webtorrent.js';

export const WEBTORRENT_MAGNET_URI = 'magnet:?xt=urn:btih:da679eb9cd964769d1af97ecd8553fcc147434f3&dn=cat.jpeg&tr=ws%3A%2F%2Flocalhost%3A8000';

const addClient = createWebTorrentClient();

const logs = {
  torrent: {
    progress: [],
    done: 0,
    metadata: 0,
    infoHash: 0,
    ready: 0
  },
  file: {
    progress: [],
    done: 0,
  }
};

main();

export default function main() {  
  const startTime = Date.now();

  addClient.add(
    WEBTORRENT_MAGNET_URI,
    WEBTORRENT_CLIENT_CONFIG,
    (torrent) => {
      const file = torrent.files[0];
      
      file.on('done', () => {
        const nowTime = Date.now();
        logs.file.done = nowTime - startTime;
        console.log('file-done');
        // console.log('file-done', JSON.stringify(logs, null, 2));
        // process.exit(0);
      });

      // torrent.on('ready', () => {
      //   const nowTime = Date.now();
      //   logs.torrent.ready = nowTime - startTime;
      //   console.log('ready', JSON.stringify(logs, null, 2));
      // });
      // torrent.on('done', () => {
      //   const nowTime = Date.now();
      //   logs.torrent.done = nowTime - startTime;
      //   console.log('done', JSON.stringify(logs, null, 2));
      // });
      // torrent.on('metadata', () => {
      //   const nowTime = Date.now();
      //   logs.torrent.metadata = nowTime - startTime;
      //   console.log('metadata', JSON.stringify(logs, null, 2));
      // });
      // torrent.on('infoHash', () => {
      //   const nowTime = Date.now();
      //   logs.torrent.infoHash = nowTime - startTime;
      //   console.log('infoHash', JSON.stringify(logs, null, 2));
      // });
      torrent.on('download', (bytes) => {
        logs.torrent.progress.push({
          downloaded: prettierBytes(bytes),
          progress: torrent.progress,
          downloadSpeed: prettierBytes(torrent.downloadSpeed)
        });
        console.log('download', JSON.stringify(logs, null, 2));
      });

      torrent.on('upload', () => {
        console.log('???');
      })
    },
  );
}