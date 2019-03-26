```js
const { MenuItemLink, MenuItemSpacer, MenuItemButton, MenuItemCollection } = require('.')
const Icons = require('../icons').default

;<ApplicationMenu>
  <MenuItemLink to="/inside-link" noActive>
    <Icons.FaceMatch />
  </MenuItemLink>
  <MenuItemLink to="/inside-link" label="Application link" icon={<Icons.TrashBin />} />
  <MenuItemLink external to="http://altavista.com" label="External" />
  <MenuItemSpacer />
  <MenuItemButton icon={<Icons.Spy />} label="Button" onClick={() => alert('Click')} />
  <MenuItemCollection label="Dropdown" icon={<Icons.Pencil />}>
    <MenuItemLink to="/pricing" label="Pricing" icon={<Icons.TrashBin />} />
    <MenuItemLink to="/settings" label="Settings" icon={<Icons.Pencil />} />
  </MenuItemCollection>
</ApplicationMenu>
```
