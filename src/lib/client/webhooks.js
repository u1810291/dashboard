import { http } from './http';

export function subscribeToWebhook(clientId, webhook) {
  return http.post('/v1/webhooks', webhook, {
    params: { clientId },
  });
}

export function getWebhooks(clientId) {
  return http.get('/v1/webhooks', {
    params: { clientId },
  });
}

export function deleteWebhook(clientId, id) {
  return http.delete(`/v1/webhooks/${id}`, {
    params: { clientId },
  });
}

export function sendWebhook(id) {
  return http.post(`/v1/identities/${id}/send-webhook`);
}
