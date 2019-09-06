const npmPackageVersion = '1.0.1';

export const oldCodeTemplate = `<!-- Mati button-->
<div
  class="mati-button responsive"
  data-product="kyc"
  data-country="us"
  data-style="%color%">
</div>

<!-- Mati script-->
<script 
   id="matiscript" 
   src="%buttonLink%">
</script>

<!-- Mati button initialization -->
<script>
Mati.init({
  clientId: '%clientId%',
  metadata: {},
});
</script>
`;

export const newCodeTemplate = `<!-- Installation -->

npm install mati-button@^${npmPackageVersion}

<!-- Integration -->
<mati-button
  clientId={%clientId%}
  apiHost={%hostname%}
  signupHost={%signupHostname%},
  color={%color%}
/>
`;
