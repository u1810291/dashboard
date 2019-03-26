### How to use

Just import the theme CSS file to your application:  
`import '<components-prefix>/theme/styles.scss'`

### Variables

```js
const style = window.getComputedStyle(document.body)
;<ul>
  {Object.values(style)
    .filter(key => key.startsWith('--mgi-theme'))
    .sort()
    .map(key => (
      <li>
        {key}:<strong>{style.getPropertyValue(key)}</strong>
      </li>
    ))}
</ul>
```

### Elements

```js
<h1>
  Header level 1
  <p>Subheader</p>
</h1>
<h1 className="text-light">
  Header level 1
  <p>Subheader</p>
</h1>

<p>We try hard to write <strong>good policies</strong> at <a href="/">Basecamp</a>. Make them plain and easy to understand. Without out all the dreaded legalese. By humans, for humans. I particularly like our refund policy and our Until The End of The Internet policy. But I’m sure we don’t always succeed.</p>

<h3>Header level 3</h3>

<p>And sometimes our policies may decay over time. Terms that are or become unreasonable linger on. Ugh.
</p>
```

### Helpers

```js
<p className="text-light">.text-light</p>
<p className="text-secondary">.text-secondary</p>
<p className="text-active">.text-active</p>
<p className="text-success">.text-success</p>
<p className="text-warning">.text-warning</p>
<p className="text-error">.text-error</p>
```

### Fieldset

Use `.mgi-fieldset` for representing a field with legend and some input-like content

Basic example

```js
const Button = require('../button').default

;<React.Fragment>
  <fieldset className="mgi-fieldset">
    <legend>Legend content</legend>
    <div>Input content</div>
    <div>on several lines</div>
  </fieldset>

  <fieldset className="mgi-fieldset">
    <legend>
      <h3>Legend content</h3>
    </legend>
    <Button buttonStyle="primary">Button</Button>
  </fieldset>

  <fieldset className="mgi-fieldset">
    <legend className="text-active">Legend content</legend>
    <strong>Fieldset content</strong>
  </fieldset>

  <fieldset className="mgi-fieldset">
    <legend>With nested fieldsets</legend>
    <fieldset className="mgi-fieldset">
      <legend className="text-active">Item 1</legend>
      <div>Item 1.1</div>
      <div>Item 1.2</div>
    </fieldset>
    <fieldset className="mgi-fieldset">
      <legend className="text-active">Item 2</legend>
      <div>Item 2.1</div>
      <div>Item 2.2</div>
    </fieldset>
    <Button buttonStyle="primary">Item 3</Button>
  </fieldset>
</React.Fragment>
```

### Section

```js
<React.Fragment>
  <section className="mgi-section">
    <h3>
      After Hours
      <p>
        American black comedy film[3] directed by Martin Scorsese, written by Joseph Minion, and
        starring Griffin Dunne with an ensemble cast. The film follows Paul Hackett, portrayed by
        Dunne, as he experiences a series of misadventures while making his way home from New York
        City SoHo district during the night.
      </p>
      <p>
        Warner Home Video released the film on VHS in 1991 for both widescreen and pan-and-scan NTSC
        laserdiscs. It has also been released on DVD.
      </p>
    </h3>
  </section>
  <section className="mgi-section">
    <p>
      After a long and boring day at work, Paul Hackett, a computer word processor, meets Marcy
      Franklin in a local cafe in New York City. They discuss their common interest in Henry Miller.
      Marcy leaves Paul her number and informs him that she lives with a sculptor named Kiki
      Bridges, who makes and sells plaster of Paris paperweights resembling cream cheese bagels.
      Later in the night, under the pretense of buying a paperweight, Paul visits Marcy, taking a
      cab to her apartment. On his way to visit Marcy, his $20 bill is blown out the window of the
      cab, leaving him with only some spare pocket change. The cab driver is furious that he could
      not pay. This is the first in a long series of misadventures for Paul that turn hostile
      through no fault of his own. At the apartment, Paul meets the sculptor Kiki and Marcy, and
      comes across a collection of photographs and medications which imply that Marcy is severely
      disfigured from burns on her legs and torso. As a result of this implication, and as a result
      of a strained conversation with Marcy, Paul abruptly slips out of the apartment.
    </p>
  </section>
</React.Fragment>
```

### Tables

```js
<table className="mgi-table">
  <colgroup>
    <col width="20%" />
    <col />
    <col width="20%" />
  </colgroup>
  <tbody>
    <tr>
      <th>Column A</th>
      <th>Column B</th>
      <th>Column C</th>
    </tr>
    <tr>
      <td>Column A</td>
      <td>
        American black comedy film[3] directed by Martin Scorsese, written by Joseph Minion, and
        starring Griffin Dunne with an ensemble cast. The film follows Paul Hackett, portrayed by
        Dunne, as he experiences a series of misadventures while making his way home from New York
        City SoHo district during the night.
      </td>
      <td>Column C</td>
    </tr>
    <tr>
      <td>Column A</td>
      <td>Column B</td>
      <td>Column C</td>
    </tr>
  </tbody>
  <caption>Simple table, header on top</caption>
</table>
```

```js
<table className="mgi-table">
  <colgroup>
    <col width="15%" />
    <col width="70%" />
  </colgroup>
  <tbody>
    <tr>
      <th>Column A</th>
      <td>Column A</td>
      <td>Column A</td>
    </tr>
    <tr>
      <th>Column B</th>
      <td>
        American black comedy film[3] directed by Martin Scorsese, written by Joseph Minion, and
        starring Griffin Dunne with an ensemble cast. The film follows Paul Hackett, portrayed by
        Dunne, as he experiences a series of misadventures while making his way home from New York
        City SoHo district during the night.
      </td>
      <td>Column B</td>
    </tr>
    <tr>
      <th>Column C</th>
      <td>Column C</td>
      <td>Column C</td>
    </tr>
  </tbody>
  <caption>Simple table, header on left</caption>
</table>
```

### Lists

Check list inverted

```js
<ul className="mgi-list mgi-list--check">
  <li>We try hard</li>
  <li>to write good policies</li>
  <li>at Basecamp.</li>
  <li>Make them plain and easy to understand.</li>
</ul>
```

```js
<ul className="mgi-list mgi-list--check-inverted" style={{ background: 'pink' }}>
  <li>We try hard</li>
  <li>to write good policies</li>
  <li>at Basecamp.</li>
  <li>Make them plain and easy to understand.</li>
</ul>
```
