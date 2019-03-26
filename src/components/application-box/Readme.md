```js
const { Content } = require('.')
const menu = (
  <div style={{ textAlign: 'center', height: '40px', lineHeight: '40px', background: 'pink' }}>
    SIMPLE LAYOUT WITH CENTRAL CONTENT COLUMN
  </div>
)
;<ApplicationBox menu={menu}>
  <Content>
    <p>Do you consider yourself “a doer”?</p>

    <p>
      That person who enjoys doing the work, fine-tuning the details, meddling in the weeds of how
      it’ll all work? Then you probably have trouble delegating as a leader.
    </p>

    <p>I know I do.</p>

    <p>
      For so many managers and leaders — especially those of us who are used to be the person
      doingthe work and are now handing off the work to others — learning to delegate is, well,
      tricky, if not painful.
    </p>
  </Content>
</ApplicationBox>
```

```js
const { Content } = require('.')
const menu = (
  <div style={{ textAlign: 'center', height: '40px', lineHeight: '40px', background: 'pink' }}>
    LAYOUT WITH CENTRAL CONTENT COLUMN AND LEFT SIDEBAR
  </div>
)
;<ApplicationBox menu={menu}>
  <Content fullwidth={false}>HERE COMES SIDEBAR</Content>
  <Content>
    <p>Do you consider yourself “a doer”?</p>

    <p>
      That person who enjoys doing the work, fine-tuning the details, meddling in the weeds of how
      it’ll all work? Then you probably have trouble delegating as a leader.
    </p>

    <p>I know I do.</p>

    <p>
      For so many managers and leaders — especially those of us who are used to be the person
      doingthe work and are now handing off the work to others — learning to delegate is, well,
      tricky, if not painful.
    </p>
  </Content>
</ApplicationBox>
```
