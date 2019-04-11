```js
const Button = require('../button').default
const Items = require('../items').default
;<Modal>
  <header>Modal title</header>
  <main>Modal content</main>
  <footer>
    <Items align="center" templateColumns="minmax(auto, 100%) auto">
      <span className="text-center">Modal footer</span>
      <Button buttonStyle="primary">Modal footer</Button>
    </Items>
  </footer>
</Modal>
```
