import * as clipboard from 'clipboard-polyfill';

export function copyToClipboard(text) {
  clipboard.writeText(text);
}
