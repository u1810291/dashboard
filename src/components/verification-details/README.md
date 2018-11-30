```js
const { documents, photos } = require('./__mocks__')
;<VerificationDetails photos={photos} documents={documents}/>
```

With signURL function (see DocumentPhotos for more details)

```js
const { documents, photos } = require('./__mocks__');
<VerificationDetails photos={photos} documents={documents} signURL={url => url + '?signed'}/>
```
