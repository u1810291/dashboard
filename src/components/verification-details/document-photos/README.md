```js
const { photos } = require('../__mocks__');
<DocumentPhotos photos={photos} />
```

With signURL function (see href for each image/link):

```js
const { photos } = require('../__mocks__');
function signURL(url) {
  return `${url}?access_token=ACCESS-TOKEN`
}
<DocumentPhotos photos={photos} signURL={signURL} />
```
