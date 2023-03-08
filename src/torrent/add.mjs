import {io} from 'socket.io-client';
import prettierBytes from 'prettier-bytes';
import {createLogger} from '../utils/logger.mjs';
import {WEBTORRENT_CLIENT_CONFIG} from '../constants.mjs';
import {createWebTorrentClient} from './webtorrent.mjs';

const {APP_TORRENT_INFO_URL = 'ws://localhost:3000'} = process.env;

main();

function main() {
  const logger = createLogger();
  const addClient = createWebTorrentClient();
  const socket = io(APP_TORRENT_INFO_URL);
  // время старта скачивания торрента
  const startTime = Date.now();
  // общее количество загруженных байт
  let totalBytes = 0;
  // лог с количеством загруженных байт,
  // прогрессом от 0 до 1 и скоростью скачивания
  const download = [];

  const handleDownloadEvent = (torrent, bytes) => {
    download.push({
      downloaded: bytes,
      progress: torrent.progress,
      downloadSpeed: prettierBytes(torrent.downloadSpeed),
    });
    totalBytes = totalBytes + bytes;
  };

  const handleDoneEvent = (infoHash) => {
    const nowTime = Date.now();
    const doneTime = nowTime - startTime;

    logger.info({
      message: 'Torrent.Done',
      payload: {
        infoHash,
        download,
        startDoneDeltaInMs: doneTime,
        totalDownloaded: prettierBytes(totalBytes),
      },
    });
  };

  const handleError = (error) => {
    logger.info({error});
  };

  addClient.on('error', (error) => {
    handleError(error);
  });

  socket.on('torrent.seed', ({infoHash, magnetURI}) => {
    logger.info({
      message: 'Torrent.Start',
      payload: {infoHash, magnetURI}
    });
    // запускаем скачивание торрента
    addClient.add(magnetURI, WEBTORRENT_CLIENT_CONFIG, (torrent) => {
      logger.info({
        message: 'Torrent.Added',
        payload: {infoHash, magnetURI}
      });
      torrent.on('download', (bytes) => {
        handleDownloadEvent(torrent, bytes);
      });
      torrent.on('done', () => {
        handleDoneEvent(magnetURI);
      });
    });
  });
}
