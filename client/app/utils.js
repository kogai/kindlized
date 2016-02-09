import addPx from 'add-px-to-style';
import hyphenate from 'hyphenate-style-name';

export function objectToCss(obj) {
  const keys = Object.keys(obj);
  if (keys.length <= 0) return '';

  return keys.reduce((styles, key)=> `${styles} ${hyphenate(key)}: ${addPx(key, obj[key])};`, '');
}
