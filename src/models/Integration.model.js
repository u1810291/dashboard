export const matiButtonUrl = process.env.REACT_APP_MATI_BUTTON_URL || 'https://web-button.getmati.com/button.js';

export function integrationCode({ clientId, flowId = '' }) {
  return `<script src="${matiButtonUrl}">
</script>
<mati-button
  clientid="${clientId}"
  flowId="${flowId}"
  metadata=""
/>`;
}
