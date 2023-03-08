import {io} from 'socket.io-client';
import {createLogger} from '../utils/logger.mjs';
import {WEBTORRENT_CLIENT_CONFIG} from '../constants.mjs';
import {createWebTorrentClient} from './webtorrent.mjs';

const {APP_TORRENT_INFO_URL = 'ws://localhost:3000', APP_SEED_PATH = 'assets/test.pdf'} = process.env;

main();

function main() {
  const logger = createLogger();
  const seedClient = createWebTorrentClient();
  const socket = io(APP_TORRENT_INFO_URL);

  const handleSeed = (torrent) => {
    logger.info({
      message: 'Torrent.Seed',
      payload: {
        infoHash: torrent.infoHash,
        magnetURI: torrent.magnetURI,
      }
    });
    socket.emit('torrent.seed', {
      infoHash: torrent.infoHash,
      magnetURI: torrent.magnetURI,
    });
  };

  const handleError = (error) => {
    logger.error(error);
  };

  seedClient.on('error', (error) => {
    handleError(error);
  });

  seedClient.seed(APP_SEED_PATH, WEBTORRENT_CLIENT_CONFIG, (torrent) => {
    handleSeed(torrent);
  });
}
