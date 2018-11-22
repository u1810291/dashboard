Basic example

```js
const Panel = require('src/components/panel').default;
const { Tab, Tabs, TabList, TabPanel } = require('src/components/tabs');
const classNames = require('classnames');

<Panel>
  <Panel.Body padded={false}>
    <Tabs className={classNames('tabs', 'stretched')}>
      <TabList>
        <Tab>Global Watchlist</Tab>
        <Tab>Face Match</Tab>
        <Tab>Liveness</Tab>
        <Tab>OCR data</Tab>
      </TabList>
    </Tabs>
  </Panel.Body>
</Panel>
```