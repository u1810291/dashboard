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
