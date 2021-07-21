/* eslint-disable camelcase */
/// <reference types="@types/intercom-web" />

declare namespace Intercom_ {
    interface IntercomSettings {
        last_request_at?: number;
    }

    interface IntercomCommandSignature {
        'reattach_activator': () => void;
    }
}
