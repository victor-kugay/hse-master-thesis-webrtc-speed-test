import path from 'path';

export const WEBTORRENT_CLIENT_CONFIG = {announceList: [['ws://localhost:8000']]};

export const WEBTORRENT_SEED_PATH = path.resolve('src/data/cat.jpeg');

export const WEBTORRENT_MAGNET_URI =
  'magnet:?xt=urn:btih:da679eb9cd964769d1af97ecd8553fcc147434f3&dn=cat.jpeg&tr=ws%3A%2F%2Flocalhost%3A8000';
