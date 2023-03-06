import wrtc from 'wrtc';
// Для корректной работы webotorrent в NodeJS требуется
// явно определить инстанс WebRTC из стороннего пакета,
// потому что в NodeJS отсутствует WebRTC API
globalThis.WRTC = wrtc;
// Обнуляем список торрентов, потому что в коде явно задаем
// ссылку на локально развернутый инстанс bittorrent-tracker
globalThis.WEBTORRENT_ANNOUNCE = null;

import WebTorrent from 'webtorrent';

export function createWebTorrentClient() {
  return new WebTorrent({dht: false});
}
