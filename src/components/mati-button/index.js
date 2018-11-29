import React from 'react'

const languagesMap = {
  en: 'us',
  es: 'mx',
  fr: 'fr',
  pt: 'pt'
}

export class MatiButton extends React.Component {
  constructor(props) {
    super(props)
    let success

    window.addEventListener('message', event => {
      const data = event.data && typeof event.data === 'string' ? JSON.parse(event.data) : event.data || {}
      const index = this.element.dataset.index || 0
      if (this.props.onSuccess && data.action === `mati-signup-${index}::loaded`) {
        success = false
      }
      if (this.props.onSuccess && data.action === `mati-signup-${index}::success`) {
        success = true
      }
      if (this.props.onSuccess && data.action === `mati-signup-${index}::exit`) {
        if (success) this.props.onSuccess()
      }
    })
  }

  renderButton() {
    if (this.element) {
      const index = this.element.dataset.index
      const iframe = document.querySelector(`iframe#mati-iframe-${index}`)
      if (iframe) iframe.remove()
      this.element.remove()
    }
    this.element = document.createElement('div')
    this.element.dataset.country = languagesMap[this.props.language]
    this.element.dataset.style = this.props.color
    this.element.dataset.product = 'kyc'
    if (this.props.responsive) {
      this.element.classList.add('responsive')
    }
    this.root.appendChild(this.element)

    window.Mati.render({
      clientId: this.props.clientId,
      element: this.element,
      hideChat: true
    })
  }
  componentDidUpdate(prevProps) {
    this.renderButton()
  }

  componentDidMount() {
    if (!window.Mati) {
      return
    }
    this.renderButton()
  }
  render() {
    return <div className={this.props.className} ref={root => (this.root = root)} />
  }
}
