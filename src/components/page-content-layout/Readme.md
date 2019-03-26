All elements

```js
const { NavLink } = require('react-router-dom')
const Panel = require('../panel').default
;<React.Fragment>
  <h1>Sample page layout</h1>
  <PageContentLayout>
    <nav>
      <NavLink to="/page1">Menu Item 1</NavLink>
      <NavLink to="/page2">Menu Item 2</NavLink>
      <NavLink to="/page3">Menu Item 3</NavLink>
      <span>Static Menu Item 1</span>
    </nav>

    <main>
      <Panel>
        <Panel.Body>
          <h2>1. Configure Mati verification flow</h2>
          <p>
            On first step you can configure your verification flow with colours, countries, language
            and documents.
          </p>
        </Panel.Body>
      </Panel>

      <Panel>
        <Panel.Body>
          <h2>1. Configure Mati verification flow</h2>
          <p>
            On first step you can configure your verification flow with colours, countries, language
            and documents.
          </p>
        </Panel.Body>
      </Panel>
    </main>

    <aside>
      <Panel>
        <Panel.Body>
          <section className="mgi-section">
            <h3>Support</h3>
          </section>
          <section className="mgi-section">
            <p>
              If you want to know more about integration code you can chat with our support about
              that.
            </p>
          </section>
        </Panel.Body>
      </Panel>
    </aside>
  </PageContentLayout>
</React.Fragment>
```

Without menu

```js
const { NavLink } = require('react-router-dom')
const Panel = require('../panel').default
;<PageContentLayout>
  <main>
    <Panel>
      <Panel.Body>
        <h2>1. Configure Mati verification flow</h2>
        <p>
          On first step you can configure your verification flow with colours, countries, language
          and documents.
        </p>
      </Panel.Body>
    </Panel>

    <Panel>
      <Panel.Body>
        <h2>1. Configure Mati verification flow</h2>
        <p>
          On first step you can configure your verification flow with colours, countries, language
          and documents.
        </p>
      </Panel.Body>
    </Panel>
  </main>

  <aside>
    <Panel>
      <Panel.Body>
        <section className="mgi-section">
          <h3>Support</h3>
        </section>
        <section className="mgi-section">
          <p>
            If you want to know more about integration code you can chat with our support about
            that.
          </p>
        </section>
      </Panel.Body>
    </Panel>
  </aside>
</PageContentLayout>
```

Without aside

```js
const { NavLink } = require('react-router-dom')
const Panel = require('../panel').default
;<PageContentLayout>
  <nav>
    <NavLink to="/page1">Menu Item 1</NavLink>
    <NavLink to="/page2">Menu Item 2</NavLink>
    <NavLink to="/page3">Menu Item 3</NavLink>
    <span>Static Menu Item 1</span>
  </nav>

  <main>
    <Panel>
      <Panel.Body>
        <h2>1. Configure Mati verification flow</h2>
        <p>
          On first step you can configure your verification flow with colours, countries, language
          and documents.
        </p>
      </Panel.Body>
    </Panel>

    <Panel>
      <Panel.Body>
        <h2>1. Configure Mati verification flow</h2>
        <p>
          On first step you can configure your verification flow with colours, countries, language
          and documents.
        </p>
      </Panel.Body>
    </Panel>
  </main>
</PageContentLayout>
```

Without menu and aside

```js
const { NavLink } = require('react-router-dom')
const Panel = require('../panel').default
;<PageContentLayout>
  <main>
    <Panel>
      <Panel.Body>
        <h2>1. Configure Mati verification flow</h2>
        <p>
          On first step you can configure your verification flow with colours, countries, language
          and documents.
        </p>
      </Panel.Body>
    </Panel>

    <Panel>
      <Panel.Body>
        <h2>1. Configure Mati verification flow</h2>
        <p>
          On first step you can configure your verification flow with colours, countries, language
          and documents.
        </p>
      </Panel.Body>
    </Panel>
  </main>
</PageContentLayout>
```
