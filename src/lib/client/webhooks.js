import { http } from 'lib/client/http';

export function subscribeToWebhook(clientId, flowId, webhook) {
  return http.post('/v1/webhooks', webhook, {
    params: { clientId, flowId },
  });
}

export function getWebhooks(clientId, flowId) {
  return http.get('/v1/webhooks', {
    params: { clientId, flowId },
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
