/* eslint-disable camelcase */
export const BeamerSelectorId = 'beamerWhatsUp';
export const BeamerScriptUrl = 'https://app.getbeamer.com/js/beamer-embed.js';

export interface BeamerWindow extends Window {
    beamer_config: any;
}
