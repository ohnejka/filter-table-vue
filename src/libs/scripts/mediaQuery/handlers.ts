import { MqValue, MqKey, type MqObject, type MqStore } from "./store";

export default (store: MqStore, list: ReadonlyArray<MqObject>) => {
  const m = 768;
  const t = 1024;
  const d = Infinity;
  const innerWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  let currentMediaName = MqValue.Mobile;
  let currentMediaKey = MqKey.Sm;

  list.forEach((media: MqObject) => {
    if (innerWidth > media.value) {
      currentMediaKey = media.key;
    }
  });

  const viewPortHeight = `${window.innerHeight}px`;
  document.documentElement.style.setProperty("--vp-height", viewPortHeight);

  if (innerWidth < m) {
    currentMediaName = MqValue.Mobile;
  } else if (innerWidth >= m && innerWidth < t) {
    currentMediaName = MqValue.Tablet;
  } else if (innerWidth >= t && innerWidth < d) {
    currentMediaName = MqValue.Desktop;
  }

  store.updateMq({
    currentMediaKey,
    currentMediaName,
  });
};
