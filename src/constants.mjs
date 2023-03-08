const announce = process.env.APP_ANNOUNCE || 'udp://localhost:8000';
export const WEBTORRENT_CLIENT_CONFIG = {announceList: [[announce]]};
