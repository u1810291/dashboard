Table inside panel

```js
const rows = [
  { title: "Alice Doesn't Live Here Anymore", year: '1974' },
  { title: 'Taxi Driver', year: '1976' },
  { title: 'New York, New York', year: '1977' },
  { title: 'The Last Waltz', year: '1978' },
  { title: 'Raging Bull', year: '1980' },
  { title: 'The King of Comedy', year: '1982' },
  { title: 'After Hours', year: '1985' }
]
const columns = [
  {
    label: 'Title',
    size: 10,
    content: item => item.title
  },
  {
    label: 'Year',
    content: item => <strong>{item.year}</strong>
  },
  {
    content: () => '✂️',
    align: 'right'
  }
]
const Panel = require('../panel').default
;<React.Fragment>
  <h3>Martin Scorsese filmography</h3>
  <DataTable
    rows={rows}
    columns={columns}
    onRowClick={item => alert(item.title)}
  />
</React.Fragment>
```

Inline table

```js
const rows = [
  { title: "Alice Doesn't Live Here Anymore", year: '1974' },
  { title: 'Taxi Driver', year: '1976' },
  { title: 'New York, New York', year: '1977' },
  { title: 'The Last Waltz', year: '1978' },
  { title: 'Raging Bull', year: '1980' },
  { title: 'The King of Comedy', year: '1982' },
  { title: 'After Hours', year: '1985' }
]
const columns = [
  {
    label: 'Title',
    size: 10,
    content: item => item.title
  },
  {
    label: 'Year',
    content: item => <strong>{item.year}</strong>
  },
  {
    content: () => '✂️',
    align: 'center'
  }
]
const Panel = require('../panel').default
;<React.Fragment>
  <h3>Martin Scorsese filmography</h3>
  <DataTable
    rows={rows}
    columns={columns}
    inline
    onRowClick={item => alert(item.title)}
  />
</React.Fragment>
```
