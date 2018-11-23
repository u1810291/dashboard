```js
const { documents, photos } = require('./verification-details/__mocks__');
const stringify = require('src/lib/stringify').default;

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    if (!document.getElementById('#modalRoot')) {
      const modalRoot = document.createElement('div')
      modalRoot.id = 'modalRoot'
      document.body.appendChild(modalRoot)
    }
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.setState({ opened: true })}>
          Open Verification modal
        </button>
        {this.state.opened && (
          <VerificationModal
            onClose={() => this.setState({ opened: false }) }
            fullName="Daniela Hernandez"
            photos={photos}
            documents={documents}
            webhook={stringify(documents)}
          />
        )}
      </React.Fragment>
    )
  }
};
<Container />

```
