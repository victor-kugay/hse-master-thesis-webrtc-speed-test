import {createLogger} from '../utils/logger.mjs';
import {Server as TorrentServer} from 'bittorrent-tracker';
import {Server as SocketServer} from 'socket.io';

const {APP_TORRENT_SERVER_PORT = 8000, APP_TORRENT_INFO_PORT = 3000} = process.env;

main();

function main() {
  const socketServer = new SocketServer(APP_TORRENT_INFO_PORT);
  const torrentServer = new TorrentServer();
  const logger = createLogger();

  const seeds = [];

  const torrentServerHostname = {
    http: undefined,
    udp4: undefined,
    udp6: undefined,
  };

  const handleListening = (torrentServer) => {
    if (torrentServer.http) {
      const httpAddr = torrentServer.http.address();
      const httpHost = httpAddr.address !== '::' ? httpAddr.address : 'localhost';
      const httpPort = httpAddr.port;
      console.log(`HTTP tracker: http://${httpHost}:${httpPort}/announce`);
    }
    if (torrentServer.udp) {
      const udpAddr = torrentServer.udp.address();
      const udpHost = udpAddr.address;
      const udpPort = udpAddr.port;
      console.log(`UDP tracker: udp://${udpHost}:${udpPort}`);
    }
    if (torrentServer.udp6) {
      const udp6Addr = torrentServer.udp6.address();
      const udp6Host = udp6Addr.address !== '::' ? udp6Addr.address : 'localhost';
      const udp6Port = udp6Addr.port;
      console.log(`UDP6 tracker: udp://${udp6Host}:${udp6Port}`);
    }
    if (torrentServer.ws) {
      const wsAddr = torrentServer.http.address();
      const wsHost = wsAddr.address !== '::' ? wsAddr.address : 'localhost';
      const wsPort = wsAddr.port;
      console.log(`WebSocket tracker: ws://${wsHost}:${wsPort}`);
    }
    if (torrentServer.http) {
      const statsAddr = torrentServer.http.address();
      const statsHost = statsAddr.address !== '::' ? statsAddr.address : 'localhost';
      const statsPort = statsAddr.port;
      console.log(`Tracker stats: http://${statsHost}:${statsPort}/stats`);
    }
  };

  socketServer.on('connection', (socket) => {
    for (const seed of seeds) {
      socket.emit('torrent.seed', seed);
    }

    socket.on('torrent.seed', (data) => {
      seeds.push(data);
      socketServer.emit('torrent.seed', data);
    });
  });
  // торрент сервер
  torrentServer.on('listening', () => {
    handleListening(torrentServer);
  });
  torrentServer.on('warning', (err) => {
    logger.info(`WARNING: ${err.message}`);
  });
  torrentServer.on('update', (addr) => {
    logger.info(`update: ${addr}`);
  });
  torrentServer.on('complete', (addr) => {
    logger.info(`complete: ${addr}`);
  });
  torrentServer.on('start', (addr) => {
    logger.info(`start: ${addr}`);
  });
  torrentServer.on('stop', (addr) => {
    logger.info(`stop: ${addr}`);
  });
  torrentServer.listen(APP_TORRENT_SERVER_PORT, torrentServerHostname);
}
