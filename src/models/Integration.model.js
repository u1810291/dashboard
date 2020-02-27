
export function integrationCode(clientId = '') {
  return `<script src="https://web-button.getmati.com/button.js">
</script>
<mati-button
  clientid="${clientId}"
  metadata=""
/>`;
}
